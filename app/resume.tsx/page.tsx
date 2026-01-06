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
              A detailed overview of my experience, skills, and education.
            </p>
          </div>

          {/* Download Button */}
          <a 
            href="/resume.pdf" 
            download="Avinash_Sangisetti_Resume.pdf"
            className="flex items-center gap-2 bg-green text-base font-bold px-6 py-3 rounded-lg hover:bg-green/90 transition-all shadow-lg shadow-green/20"
          >
            <Download className="w-5 h-5" />
            Download PDF
          </a>
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