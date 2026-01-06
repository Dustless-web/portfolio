import Navbar from "@/components/Navbar";
import { Download, FileText, Eye } from "lucide-react";

export default function Resume() {
  return (
    <main className="min-h-screen bg-base px-6 md:px-24 py-4 selection:bg-green selection:text-base">
      <div className="max-w-4xl mx-auto">
        <Navbar />

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold font-mono text-text flex items-center gap-3">
              <FileText className="text-green w-8 h-8" /> 
              Resume
            </h1>
            <p className="text-subtext0 font-mono text-sm max-w-md">
              Current role: Computer Science Engineer (Android & AI). Open to short-term contracts and collaborations.
            </p>

            {/* Small skills badges */}
            <div className="mt-3 flex flex-wrap gap-2">
              {['Android','Kotlin','TypeScript','Next.js','Python','AI'].map(s => (
                <span key={s} className="text-[11px] px-2 py-1 rounded bg-surface0/30 text-overlay0 border border-surface0/40">{s}</span>
              ))}
            </div>
          </div>

          {/* Download Button */}
          <div className="flex items-center gap-4">
            <a 
              href="/resume.pdf" 
              download="Avinash_Sangisetti_Resume.pdf"
              aria-label="Download resume PDF"
              className="flex items-center gap-2 bg-green text-base font-bold px-5 py-2 rounded-md hover:bg-green/90 transition-all shadow-sm shadow-green/10"
            >
              <Download className="w-4 h-4" />
              Download
            </a>

            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" aria-label="Open resume in new tab" className="text-sm text-subtext0 border border-surface0 px-4 py-2 rounded-md hover:bg-base/20 transition-colors">Open in new tab</a>
          </div>
        </div>

        {/* PDF Previewer */}
        <div className="w-full bg-mantle border border-surface0 rounded-xl p-2 md:p-4 h-[500px] md:h-[800px] relative group">
           
           {/* Visual "Top Bar" of the PDF Viewer */}
           <div className="absolute top-0 left-0 right-0 h-10 bg-surface0/30 rounded-t-xl flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red/80" />
              <div className="w-3 h-3 rounded-full bg-yellow/80" />
              <div className="w-3 h-3 rounded-full bg-green/80" />
              <div className="ml-auto text-xs text-overlay0 font-mono flex items-center gap-1">
                 <Eye className="w-3 h-3" /> Preview Mode
              </div>
           </div>

           {/* The PDF Iframe */}
           <iframe 
             src="/resume.pdf" 
             className="w-full h-full rounded-lg bg-white mt-8" // mt-8 to clear the top bar
             title="Resume Preview"
           >
           </iframe>

           {/* Mobile Fallback (Since iframes are bad on phones) */}
           <div className="absolute inset-0 bg-base/90 flex flex-col items-center justify-center text-center p-6 md:hidden z-10 backdrop-blur-sm rounded-xl">
              <p className="text-text font-bold mb-4">Preview not available on mobile</p>
              <a 
                href="/resume.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open resume in new tab"
                className="text-green border border-green px-4 py-2 rounded hover:bg-green/10 transition-colors"
              >
                Open in New Tab
              </a>
           </div>

        </div>

        <footer className="mt-20 py-8 border-t border-surface0/30 text-center text-overlay0 text-xs font-mono">
          © 2026 Avinash S. • All Services Nominal
        </footer>
      </div>
    </main>
  );
}