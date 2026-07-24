import React from "react";

export default function LibraryIllustration({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`} aria-hidden="true">
      {/* Decorative ring, top-right */}
      <svg
        className="absolute -top-6 right-2 w-16 h-16 opacity-70"
        viewBox="0 0 60 60"
        fill="none"
      >
        <circle cx="30" cy="30" r="28" stroke="#f6872a" strokeWidth="1.5" strokeDasharray="3 5" />
      </svg>

      {/* Dot grid, top-left */}
      <svg className="absolute -top-4 left-0 w-16 h-16 opacity-60" viewBox="0 0 60 60" fill="none">
        <pattern id="lib-illus-dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.5" fill="#c7cedb" />
        </pattern>
        <rect width="60" height="60" fill="url(#lib-illus-dots)" />
      </svg>

      {/* Small solid dot, bottom-left */}
      <span className="absolute -bottom-2 left-2 w-2.5 h-2.5 rounded-full bg-orange/70" />

      <svg viewBox="0 0 480 400" className="relative w-full h-auto max-w-[320px] mx-auto" fill="none">
        {/* Potted plant */}
        <g>
          <path d="M320 300 L345 300 L338 340 L327 340 Z" fill="#e5760f" />
          <rect x="317" y="292" width="31" height="10" rx="4" fill="#f6872a" />
          <ellipse cx="332" cy="270" rx="8" ry="24" fill="#2f7a4f" transform="rotate(-18 332 270)" />
          <ellipse cx="332" cy="266" rx="8" ry="24" fill="#3f9142" transform="rotate(10 332 266)" />
          <ellipse cx="332" cy="262" rx="7" ry="20" fill="#4caf50" />
        </g>

        {/* Book stack shadow */}
        <ellipse cx="205" cy="322" rx="130" ry="12" fill="#0e2455" opacity="0.06" />

        {/* Bottom book (orange) */}
        <g transform="rotate(-4 195 300)">
          <rect x="80" y="284" width="230" height="34" rx="7" fill="#f6872a" />
          <rect x="80" y="284" width="230" height="10" rx="5" fill="#ffffff" opacity="0.18" />
        </g>

        {/* Middle book (white with navy spine) */}
        <g transform="rotate(3 195 268)">
          <rect x="95" y="250" width="205" height="34" rx="7" fill="#ffffff" stroke="#e6ebf3" strokeWidth="2" />
          <rect x="95" y="250" width="20" height="34" rx="6" fill="#0e2455" />
        </g>

        {/* Top book (navy) */}
        <g transform="rotate(-3 200 234)">
          <rect x="108" y="216" width="185" height="34" rx="7" fill="#0e2455" />
          <rect x="255" y="222" width="30" height="22" rx="2" fill="#f6872a" opacity="0.35" />
        </g>

        {/* Graduation cap */}
        <g transform="translate(150 150) rotate(-6)">
          <polygon points="70,0 140,26 70,52 0,26" fill="#0e2455" />
          <rect x="55" y="26" width="30" height="14" rx="3" fill="#0a1a3f" />
          <circle cx="70" cy="20" r="6" fill="#f6872a" />
          <path d="M132 24 L138 60 L128 66 L122 30 Z" fill="#f6872a" />
          <circle cx="126" cy="66" r="4" fill="#f6872a" />
        </g>
      </svg>
    </div>
  );
}
