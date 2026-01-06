"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ChevronRight } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // UPDATED: Renamed 'Posts' to 'Experience'
  const navLinks = [
    { name: "About", path: "/about" },
    { name: "Experience", path: "/posts" }, // Links to the timeline page we just made
    { name: "Projects", path: "/projects" },
    { name: "Resume", path: "/resume" },
  ];

  return (
    <>
      <nav className="flex items-center justify-between py-8 mb-8 font-mono relative z-50">
        <Link href="/" className="text-text font-bold text-xl flex items-center gap-2">
          <span className="text-overlay0">~/</span>
          <span className="text-green animate-pulse">▐</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 text-sm text-subtext0">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`hover:text-green transition-colors ${
                pathname === link.path ? "text-green font-bold underline decoration-wavy underline-offset-4" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-text hover:text-green transition-colors"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <div className={`fixed inset-y-0 right-0 w-64 bg-mantle border-l border-surface0 shadow-2xl transform transition-transform duration-300 ease-in-out z-40 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}>
        <div className="flex flex-col p-8 space-y-8 mt-16 font-mono">
          <div className="space-y-3 pb-8 border-b border-surface0/50">
             <span className="text-xs text-overlay0 uppercase tracking-widest">Theme</span>
             <div className="p-2 border border-green/50 rounded bg-green/10 text-green text-center text-xs">
                Mocha (Active)
             </div>
          </div>

          <div className="flex flex-col space-y-4">
             {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`text-lg flex justify-between items-center group ${
                  pathname === link.path ? "text-green" : "text-subtext0"
                }`}
              >
                <span className="group-hover:translate-x-2 transition-transform">{link.name}</span>
                {pathname === link.path && <ChevronRight className="w-4 h-4" />}
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
        />
      )}
    </>
  );
}