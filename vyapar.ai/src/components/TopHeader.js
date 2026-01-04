import React from 'react';
import { Menu, X, Search, Bell } from 'lucide-react';

// TopHeader
// - Renders the top bar with search and quick actions. Keeps responsive
//   behavior: search input collapses on small viewports and a menu toggle
//   appears for mobile to control sidebar visibility.
export default function TopHeader({ activeTab, setSidebarOpen, sidebarOpen, mobileMenuOpen, setMobileMenuOpen }){
  return (
    <header className="h-20 flex items-center justify-between px-4 md:px-8 border-b border-gray-800/50 backdrop-blur-sm z-20">
      <div className="flex items-center gap-3 md:gap-4">
        {/* Desktop toggle hides on small screens */}
        <button aria-label="Toggle sidebar" onClick={() => setSidebarOpen(!sidebarOpen)} className="hidden md:block text-gray-400 hover:text-white transition-colors"><Menu /></button>
        {/* Mobile menu toggler */}
        <button aria-label="Toggle mobile menu" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-gray-400">{mobileMenuOpen ? <X /> : <Menu />}</button>

        {/* Title visible only on md+ to save space on phones */}
        <h1 className="text-md md:text-xl font-bold text-white hidden md:block uppercase tracking-wider opacity-50">Dashboard / {activeTab}</h1>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        {/* Search input: shown on md+ for space reasons */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input aria-label="Search system" type="text" placeholder="Search system..." className="bg-gray-800/50 border border-gray-700 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:border-indigo-500 focus:bg-gray-800 outline-none transition-all w-48 md:w-64 md:focus:w-80 shadow-inner" />
        </div>

        {/* Notifications */}
        <div role="button" aria-label="Notifications" className="relative cursor-pointer hover:bg-gray-800 p-2 rounded-full transition-colors"><Bell className="text-gray-300" /><span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-ping" aria-hidden="true"></span><span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" aria-hidden="true"></span></div>
      </div>
    </header>
  );
}
