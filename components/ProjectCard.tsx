import { Folder, Star, GitBranch } from "lucide-react";

interface ProjectProps {
  title: string;
  description: string;
  stats: string;
  tags: string[];
  color: string; // e.g., "bg-blue-500"
}

export default function ProjectCard({ title, description, stats, tags, color }: ProjectProps) {
  const slug = `project-${title.replace(/\s+/g, '-').toLowerCase()}`;
  return (
    <div role="article" tabIndex={0} aria-labelledby={slug} className="group relative bg-mantle border border-white/5 rounded-xl p-6 transform transition-all duration-300 hover:scale-[1.018] hover:shadow-soft-lg hover:border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-green focus-visible:ring-offset-2">
      
      {/* Top Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <Folder className={`w-5 h-5 ${color}`} />
          <h3 id={slug} className="text-lg font-bold text-text group-hover:text-green transition-colors">
            {title}
          </h3>
        </div>
        <div className="flex items-center gap-1 text-xs text-subtext bg-white/5 px-2 py-1 rounded">
          <Star className="w-3 h-3" />
          <span>{stats}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-subtext leading-relaxed mb-6">
        {description}
      </p>

      {/* Footer Tags */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {tags.map((tag) => (
          <span key={tag} title={tag} className="text-xs font-medium px-2 py-1 rounded bg-white/5 text-primary border border-white/5">
            {tag}
          </span>
        ))}
      </div>
      
      {/* Decorative Gradient Blob (Optional for high-end feel) */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 blur-3xl rounded-full -z-10" />
    </div>
  );
}