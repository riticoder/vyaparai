import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * MobileNavbar
 * Bottom navigation bar for small screens.
 */
export default function MobileNavbar({ navItems = [] }){
  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-xl md:hidden">
      <div className="bg-gray-900/90 backdrop-blur-md border border-gray-800 rounded-3xl p-2 flex justify-between items-center">
        {navItems.map((item) => (
          <NavLink
            key={item.id}
            to={`/${item.id}`}
            className={({ isActive }) => `flex-1 flex flex-col items-center gap-1 py-2 px-2 rounded-2xl transition-colors ${isActive ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
          >
            <item.icon size={18} />
            <span className="text-[11px] hidden">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
