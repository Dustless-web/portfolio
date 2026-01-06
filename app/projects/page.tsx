import TerminalCard from "@/components/TerminalCard";
import Navbar from "@/components/Navbar";
import PinnedProjects from "@/components/PinnedProjects";
import { Folder } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-base px-6 md:px-24 py-4 selection:bg-green selection:text-base">
      <div className="max-w-7xl mx-auto">
        <Navbar />

        {/* Page Header */}
        <div className="mb-12 flex items-center gap-3">
          <Folder className="text-green w-8 h-8" />
          <h1 className="text-3xl font-bold font-mono text-text">Projects</h1>
        </div>

        {/* The Grid: Pinned Repositories (live) */}
        <div className="mb-6">
          {/* Client component fetches pinned repos in real-time */}
          <PinnedProjects limit={6} excluded={['mio-med']} username={'Dustless-web'} />
        </div>

        {/* Footer */}
        <footer className="mt-20 py-8 border-t border-surface0/30 text-center text-overlay0 text-xs font-mono">
          © 2026 Avinash S. • All Services Nominal
        </footer>
      </div>
    </main>
  );
}