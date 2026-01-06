"use client";

import { useEffect, useState } from "react";
import TerminalCard from "@/components/TerminalCard";
import Link from "next/link";

interface Project {
  name: string;
  description: string;
  stars: number;
  tags: string[];
  color?: string;
  url?: string;
}

export default function PinnedProjects({ limit = 2, excluded = [], username = 'GitHub' }: { limit?: number; excluded?: string[]; username?: string }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);

  const formatRelative = (ts: number | null) => {
    if (!ts) return '';
    const sec = Math.round((Date.now() - ts) / 1000);
    if (sec < 60) return `${sec}s ago`;
    const min = Math.round(sec / 60);
    if (min < 60) return `${min}m ago`;
    const hr = Math.round(min / 60);
    if (hr < 24) return `${hr}h ago`;
    const d = Math.round(hr / 24);
    return `${d}d ago`;
  };

  const fetchPinned = async () => {
    setLoading(true);
    setError(null);
    setInfo(null);
    try {
      const res = await fetch('/api/pinned');
      if (!res.ok) {
        const text = await res.text();
        setError(text || 'Failed to fetch pinned repos');
        setProjects([]);
        setLoading(false);
        return;
      }
      const data = await res.json();

      // Normalize response: either an array or an object { pinned, message }
      let rawList: Project[] = [];
      if (Array.isArray(data)) {
        rawList = data;
      } else if (data && typeof data === 'object') {
        rawList = data.pinned || [];
        if (data.message) setInfo(String(data.message));
      }

      const list = rawList
        .filter(p => !excluded.map(e => e.toLowerCase()).includes((p.name || '').toLowerCase()));
      setProjects(list);
      setLastUpdated(Date.now());
    } catch (err: any) {
      setError(String(err));
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPinned();
    const interval = setInterval(fetchPinned, 60_000); // poll every 60s
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div role="status" aria-live="polite" className="text-overlay0">Loading featured projects...</div>;
  }

  if (error) {
    return <div className="text-red">Error fetching pinned repos: {error}</div>;
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="text-overlay0 italic">
        {info ? <div className="mb-2">{info}</div> : null}
        No pinned repositories found. <Link href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer" className="text-green hover:underline">View GitHub</Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4 text-xs text-subtext0">
        <div>{projects.length} pinned repos</div>
        <div className="flex items-center gap-3">
          {lastUpdated ? <div className="text-overlay0">Last updated: <span className="text-subtext0">{formatRelative(lastUpdated)}</span></div> : null}
          <button
            onClick={() => fetchPinned()}
            className="text-sm text-subtext0 bg-base/20 px-2 py-1 rounded hover:bg-base/30 transition-colors"
            aria-label="Refresh pinned projects"
          >Refresh</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.slice(0, limit).map((project) => (
          <TerminalCard key={project.name} repoName={project.name} description={project.description} stars={project.stars} tags={project.tags} url={project.url} color={project.color} />
        ))}
      </div>
    </div>
  );
}
