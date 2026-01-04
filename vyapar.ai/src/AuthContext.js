// src/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";

// AuthContext wired to our backend JWT endpoints. This implementation
// calls the backend at /login and /signup and stores tokens in
// localStorage for simplicity. For production, prefer httpOnly cookies.

const AuthContext = createContext();

const STORAGE_KEY = "vyapar_auth";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://vyaparapi.ecellecb.com';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return parsed?.email ? { email: parsed.email } : null;
    } catch (e) {
      return null;
    }
  });

  const [tokens, setTokens] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (tokens) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
      setUser(tokens.email ? { email: tokens.email } : null);
    } else {
      localStorage.removeItem(STORAGE_KEY);
      setUser(null);
    }
  }, [tokens]);

  const saveTokens = (accessToken, refreshToken, email) => {
    const obj = { accessToken, refreshToken, email };
    setTokens(obj);
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `Login failed: ${res.status}`);
      }
      const data = await res.json();
      const userEmail = data.email || email;
      saveTokens(data.accessToken || data.access_token || null, data.refreshToken || data.refresh_token || null, userEmail);
      setUser({ email: userEmail });
      return { email: userEmail };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, email, password) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `Signup failed: ${res.status}`);
      }
      const data = await res.json();
      const access = data.accessToken || data.access_token || null;
      const refresh = data.refreshToken || data.refresh_token || null;
      if (access) {
        saveTokens(access, refresh, email);
        setUser({ email });
        return { email, verified: true };
      }
      return { email, verified: false };
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async (idToken) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/google-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `Google login failed: ${res.status}`);
      }
      const data = await res.json();
      const access = data.accessToken || data.access_token || null;
      const refresh = data.refreshToken || data.refresh_token || null;
      const email = data.email || null;
      saveTokens(access, refresh, email);
      setUser({ email });
      return { email };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    // Call backend logout endpoint
    try {
      await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader()
        }
      });
    } catch (e) {
      console.error('Logout error:', e);
    }
    
    // Clear all authentication data
    setTokens(null);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('email');
    localStorage.removeItem('username');
    localStorage.removeItem('authToken');
  };

  const getAccessToken = () => tokens?.accessToken || null;

  const getAuthHeader = () => {
    const t = getAccessToken();
    return t ? { Authorization: `Bearer ${t}` } : {};
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, getAccessToken, getAuthHeader, googleLogin }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
