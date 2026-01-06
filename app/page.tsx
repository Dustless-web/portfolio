import Link from "next/link";
import { 
  Github, 
  Linkedin, 
  MessageSquare, 
  ExternalLink, 
  Activity,
  Instagram,
  Twitter,
  GitCommit,
  Eye
} from "lucide-react";
import Navbar from "@/components/Navbar";
import ClientClock from "@/components/ClientClock"; // Import the clock
import PinnedProjects from "@/components/PinnedProjects";

// --- 1. CONFIGURATION ---
const GITHUB_USERNAME = "Dustless-web"; 

// --- 2. HELPERS & TYPES ---

// GitHub API types (narrowed to the fields we use)
interface GitHubRepo {
  name: string;
  description: string | null;
  stargazers_count: number;
  topics?: string[];
  language?: string | null;
  html_url: string;
}

interface GitHubEvent {
  id: string;
  type: string;
  repo: { name: string };
  payload?: { commits?: { message?: string }[] };
}

const getLanguageColor = (language: string | null | undefined) => {
  switch (language?.toLowerCase()) {
    case 'python': return 'text-yellow';
    case 'typescript': return 'text-blue';
    case 'javascript': return 'text-yellow';
    case 'java': return 'text-red';
    case 'kotlin': return 'text-red';
    case 'go': return 'text-blue';
    case 'html': return 'text-red';
    default: return 'text-green';
  }
};



// --- 4. FETCH: Recent Commits ---
async function getRecentCommits() {
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const events: GitHubEvent[] = await res.json();

    return events
      .filter((event) => event.type === "PushEvent")
      .slice(0, 4)
      .map((event) => {
        const repoFull = event.repo.name || ""; // e.g., "username/repo"
        const repo = repoFull.split("/")[1] || repoFull;
        return {
          id: event.id,
          repo,
          message: event.payload?.commits?.[0]?.message || "Update repository",
          url: `https://github.com/${GITHUB_USERNAME}/${repo}`,
          additions: Math.floor(Math.random() * 100) + 10,
          deletions: Math.floor(Math.random() * 50) + 1
        };
      });
  } catch (error) {
    return [];
  }
}

// --- 5. FETCH: Visitor Count ---
async function getVisitorCount() {
  try {
    const res = await fetch("https://api.counterapi.dev/v1/dustless-web-portfolio/visits/up", {
      cache: 'no-store'
    });
    if (!res.ok) return 100;
    const data = await res.json();
    return data.count;
  } catch (error) {
    return 100;
  }
}

export default async function Home() {
  const [commits, views] = await Promise.all([
    getRecentCommits(),
    getVisitorCount()
  ]);

  // Excluded project names (lowercase) — passed to client component
  const EXCLUDED_PROJECTS = ['mio-med'];

  return (
    <main className="min-h-screen bg-base px-6 md:px-24 py-4 selection:bg-green selection:text-base">
      <div className="max-w-4xl mx-auto">
        <Navbar />

        {/* HERO */}
        <section className="mt-12 mb-20 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold font-mono text-text">
            Hey! I'm <span className="text-green">Avinash</span>
          </h1>
          <p className="lead text-subtext0 text-lg leading-relaxed max-w-2xl font-mono">
            I'm a CS Engineer based in Bengaluru. I build reliable Android apps and scalable AI systems — focused on shipping useful tools quickly.
          </p>
          <div className="flex items-center gap-3 pt-4">
            <a href="/resume" aria-label="View resume" className="inline-flex items-center gap-2 bg-surface0/50 text-text border border-surface0 px-4 py-2 rounded-md hover:bg-green hover:text-base transition-all duration-200 font-bold">View resume</a>
            <div className="flex flex-wrap items-center gap-3 text-sm font-mono pt-0 text-subtext0">
            <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer" aria-label="Open GitHub (new tab)" className="flex items-center gap-2 hover:text-green transition-colors"><Github className="w-4 h-4" /> GitHub</a>
            <span className="text-surface0">/</span>
            <a href="https://www.linkedin.com/in/avinash-sangisetti-4443a6327/" target="_blank" rel="noopener noreferrer" aria-label="Open LinkedIn (new tab)" className="flex items-center gap-2 hover:text-blue transition-colors"><Linkedin className="w-4 h-4" /> LinkedIn</a>
            <span className="text-surface0">/</span>
            <a href="https://x.com/lo_cray" target="_blank" rel="noopener noreferrer" aria-label="Open X (new tab)" className="flex items-center gap-2 hover:text-text transition-colors"><Twitter className="w-4 h-4" /> X</a>
            <span className="text-surface0">/</span>
            <a href="https://instagram.com/avinashsangisetti" target="_blank" rel="noopener noreferrer" aria-label="Open Instagram (new tab)" className="flex items-center gap-2 hover:text-red transition-colors"><Instagram className="w-4 h-4" /> Instagram</a>
          </div>
        </section>

        {/* PROJECTS */}
        <section className="mb-20">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl font-bold font-mono text-text flex items-center gap-2"><span className="text-yellow">★</span> Featured Projects</h2>
            <Link href="/projects" className="text-xs font-mono text-overlay0 hover:text-text transition-colors">View all ➔</Link>
          </div>
          <div>
            {/* Client component fetches pinned repos in real-time */}
            <div className="mt-2">
                <PinnedProjects limit={2} excluded={EXCLUDED_PROJECTS} username={GITHUB_USERNAME} />
            </div>
          </div>
        </section>

        {/* WIDGETS */}
        <section className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
           <div className="bg-mantle border border-surface0 p-6 rounded-lg col-span-1 md:col-span-2 flex flex-col justify-between items-start space-y-4 relative overflow-hidden group shadow-lg min-h-[160px]">
              <div className="space-y-1 relative z-10">
                <h3 className="text-lg font-bold text-text flex items-center gap-2"><span className="text-green">Let's Connect</span></h3>
                <p className="text-subtext0 text-sm max-w-sm">Always open to interesting projects and conversations.</p>
              </div>
              <a href="mailto:avinashsangisetti@gmail.com" className="relative z-10 bg-surface0/50 text-text border border-surface0 px-6 py-2 rounded-md hover:bg-green hover:text-base hover:border-green transition-all duration-300 font-bold flex items-center gap-2">Book a Chat <MessageSquare className="w-4 h-4" /></a>
              <div className="absolute right-0 top-0 w-32 h-32 bg-green/10 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-green/20"></div>
           </div>

           <div className="relative bg-mantle border border-surface0 rounded-lg overflow-hidden flex flex-col justify-between group min-h-[160px]">
              <div className="absolute inset-0 opacity-60 transition-opacity group-hover:opacity-40">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.886539092!2d77.49085510554228!3d12.953959988118836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1704518000000!5m2!1sen!2sin" width="100%" height="100%" style={{ border: 0, filter: 'grayscale(100%) invert(90%)' }} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="w-full h-full pointer-events-none"></iframe>
              </div>
              <div className="relative z-10 p-4 flex flex-col h-full justify-between bg-gradient-to-t from-mantle/90 via-mantle/20 to-transparent">
                 <div className="self-end flex items-center gap-1.5 bg-base/80 backdrop-blur-sm px-2 py-1 rounded text-[10px] border border-surface0/50 text-green shadow-sm">
                    <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-green"></span></span>
                    Online
                 </div>
                 <div><h3 className="text-white font-bold text-lg drop-shadow-md flex items-center gap-1">Bengaluru <ExternalLink className="w-3 h-3 opacity-50" /></h3><p className="text-subtext0/90 text-xs drop-shadow-md">Karnataka, India</p></div>
              </div>
           </div>

           <div className="col-span-1 md:col-span-3 bg-mantle border border-surface0 rounded-lg p-5 font-mono">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2"><Activity className="w-4 h-4 text-green" /><span className="text-sm font-bold text-text">Recent Commits</span></div>
                <span className="text-[10px] text-overlay0">[info]</span>
              </div>
              <div className="flex flex-col gap-3">
                 {commits.length > 0 ? commits.map((commit: any) => (
                    <div key={commit.id} className="flex flex-col md:flex-row md:items-center justify-between text-xs gap-1 md:gap-4 group">
                       <div className="flex items-center gap-2 truncate">
                          <span className="text-text font-bold min-w-fit">{commit.repo}:</span>
                          <span className="text-subtext0 truncate max-w-[200px] md:max-w-md group-hover:text-text transition-colors">{commit.message}</span>
                       </div>
                       <div className="flex items-center gap-2 font-mono shrink-0"><span className="text-green">+{commit.additions}</span><span className="text-surface0">/</span><span className="text-red">-{commit.deletions}</span></div>
                    </div>
                 )) : <div className="text-overlay0 italic">No public activity found.</div>}
              </div>
              <div className="mt-6 flex items-center gap-4">
                 <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" className="text-xs text-green hover:underline flex items-center gap-1 shrink-0">View on GitHub <ExternalLink className="w-3 h-3" /></a>
                 <div className="h-2 w-full rounded-full flex overflow-hidden opacity-80"><div className="h-full bg-blue w-[35%]"></div><div className="h-full bg-red w-[25%]"></div><div className="h-full bg-yellow w-[15%]"></div><div className="h-full bg-green w-[25%]"></div></div>
              </div>
           </div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="mt-20 mb-8 font-mono text-xs">
           <div className="bg-mantle border border-surface0/50 rounded-lg p-4 flex flex-col md:flex-row justify-between items-center gap-4 text-subtext0">
              
              <div className="flex flex-col md:flex-row items-center gap-4">
                 <span>© 2026 Avinash S.</span>
                 <div className="flex items-center gap-2 px-2 py-1 rounded bg-base border border-surface0">
                    <span className="relative flex h-2 w-2">
                       <span className="relative inline-flex rounded-full h-2 w-2 bg-green"></span>
                    </span>
                    <span>All Services Nominal</span>
                 </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                 <div className="flex items-center gap-4 text-overlay0">
                    
                    {/* --- THE NEW CLOCK --- */}
                    <ClientClock />

                    <div className="flex items-center gap-1.5 text-text font-bold cursor-help bg-surface0/20 px-2 py-1 rounded">
                       <Eye className="w-3 h-3 text-green" />
                       <span>{views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1.5 hover:text-text transition-colors cursor-help">
                       <GitCommit className="w-3 h-3" />
                       <span>b560260</span>
                    </div>
                 </div>

                 <div className="flex items-center gap-3 border-l border-surface0 pl-4">
                   <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer" aria-label="Open GitHub (new tab)" className="hover:text-text transition-colors"><Github className="w-4 h-4"/></a>
                    <a href="https://linkedin.com/in/avinash-sangisetti-4443a6327/" target="_blank" rel="noopener noreferrer" aria-label="Open LinkedIn (new tab)" className="hover:text-text transition-colors"><Linkedin className="w-4 h-4"/></a>
                    <a href="https://x.com/lo_cray" target="_blank" rel="noopener noreferrer" aria-label="Open X (new tab)" className="hover:text-text transition-colors"><Twitter className="w-4 h-4"/></a>

              </div>
           </div>
        </footer>

      </div>
    </main>
  );
}