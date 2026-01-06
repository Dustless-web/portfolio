import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Load the font
const jetbrains = JetBrains_Mono({ 
  subsets: ["latin"], 
  variable: "--font-jetbrains" 
});

export const metadata: Metadata = {
  title: "Avinash Sangisetti | Portfolio",
  description: "Avinash Sangisetti — Computer Science Engineer focused on Android & AI Systems. Android, AI systems, and open-source projects.",
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg'
  },
  openGraph: {
    title: 'Avinash Sangisetti | Portfolio',
    description: 'Computer Science Engineer focused on Android & AI Systems — explore projects and work.',
    images: [
      {
        url: '/as-icon.svg',
        width: 1200,
        height: 630,
        alt: 'AS Logo'
      }
    ],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetbrains.variable} font-mono bg-base text-text min-h-screen antialiased`}>
        {/* THE FILM GRAIN OVERLAY */}
        <div className="bg-noise"></div>
        <a href="#main" className="skip-link">Skip to content</a>
        <main id="main">{children}</main>
      </body>
    </html>
  );
}