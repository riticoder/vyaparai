import React from 'react';

export default function VyaparLogo({ size = 32 }){
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="12" fill="url(#g)" />
      <path d="M20 32c4-8 24-8 28 0-4 8-24 8-28 0z" fill="#fff" opacity="0.92" />
    </svg>
  );
}
