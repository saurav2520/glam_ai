import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// Get the API base URL
const getApiBaseUrl = () => {
  // In development, use relative URLs (Vite proxy handles this)
  // In production, use the full URL
  if (import.meta.env.DEV) {
    return '';
  } else {
    return 'https://glamai-backend.onrender.com';
  }
};

const API_BASE_URL = getApiBaseUrl();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Set up axios defaults
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      checkAuthStatus();
    } else {
      setLoading(false);
    }
  }, [token]);

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/auth/me`);
      setUser(response.data.user);
    } catch (error) {
      console.error('Auth check failed:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      console.log('Login attempt for:', email);
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password });
      
      // Check if the response was successful
      if (response.status === 200 && response.data.token && response.data.user) {
        const { token: newToken, user: userData } = response.data;
        
        console.log('Login successful, token received:', !!newToken);
        console.log('User data:', userData);
        
        // Update state in the correct order
        setToken(newToken);
        setUser(userData);
        localStorage.setItem('token', newToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        
        console.log('Auth state updated, user:', userData);
        
        return { success: true };
      } else {
        console.error('Login response missing required data:', response.data);
        return { 
          success: false, 
          message: 'Invalid response from server' 
        };
      }
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.message || 'Login failed';
      console.log('Login failed with message:', errorMessage);
      return { 
        success: false, 
        message: errorMessage
      };
    }
  };

  const register = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/register`, { email, password });
      
      // Check if the response was successful
      if (response.status === 201 && response.data.token && response.data.user) {
        const { token: newToken, user: userData } = response.data;
        
        setToken(newToken);
        setUser(userData);
        localStorage.setItem('token', newToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        console.log('Registration successful, user:', userData);
        return { success: true };
      } else {
        console.error('Registration response missing required data:', response.data);
        return { 
          success: false, 
          message: 'Invalid response from server' 
        };
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      console.log('Registration failed with message:', errorMessage);
      return { 
        success: false, 
        message: errorMessage
      };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  // Debug logging
  console.log('AuthContext state:', { user, token, loading, isAuthenticated: !!user });

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
