"use client";

import Navbar from "@/components/Navbar";
import { Calendar, MapPin, Search, Hash, GraduationCap, Briefcase, ArrowRight } from "lucide-react";
import { useState } from "react";

// --- EXPERIENCE DATA ---
const EXPERIENCES = [
  {
    id: "ksit",
    role: "Bachelor of Engineering (CSE)",
    org: "KS Institute of Technology",
    location: "Bengaluru, India",
    date: "2023 — Present",
    type: "Education", // Used for filtering/icon
    description: "Currently pursuing a B.E. in Computer Science. Focused on Data Structures, Algorithms, and Artificial Intelligence. Active member of the coding club.",
    tags: ["Data Structures", "AI", "Java", "Web Dev"],
    isCurrent: true
  },
  {
    id: "narayana",
    role: "Pre-University Course (PCMC)",
    org: "Narayana PU College",
    location: "Bengaluru, India",
    date: "2021 — 2023",
    type: "Education",
    description: "Completed Pre-University education with a focus on Physics, Chemistry, Mathematics, and Computer Science. built a strong foundation in logic and calculus.",
    tags: ["Physics", "Maths", "Calculus", "Logic"],
    isCurrent: false
  },
  // You can add Internships here later like this:
  // {
  //   id: "internship-1",
  //   role: "Android Developer Intern",
  //   org: "Tech Startup",
  //   ...
  // }
];

export default function Experience() {
  const [search, setSearch] = useState("");

  // Filter logic
  const filteredData = EXPERIENCES.filter(item => 
    item.role.toLowerCase().includes(search.toLowerCase()) || 
    item.org.toLowerCase().includes(search.toLowerCase()) ||
    item.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <main className="min-h-screen bg-base px-6 md:px-24 py-4 selection:bg-green selection:text-base">
      <div className="max-w-4xl mx-auto">
        <Navbar />

        {/* HEADER */}
        <div className="mb-16 space-y-8">
           <div className="space-y-2">
             <h1 className="text-4xl font-bold font-mono text-text">Experience Log</h1>
             <p className="text-subtext0 font-mono text-sm">
                My academic and professional journey timeline.
             </p>
           </div>

           {/* Search Bar */}
           <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-overlay0 group-focus-within:text-green transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search history (e.g. 'KSIT', 'Maths')..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-mantle border border-surface0 text-text text-sm rounded-lg block pl-10 p-3 focus:outline-none focus:border-green focus:ring-1 focus:ring-green transition-all font-mono placeholder:text-surface0"
              />
           </div>
        </div>

        {/* TIMELINE */}
        <div className="relative border-l border-surface0/50 ml-3 md:ml-6 space-y-12 pb-12">
          
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div key={item.id} className="relative pl-8 md:pl-12 group">
                
                {/* 1. Timeline Dot */}
                <div className={`absolute -left-[5px] md:-left-[5px] top-6 w-2.5 h-2.5 rounded-full border-2 border-base transition-colors duration-300 z-10 ${
                  item.isCurrent ? "bg-green shadow-[0_0_10px_rgba(166,227,161,0.5)] animate-pulse" : "bg-surface0 group-hover:bg-blue"
                }`} />

                {/* 2. The Card */}
                <article className="flex flex-col bg-mantle/50 border border-surface0/50 rounded-xl p-6 hover:border-surface0 hover:bg-mantle transition-all duration-300 relative overflow-hidden">
                  
                  {/* "Current" Badge */}
                  {item.isCurrent && (
                    <div className="absolute top-0 right-0 bg-green/10 text-green text-[10px] font-bold px-3 py-1 rounded-bl-lg border-l border-b border-green/20 font-mono">
                      PRESENT
                    </div>
                  )}

                  {/* Date & Location */}
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-overlay0 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {item.date}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-surface0" />
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {item.location}
                    </span>
                  </div>

                  {/* Role & Org */}
                  <h2 className="text-xl font-bold text-text mb-1 group-hover:text-green transition-colors flex items-center gap-2">
                    {item.role}
                  </h2>
                  <div className="text-blue font-mono text-sm mb-4 flex items-center gap-2">
                    {item.type === 'Education' ? <GraduationCap className="w-4 h-4" /> : <Briefcase className="w-4 h-4" />}
                    {item.org}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-subtext0 leading-relaxed mb-6 font-mono">
                    {item.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {item.tags.map(tag => (
                      <span key={tag} className="flex items-center gap-1 text-[10px] font-mono px-2 py-1 rounded-md bg-base border border-surface0 text-subtext0 group-hover:text-text group-hover:border-surface0/80 transition-colors">
                        <Hash className="w-2.5 h-2.5 opacity-50" /> {tag}
                      </span>
                    ))}
                  </div>

                </article>
              </div>
            ))
          ) : (
            <div className="pl-12 text-subtext0 font-mono italic">
              No experience found matching "{search}".
            </div>
          )}

        </div>

        <footer className="mt-20 py-8 border-t border-surface0/30 text-center text-overlay0 text-xs font-mono">
          © 2026 Avinash S. • All Services Nominal
        </footer>
      </div>
    </main>
  );
}