import { Star, GitBranch, Folder } from "lucide-react";

interface TerminalCardProps {
  repoName: string; // e.g., "sguardian"
  description: string;
  stars: number;
  tags: string[];
  url?: string;
  color?: string; // e.g., "text-green"
}

export default function TerminalCard({ repoName, description, stars, tags, url, color = "text-green" }: TerminalCardProps) {
  const language = tags?.[0];
  return (
    <div role="article" tabIndex={0} className="group relative flex flex-col justify-between bg-mantle rounded-lg border border-surface0/50 p-5 h-full transition-all duration-300 hover:translate-y-[-2px] hover:shadow-soft-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2">
      
      {/* 1. The macOS Window Controls (The visual signature) */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red/80" />
          <div className="w-3 h-3 rounded-full bg-yellow/80" />
          <div className="w-3 h-3 rounded-full bg-green/80" />
        </div>
        
        {/* Star Count (Top Right) */}
        <div className="flex items-center gap-1 text-xs text-overlay0 font-mono">
          <Star className="w-3 h-3 mb-[1px]" />
          <span className="ml-1">{stars}</span>
        </div>
      </div>

      {/* 2. The "Path" Title */}
      <div className="mb-3">
        <h3 className="font-mono text-sm font-bold text-subtext0">
          <span className={`${color}`}>avinash</span>
          <span className="text-overlay0 mx-1">/</span>
          {url ? (
            <a href={url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${repoName} on GitHub (new tab)`} className="text-text group-hover:underline decoration-dotted underline-offset-4 decoration-overlay0">{repoName}</a>
          ) : (
            <span className="text-text group-hover:underline decoration-dotted underline-offset-4 decoration-overlay0">{repoName}</span>
          )}
        </h3>
      </div>

      {/* 3. Description */}
      <p className="text-sm text-subtext0 font-mono leading-relaxed mb-6 line-clamp-3">
        {description}
      </p>

      {/* 4. Tech Stack Tags (Bottom) */}
      <div className="mt-auto flex flex-wrap gap-2 items-center">
        {language && (
          <span className="px-2 py-1 text-[10px] rounded-md bg-surface0/30 text-overlay0 font-mono border border-surface0/50">{language}</span>
        )}
        {tags.slice(1).map((tag) => (
          <span 
            key={tag} 
            className="px-2 py-1 text-[10px] rounded-md bg-surface0/30 text-blue font-mono border border-surface0/50"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}