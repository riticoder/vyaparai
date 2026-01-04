import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://vyaparapi.ecellecb.com/api';
const BACKEND_URL = process.env.REACT_APP_API_BASE_URL || 'https://vyaparapi.ecellecb.com';

/**
 * Complete login component with Google OAuth.
 * - Email-based authentication (no username)
 * - AuthContext integration
 */
export default function Login({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, signup, googleLogin } = useAuth();

  // Check for OAuth login success
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const userEmail = urlParams.get('email');
    
    if (token && userEmail) {
      localStorage.setItem('authToken', token);
      localStorage.setItem('email', userEmail);
      localStorage.setItem('username', userEmail);
      setSuccess('Google login successful!');
      setTimeout(() => {
        if (onLoginSuccess) onLoginSuccess();
        navigate('/overview');
      }, 1000);
    }
  }, [location, navigate, onLoginSuccess]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      await login(email, password);
      setSuccess('Login successful!');
      setTimeout(() => {
        if (onLoginSuccess) onLoginSuccess(email);
        navigate('/overview');
      }, 500);
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      await signup(fullName, email, password);
      setSuccess('Registration successful! Please login.');
      setTimeout(() => setIsLogin(true), 2000);
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${BACKEND_URL}/oauth2/authorization/google`;
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center p-4 relative">
      {/* Main Login Container */}
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Panel */}
        <div className="md:w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-12 text-white flex flex-col justify-center">
          <h1 className="text-5xl font-bold mb-6">Vyapar.ai</h1>
          <p className="text-xl opacity-90 leading-relaxed">
            Your intelligent business assistant. Sign in to access powerful AI-driven solutions for your business needs.
          </p>
        </div>

        {/* Right Panel */}
        <div className="md:w-1/2 p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-gray-600">
              {isLogin ? 'Sign in to continue' : 'Join Vyapar.ai today'}
            </p>
          </div>

          {/* Alert Messages */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              {success}
            </div>
          )}

          {/* Login Form */}
          {isLogin ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors text-gray-800"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Password</label>
                <input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors text-gray-800"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Sign In
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors text-gray-800"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors text-gray-800"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors text-gray-800"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Create Account
              </button>
            </form>
          )}

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">OR</span>
            </div>
          </div>

          {/* Google Sign-In Button - Will be auto-rendered by Google */}
          <div id="google-signin-button" className="flex justify-center mb-4"></div>

          {/* Fallback: Regular Google OAuth Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 hover:border-indigo-500 transition-all duration-300 flex items-center justify-center gap-3"
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Or Continue with Google OAuth
          </button>

          {/* Toggle Form */}
          <div className="text-center mt-6 text-gray-600">
            {isLogin ? (
              <>
                Don't have an account?{' '}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-indigo-600 font-semibold hover:underline"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-indigo-600 font-semibold hover:underline"
                >
                  Sign in
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
