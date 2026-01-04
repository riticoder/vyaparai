import React from 'react';
import { Menu, X, Search, Bell, LogOut, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// TopHeader (layout)
// - Clean header: no desktop collapse control. Mobile toggles mobile menu.
export default function TopHeader({ activePath, mobileMenuOpen, setMobileMenuOpen, onLogout }){
  const navigate = useNavigate();
  
  // Check if user is logged in
  const authData = localStorage.getItem('vyapar_auth');
  const email = localStorage.getItem('email');
  const isLoggedIn = authData || email;

  return (
    <header className="h-20 flex items-center justify-between px-4 md:px-8 border-b border-gray-800/50 backdrop-blur-sm z-20">
      <div className="flex items-center gap-3 md:gap-4">
        {/* Mobile menu toggler */}
        <button aria-label="Toggle mobile menu" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-gray-400">{mobileMenuOpen ? <X /> : <Menu />}</button>

        {/* Title visible only on md+ */}
        <h1 className="text-md md:text-xl font-bold text-white hidden md:block uppercase tracking-wider opacity-50">Dashboard / {activePath}</h1>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input aria-label="Search system" type="text" placeholder="Search system..." className="bg-gray-800/50 border border-gray-700 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:border-indigo-500 focus:bg-gray-800 outline-none transition-all w-48 md:w-64 md:focus:w-80 shadow-inner" />
        </div>

        <div role="button" aria-label="Notifications" className="relative cursor-pointer hover:bg-gray-800 p-2 rounded-full transition-colors"><Bell className="text-gray-300" /><span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-ping" aria-hidden="true"></span><span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" aria-hidden="true"></span></div>
        
        {isLoggedIn ? (
          // Show Logout button when logged in
          onLogout && (
            <button
              onClick={onLogout}
              aria-label="Logout"
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-red-900/20 hover:bg-red-900/40 text-red-400 rounded-lg transition-all duration-300"
            >
              <LogOut size={18} />
              <span className="text-sm font-medium">Logout</span>
            </button>
          )
        ) : (
          // Show Login button when not logged in
          <button
            onClick={() => navigate('/login')}
            aria-label="Login"
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-all duration-300"
          >
            <LogIn size={18} />
            <span className="text-sm font-medium">Login</span>
          </button>
        )}
      </div>
    </header>
  );
}
