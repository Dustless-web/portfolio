import type { Config } from "tailwindcss";

const config: Config = {
  // 1. ROBUST CONTENT PATHS
  // This ensures Tailwind finds your files no matter where they are
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}"
  ],

  // 2. THEME CONFIGURATION
  theme: {
    extend: {
      colors: {
        // --- NEW GREY PALETTE ---
        base: "#18181b",       // Main Background: Deep Zinc Grey
        mantle: "#27272a",     // Card Background: Lighter Zinc Grey
        surface0: "#3f3f46",   // Borders: Medium Grey for definition
        
        // --- TEXT & ACCENTS (Kept same for high contrast) ---
        text: "#e4e4e7",       // Main Text: Soft White (Zinc-200)
        subtext0: "#a1a1aa",   // Muted Text: Light Grey (Zinc-400)
        overlay0: "#71717a",   // Icons/Meta: Darker Grey (Zinc-500)

        // --- ACCENT & PRIMARY (subtle) ---
        accent: "#7dd3fc",
        primary: "#94f3a2",
        
        // --- MAC WINDOW DOT COLORS ---
        red: "#f38ba8",
        yellow: "#f9e2af",
        green: "#a6e3a1",
        blue: "#89b4fa",
      },
      fontFamily: {
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
        },
      },
      fontSize: {
        'lead': ['1.0625rem', { lineHeight: '1.75' }], // 17px
      },
      spacing: {
        '9': '2.25rem',
        '14': '3.5rem',
      },
      boxShadow: {
        'soft-lg': '0 8px 30px rgba(2,6,23,0.35)',
      },
    },
  },

  // 3. SAFELIST
  // Forces these colors to exist so your dynamic components don't break
  safelist: [
    'bg-base', 
    'bg-mantle', 
    'text-green', 
    'text-red', 
    'text-blue', 
    'text-yellow', 
    'border-surface0'
  ],

  plugins: [],
};
export default config;