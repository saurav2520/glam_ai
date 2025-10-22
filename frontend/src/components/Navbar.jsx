import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Sparkles, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg border-b border-secondary-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Sparkles className="h-8 w-8 text-primary-600" />
            <span className="text-2xl font-bold text-primary-600">Glam.ai</span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-secondary-600">
                  Welcome, {user?.email}
                </span>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 text-secondary-600 hover:text-secondary-800 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <span className="text-secondary-600">
                AI-Powered Grooming Advisor
              </span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
