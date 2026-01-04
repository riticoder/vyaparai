import React from 'react';
import VyaparLogo from '../ui/VyaparLogo';
import { NavLink, useNavigate } from 'react-router-dom';
import { LogOut, LogIn } from 'lucide-react';

// Sidebar (layout)
// - Simplified: no collapse/expand behavior. Mobile off-canvas controlled
//   via `mobileMenuOpen` / `setMobileMenuOpen`.
export default function Sidebar({ navItems = [], mobileMenuOpen, setMobileMenuOpen, onLogout }){
  const navigate = useNavigate();
  const mobileStateClass = mobileMenuOpen ? 'translate-x-0' : '-translate-x-full';
  
  // Check if user is logged in
  const authData = localStorage.getItem('vyapar_auth');
  const email = localStorage.getItem('email');
  const isLoggedIn = authData || email;
  const username = localStorage.getItem('username') || localStorage.getItem('email') || 'Guest';

  return (
    <>
      <aside
        aria-hidden={!mobileMenuOpen}
        className={`fixed z-30 top-0 left-0 h-screen bg-gray-900/90 backdrop-blur-xl border-r border-gray-800 transition-transform duration-300 w-64 ${mobileStateClass} md:translate-x-0 md:static md:w-64`}
      >
        <div className="p-4 md:p-6 flex items-center gap-3 justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center"><VyaparLogo size={42} /></div>
            <span className={`text-2xl font-extrabold text-white tracking-tight`}>VYAPAR AI</span>
          </div>

          {/* Mobile close button */}
          <button aria-label="Close menu" onClick={() => setMobileMenuOpen && setMobileMenuOpen(false)} className="md:hidden text-gray-300 hover:text-white">×</button>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item, idx) => (
            idx < 2 ? (
              <NavLink
                key={item.id}
                to={`/${item.id}`}
                className={({ isActive }) => `w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
              >
                <item.icon size={22} className="transition-transform duration-300" />
                <span className={`font-medium whitespace-nowrap`}>{item.label}</span>
              </NavLink>
            ) : (
              <NavLink
                key={item.id}
                to={`/${item.id}`}
                className={({ isActive }) => `w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
              >
                <item.icon size={22} className="transition-transform duration-300" />
                <span className={`font-medium transition-opacity whitespace-nowrap opacity-100`}>{item.label}</span>
                {/* active right indicator */}
                {/** NavLink handles active styling but we keep a subtle right bar when active */}
                <span className="absolute right-0 top-0 h-full w-1 bg-transparent group-hover:bg-white/5"></span>
              </NavLink>
            )
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-gray-800">
          {isLoggedIn ? (
            // Logged in state - show user info and logout button
            <>
              <div className={`flex items-center gap-3 mb-3`}> 
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 p-[2px]">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Boss" className="rounded-full bg-gray-900" alt="profile" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{username}</p>
                  <p className="text-xs text-gray-500">Authenticated</p>
                </div>
              </div>
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-gray-400 hover:bg-red-900/20 hover:text-red-400 transition-all duration-300"
                >
                  <LogOut size={18} />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              )}
            </>
          ) : (
            // Logged out state - show login button
            <button
              onClick={() => navigate('/login')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-300 shadow-lg shadow-indigo-600/25"
            >
              <LogIn size={18} />
              <span className="text-sm font-medium">Login</span>
            </button>
          )}
        </div>
      </aside>

      {/* Mobile backdrop - closes mobile menu when clicked */}
      <div
        onClick={() => setMobileMenuOpen && setMobileMenuOpen(false)}
        className={`md:hidden fixed inset-0 bg-black/40 transition-opacity z-20 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />
    </>
  );
}
