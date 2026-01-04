import React, { useEffect } from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

export default function GoogleOneTap() {
  const { googleLogin, user } = useAuth();
  const navigate = useNavigate();
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  useEffect(() => {
    // Don't show if user is already logged in
    if (user || !clientId) return;

    // Load Google Identity Services script
    const scriptId = 'google-one-tap-script';
    if (document.getElementById(scriptId)) {
      initializeOneTap();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.id = scriptId;
    
    script.onload = () => {
      // Wait 5 seconds after page load, then show One Tap
      setTimeout(() => {
        initializeOneTap();
      }, 5000);
    };

    document.body.appendChild(script);

    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [user, clientId]);

  const initializeOneTap = () => {
    if (!window.google || !clientId) return;

    try {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
        context: 'signin',
        ux_mode: 'popup',
        itp_support: true,
      });

      // Display the One Tap prompt in top-right corner
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed()) {
          console.log('One Tap not displayed:', notification.getNotDisplayedReason());
        } else if (notification.isSkippedMoment()) {
          console.log('One Tap skipped:', notification.getSkippedReason());
        } else if (notification.isDismissedMoment()) {
          console.log('One Tap dismissed:', notification.getDismissedReason());
        }
      });
    } catch (err) {
      console.error('Error initializing Google One Tap:', err);
    }
  };

  const handleCredentialResponse = async (response) => {
    try {
      const credential = response?.credential;
      if (!credential) {
        throw new Error('No credential received from Google');
      }
      
      // Call the Google One Tap endpoint directly
      const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://vyaparapi.ecellecb.com';
      const res = await fetch(`${API_BASE_URL}/api/auth/google-one-tap`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential }),
      });

      if (!res.ok) {
        throw new Error('Google One Tap authentication failed');
      }

      const data = await res.json();
      const access = data.accessToken || data.access_token || null;
      const refresh = data.refreshToken || data.refresh_token || null;
      const email = data.email || null;

      // Save tokens to localStorage
      const STORAGE_KEY = "vyapar_auth";
      const obj = { accessToken: access, refreshToken: refresh, email };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
      localStorage.setItem('email', email); // For backward compatibility
      
      // Redirect to overview after successful login
      setTimeout(() => {
        window.location.href = '/overview';
      }, 500);
    } catch (err) {
      console.error('Google One Tap login failed:', err);
    }
  };

  // This component doesn't render anything visible
  return null;
}
