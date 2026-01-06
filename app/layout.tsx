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
  description: "Computer Science Engineer focused on Android & AI Systems.",
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
        
        {children}
      </body>
    </html>
  );
}