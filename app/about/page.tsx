import Image from "next/image"; // Import the Image component
import Navbar from "@/components/Navbar";

export default function About() {
  return (
    <main className="min-h-screen bg-base px-6 md:px-24 py-4 selection:bg-green selection:text-base">
      <div className="max-w-4xl mx-auto">
        <Navbar />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
          
          {/* LEFT: Avatar Image */}
          <div className="col-span-1 flex items-center justify-center md:justify-start">
             {/* The container gives the shape */}
             <div className="bg-mantle rounded-xl border border-surface0 overflow-hidden relative transition-all duration-300 shadow-2xl shadow-black/50 w-full max-w-[260px]" style={{ aspectRatio: '1 / 1' }}>
                
                {/* THE IMAGE COMPONENT: use explicit width/height so Next can optimize */}
                <Image 
                  src="/avatar.jpeg" // This looks in the 'public' folder
                  alt="Avinash Sangisetti"
                  width={260}
                  height={260}
                  className="object-cover"
                  priority // Loads immediately
                  quality={80}
                />
                
                {/* Optional: Inner Border for that 'frame' look */}
                <div className="absolute inset-0 border-[3px] border-white/5 rounded-xl z-10 pointer-events-none"></div>
             </div>
          </div>

          {/* RIGHT: Text Content */}
          <div className="col-span-1 md:col-span-2 space-y-6 font-mono text-subtext0 leading-relaxed">
            <h1 className="text-3xl font-bold text-text mb-6">About Me</h1>
            
            <p className="lead">
              Hi — I'm <span className="text-green">Avinash</span> (@Dustless-web), a Computer Science Engineer at KSIT based in <span className="text-blue">Bengaluru</span>. I build Android apps and AI systems that prioritize reliability and simplicity.
            </p>

            <p>
              Notable projects: <span className="text-text border-b border-green">SGuardian</span> (fall detection) and <span className="text-text border-b border-red">Biomed-Waste</span> (hospital tracking & compliance).
            </p>

            <p>
              Outside work, I enjoy games, cinema, and philosophy. If you'd like to work together or chat, <a href="mailto:avinashsangisetti@gmail.com" className="text-green hover:underline">email me</a> or <a href="/resume" aria-label="View resume" className="text-text border-b border-surface0 hover:text-green">view my resume</a>.
            </p>
          </div>

        </div>

        {/* BOTTOM: Hobbies / Setup Grid */}
        <div className="mt-20">
           <h3 className="text-xl font-bold text-text font-mono mb-6 flex items-center gap-2">
             <span className="text-green">☺</span> My Setup / Hobbies
           </h3>
           {/* You can add images here too by using <Image /> like above */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="h-48 bg-mantle rounded-lg border border-surface0 flex items-center justify-center text-xs text-overlay0">Setup Pic 1</div>
              <div className="h-48 bg-mantle rounded-lg border border-surface0 flex items-center justify-center text-xs text-overlay0">Setup Pic 2</div>
              <div className="h-48 bg-mantle rounded-lg border border-surface0 flex items-center justify-center text-xs text-overlay0">Setup Pic 3</div>
           </div>
        </div>

      </div>
    </main>
  );
}
