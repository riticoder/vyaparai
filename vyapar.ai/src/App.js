import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Package, ShoppingCart, BarChart2, Rocket, Bot } from 'lucide-react';
import './App.css';
import Sidebar from './components/layout/Sidebar';
import TopHeader from './components/layout/TopHeader';
import Splash3D from './components/layout/Splash3D';
import MobileNavbar from './components/layout/MobileNavbar';
import Overview from './pages/Overview';
import Inventory from './pages/Inventory';
import Orders from './pages/Orders';
import Analytics from './pages/Analytics';
import FutureScope from './pages/FutureScope';
import ChatAI from './pages/ChatAI';
import Loader from './components/ui/Loader';
import Login from './components/Login';
import GoogleOneTap from './components/GoogleOneTap';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [userEmail, setUserEmail] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Check for existing login
  useEffect(() => {
    const authData = localStorage.getItem('vyapar_auth');
    const email = localStorage.getItem('email');
    if (authData || email) {
      setUserEmail(email || JSON.parse(authData)?.email);
    }
  }, [user]);

  // Hide the splash after a short delay once the app mounts.
  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 1200);
    return () => clearTimeout(t);
  }, []);

  const handleLogout = async () => {
    try {
      // Use AuthContext logout (which calls backend and clears vyapar_auth)
      await logout();
      
      // Clear all possible localStorage keys (backward compatibility)
      localStorage.removeItem('authToken');
      localStorage.removeItem('username');
      localStorage.removeItem('email');
      localStorage.removeItem('vyapar_auth');
      
      setUserEmail(null);
      
      // Redirect to login page
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Force clear and redirect even on error
      localStorage.clear();
      navigate('/login');
    }
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'future', label: 'Future Scope', icon: Rocket },
    { id: 'chat', label: 'Ask AI', icon: Bot },
  ];

  // Check if user is logged in
  const authData = localStorage.getItem('vyapar_auth');
  const isLoggedIn = authData || userEmail;

  // Show splash on initial load
  if (showSplash) {
    return <Splash3D />;
  }

  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans selection:bg-indigo-500 selection:text-white flex overflow-hidden">
      <Sidebar navItems={navItems} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} onLogout={handleLogout} userEmail={userEmail} isLoggedIn={isLoggedIn} />

      <main className="flex-1 flex flex-col h-screen relative bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-800 via-gray-900 to-black">
        <TopHeader activePath={window.location.pathname.replace('/', '') || 'overview'} mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} onLogout={handleLogout} />

        {/* Google One Tap auto-popup after 5 seconds */}
        <GoogleOneTap />

        <div className="flex-1 overflow-y-auto p-6 md:p-10 relative scroll-smooth">
          <div className="max-w-7xl mx-auto pb-10">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/future" element={<FutureScope />} />
              <Route path="/chat" element={<ChatAI />} />
              <Route path="/" element={<Navigate to="/overview" replace />} />
            </Routes>
          </div>
        </div>
      </main>

      <MobileNavbar navItems={navItems} />
    </div>
  );
}
