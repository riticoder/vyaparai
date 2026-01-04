import React, { useEffect } from 'react';
import VyaparLogo from './VyaparLogo';

/**
 * Splash3D
 * A lightweight full-screen splash component that shows a simple 3D cube
 * (CSS transforms + keyframes) together with the Vyapar logo. This runs
 * before the main application mounts to give a polished startup experience.
 *
 * Accessibility & UX notes:
 * - The component is purely decorative; it uses aria-hidden so screen
 *   readers ignore it. Remove aria-hidden if you plan to announce the splash.
 * - The animation is short by default to avoid blocking users; App controls
 *   how long the splash is shown (e.g. 1200ms). Keep animation durations
 *   reasonable on mobile to reduce perceived latency.
 */
export default function Splash3D({ className = '' }) {
  useEffect(() => {
    // Prevent page scroll while splash is visible
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/90 text-white ${className}`}
    >
      {/* Inline styles here so this splash is self-contained and portable */}
      <style>{`
        .splash-wrap { display:flex; flex-direction:column; align-items:center; gap:1.25rem }
        .cube-scene { width:140px; height:140px; perspective:900px }
        .cube { width:100%; height:100%; position:relative; transform-style:preserve-3d; animation:cube-rotate 2s ease-in-out infinite; }
        .cube__face { position:absolute; width:100%; height:100%; display:flex; align-items:center; justify-content:center; font-weight:700; color:rgba(255,255,255,0.95); border-radius:8px }
        .cube__face--front { transform: translateZ(70px); background:linear-gradient(135deg,#6366f1,#a855f7); }
        .cube__face--back { transform: rotateY(180deg) translateZ(70px); background:linear-gradient(135deg,#ec4899,#f97316); }
        .cube__face--right { transform: rotateY(90deg) translateZ(70px); background:linear-gradient(135deg,#06b6d4,#3b82f6); }
        .cube__face--left { transform: rotateY(-90deg) translateZ(70px); background:linear-gradient(135deg,#10b981,#06b6d4); }
        .cube__face--top { transform: rotateX(90deg) translateZ(70px); background:linear-gradient(135deg,#c084fc,#8b5cf6); }
        .cube__face--bottom { transform: rotateX(-90deg) translateZ(70px); background:linear-gradient(135deg,#a855f7,#ec4899); }

        @keyframes cube-rotate {
          0% { transform: rotateX(-15deg) rotateY(0deg) rotateZ(0deg) scale(0.98); }
          50% { transform: rotateX(-15deg) rotateY(180deg) rotateZ(0deg) scale(1.02); }
          100% { transform: rotateX(-15deg) rotateY(360deg) rotateZ(0deg) scale(0.98); }
        }

        /* subtle pulse for logo */
        .splash-title { font-size:1rem; letter-spacing:0.12em; opacity:0.95 }
        .logo-bounce { animation: bounce 1.35s infinite; }
        @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}

        /* ensure responsiveness: scale the scene on small viewports */
        @media (max-width:640px){ .cube-scene{width:110px;height:110px} .splash-title{font-size:0.9rem} }
      `}</style>

      <div className="splash-wrap">
        <div className="cube-scene">
          <div className="cube" role="presentation">
            <div className="cube__face cube__face--front" />
            <div className="cube__face cube__face--back" />
            <div className="cube__face cube__face--right" />
            <div className="cube__face cube__face--left" />
            <div className="cube__face cube__face--top" />
            <div className="cube__face cube__face--bottom" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 p-1 rounded-md bg-white/5 flex items-center justify-center logo-bounce">
            <VyaparLogo size={36} />
          </div>
          <div className="splash-title text-gray-200">VYAPAR.AI</div>
        </div>
      </div>
    </div>
  );
}
