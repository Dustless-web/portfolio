import TerminalCard from "@/components/TerminalCard";
import Navbar from "@/components/Navbar";
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

        {/* The Grid: Exact spacing match */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Your Fall Detection App */}
          <TerminalCard 
            repoName="sguardian"
            description="A fall detection system for elderly care using accelerometer data. Includes real-time alerts and location tracking."
            stars={12}
            tags={['android', 'kotlin', 'firebase', 'xml']}
            color="text-red" // Changing the 'user' color like the screenshot
          />

          {/* Card 2: Portfolio */}
          <TerminalCard 
            repoName="portfolio-v1"
            description="The website you are currently browsing! My attempt at building the perfect high-end developer portfolio."
            stars={102}
            tags={['nextjs', 'tailwind', 'typescript']}
            color="text-green"
          />

          {/* Card 3: Generic */}
          <TerminalCard 
            repoName="biomed-waste-mgmt"
            description="Report and tracking system for biomedical waste management in hospitals. Compliance with 1970 Patent Act Section 5."
            stars={4}
            tags={['python', 'django', 'sql']}
            color="text-blue"
          />

          {/* Card 4: Game Theory */}
          <TerminalCard 
            repoName="min-max-algo"
            description="Implementation of Min-Max algorithm and A* search for solving complex game states."
            stars={89}
            tags={['ai', 'python', 'algorithms']}
            color="text-yellow"
          />
          
        </div>

        {/* Footer */}
        <footer className="mt-20 py-8 border-t border-surface0/30 text-center text-overlay0 text-xs font-mono">
          © 2026 Avinash S. • All Services Nominal
        </footer>
      </div>
    </main>
  );
}