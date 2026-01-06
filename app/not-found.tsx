import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-base flex flex-col items-center justify-center text-center font-mono p-4 relative overflow-hidden">
      
      {/* Glitchy Background Text */}
      <h1 className="text-[150px] md:text-[200px] font-bold text-surface0 opacity-10 select-none absolute z-0 pointer-events-none">
        404
      </h1>
      
      <div className="relative z-10 space-y-6 bg-mantle/50 p-8 rounded-xl border border-red/20 backdrop-blur-sm shadow-2xl">
        <div className="text-xl md:text-2xl font-bold text-text flex flex-col gap-2">
          <span className="text-red uppercase tracking-widest text-xs border-b border-red/20 pb-2 mb-2">System Alert</span>
          <span>Error: Signal Lost</span>
        </div>
        
        <p className="text-subtext0 text-sm max-w-md mx-auto leading-relaxed">
          The requested path could not be resolved by the system logic.
          <br/>
          It may have been moved, deleted, or never existed.
        </p>

        <div className="pt-4">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red/10 border border-red/30 text-red hover:bg-red hover:text-base hover:border-red rounded transition-all duration-300 font-bold"
          >
            ~/ return_home
          </Link>
        </div>
      </div>
    </div>
  );
}