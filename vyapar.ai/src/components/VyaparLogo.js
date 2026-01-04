import React from 'react';

const VyaparLogo = ({ size = 40, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <linearGradient id="logoGradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="50%" stopColor="#a855f7" />
        <stop offset="100%" stopColor="#ec4899" />
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    <path
      d="M10 12C10 12 18 28 20 28C22 28 30 12 30 12"
      stroke="url(#logoGradient)"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
      filter="url(#glow)"
    />

    <circle cx="20" cy="20" r="3" fill="white" className="animate-pulse">
      <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
    </circle>

    <path d="M20 28V34" stroke="url(#logoGradient)" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
    <circle cx="20" cy="36" r="2" fill="#ec4899" />
    <circle cx="10" cy="8" r="1.5" fill="#6366f1" opacity="0.8" />
    <circle cx="30" cy="8" r="1.5" fill="#a855f7" opacity="0.8" />
  </svg>
);

export default VyaparLogo;
