import React from "react";

export default function BackgroundDecor() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden h-full w-full">
      {/* Concentric Circles Left */}
      <div className="absolute top-[20%] -left-[10%] opacity-40">
        <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="200" r="180" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="200" cy="200" r="140" stroke="#E2E8F0" strokeWidth="1" />
          <circle cx="200" cy="200" r="100" stroke="#E2E8F0" strokeWidth="1" />
          <circle cx="200" cy="200" r="60" stroke="#E2E8F0" strokeWidth="1" />
          <circle cx="200" cy="200" r="20" stroke="#E2E8F0" strokeWidth="1" />
          {/* Orange Plus */}
          <path d="M260 140 H270 M265 135 V145" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Concentric Circles Right */}
      <div className="absolute bottom-[10%] -right-[5%] opacity-30">
        <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="150" cy="150" r="140" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="150" cy="150" r="100" stroke="#E2E8F0" strokeWidth="1" />
          <circle cx="150" cy="150" r="60" stroke="#E2E8F0" strokeWidth="1" />
          <circle cx="150" cy="150" r="20" stroke="#E2E8F0" strokeWidth="1" />
          {/* Orange Plus */}
          <path d="M210 90 H220 M215 85 V95" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Dot Grid Top Left */}
      <div className="absolute top-[10%] left-[10%] opacity-40">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <pattern id="dot-grid-1" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="2" fill="#CBD5E1" />
          </pattern>
          <rect x="0" y="0" width="100" height="100" fill="url(#dot-grid-1)" />
        </svg>
      </div>

      {/* Dot Grid Bottom Center */}
      <div className="absolute bottom-[20%] left-[60%] opacity-40">
        <svg width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <pattern id="dot-grid-2" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="2" fill="#CBD5E1" />
          </pattern>
          <rect x="0" y="0" width="120" height="80" fill="url(#dot-grid-2)" />
        </svg>
      </div>
    </div>
  );
}
