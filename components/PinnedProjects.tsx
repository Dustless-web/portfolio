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

  const fetchPinned = async () => {
    setLoading(true);
    setError(null);
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
      // API returns either an array (pinned list) or an object with pinned key
      const raw: Project[] = Array.isArray(data) ? data : data.pinned || [];
      const list = raw
        .filter(p => !excluded.map(e => e.toLowerCase()).includes((p.name || '').toLowerCase()));
      setProjects(list);
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
    return <div className="text-overlay0">Loading featured projects...</div>;
  }

  if (error) {
    return <div className="text-red">Error fetching pinned repos: {error}</div>;
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="text-overlay0 italic">
        No pinned repositories found. <Link href={`https://github.com`} className="text-green hover:underline">View GitHub</Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.slice(0, limit).map((project) => (
        <TerminalCard key={project.name} repoName={project.name} description={project.description} stars={project.stars} tags={project.tags} color={project.color} />
      ))}
    </div>
  );
}
