"use client"; // This makes it run in the browser

import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

export default function ClientClock() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Force time to Indian Standard Time (IST)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false, 
      };
      setTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };

    updateTime(); // Run once immediately
    const interval = setInterval(updateTime, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  // Show a loading state briefly while waiting for client js
  if (!time) {
    return (
      <div className="flex items-center gap-1.5 text-overlay0">
        <Clock className="w-3 h-3" />
        <span>--:--:-- IST</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 hover:text-text transition-colors cursor-help" title="Live Bengaluru Time">
      <Clock className="w-3 h-3 text-green" />
      <span className="font-mono tabular-nums">{time} IST</span>
    </div>
  );
}