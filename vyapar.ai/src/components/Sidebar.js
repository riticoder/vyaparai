import React from 'react';
import VyaparLogo from './VyaparLogo';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Sidebar
// - Responsible for rendering primary navigation and user profile.
// - Responsive behavior: hidden/collapsed on small screens, visible on md+.
// - Receives `mobileMenuOpen` to allow the header toggle to open/close it on mobile.
// Accepts `setSidebarOpen` so the collapse control inside the sidebar can
// toggle the collapsed state (icons-only) without relying only on the header.
export default function Sidebar({ navItems, activeTab, onTabChange, sidebarOpen, mobileMenuOpen, setSidebarOpen, setMobileMenuOpen }){
  // Build responsive classes:
  // - On mobile (below md) the sidebar should be off-canvas unless mobileMenuOpen is true.
  // - On md+ the sidebar should honor sidebarOpen (expanded/collapsed).
  const mobileStateClass = mobileMenuOpen ? 'translate-x-0 w-64' : '-translate-x-full';
  const desktopWidthClass = sidebarOpen ? 'md:w-64' : 'md:w-20';

  return (
    <>
      <aside
        aria-hidden={!sidebarOpen && !mobileMenuOpen}
        className={`fixed z-30 h-screen bg-gray-900/90 backdrop-blur-xl border-r border-gray-800 transition-all duration-300 flex flex-col ${mobileStateClass} ${desktopWidthClass} md:translate-x-0`}
      >
      <div className="p-4 md:p-6 flex items-center gap-3 justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center"><VyaparLogo size={42} /></div>
          <span className={`text-2xl font-extrabold text-white tracking-tight transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>VYAPAR AI</span>
        </div>

        {/* Collapse toggle: small chevron to collapse to icons-only */}
        <button
          aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          onClick={() => setSidebarOpen && setSidebarOpen(!sidebarOpen)}
          className="hidden md:inline-flex items-center justify-center p-2 rounded-md bg-gray-800/40 hover:bg-gray-800 text-gray-300"
        >
          {sidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>

      {/* Navigation items */}
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={()=>onTabChange(item.id)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${activeTab===item.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
            aria-current={activeTab===item.id ? 'page' : undefined}
          >
            {/* Icons are passed as components/pseudo-components from the parent. If you want
                to centralize icon imports, create a small map in a `icons.js` file. */}
            <item.icon size={22} className={`transition-transform duration-300 ${activeTab===item.id ? 'scale-110' : 'group-hover:scale-110'}`} />
            <span className={`font-medium transition-opacity whitespace-nowrap ${sidebarOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>{item.label}</span>
            {activeTab===item.id && (<div className="absolute right-0 w-1 h-full bg-white/20 blur-sm"></div>)}
          </button>
        ))}
      </nav>

      <div className="p-4 mt-auto border-t border-gray-800">
        <div className={`flex items-center gap-3 transition-all ${!sidebarOpen && 'justify-center'}`}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 p-[2px]"><img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Boss" className="rounded-full bg-gray-900" alt="profile" /></div>
          <div className={`${sidebarOpen ? 'block' : 'hidden'}`}>
            <p className="text-sm font-bold text-white">Admin Boss</p>
            <p className="text-xs text-gray-500">Super User</p>
          </div>
        </div>
      </div>
    </aside>

      {/* Mobile backdrop - closes mobile menu when clicked */}
      <div
        onClick={() => {
          if (setMobileMenuOpen) setMobileMenuOpen(false);
        }}
        className={`md:hidden fixed inset-0 bg-black/40 transition-opacity z-20 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />
    </>
  );
}
