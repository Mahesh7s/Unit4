import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Brain, Home, Plus, Album, Search, LogOut, User, Moon, Sun, LogIn, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Timeline' },
    { path: '/dashboard?create=true', icon: Plus, label: 'Create' },
    { path: '/albums', icon: Album, label: 'Albums' },
    { path: '/search', icon: Search, label: 'Search' }
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleCreateClick = () => {
    // If we're already on dashboard, navigate to same path with query param
    if (location.pathname === '/dashboard') {
      navigate('/dashboard?create=true', { replace: true });
    } else {
      // If we're on another page, navigate to dashboard with create param
      navigate('/dashboard?create=true');
    }
  };

  return (
    <nav className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-purple-600 dark:text-purple-400">
            <Brain className="w-8 h-8" />
            MemoryLane
          </Link>

          {/* Navigation Items - Only show when user is authenticated AND not on landing page */}
          {user && location.pathname !== '/' && (
            <div className="hidden md:flex items-center gap-1">
              {navItems.map(({ path, icon: Icon, label }) => (
                <React.Fragment key={path}>
                  {label === 'Create' ? (
                    <button
                      onClick={handleCreateClick}
                      className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                        location.search.includes('create=true')
                          ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30'
                          : 'text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        <span>{label}</span>
                      </div>
                      {location.search.includes('create=true') && (
                        <motion.div
                          layoutId="navbar-indicator"
                          className="absolute inset-0 bg-purple-100 dark:bg-purple-900/40 rounded-lg -z-10"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </button>
                  ) : (
                    <Link
                      to={path}
                      className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                        isActive(path.split('?')[0])
                          ? 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30'
                          : 'text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        <span>{label}</span>
                      </div>
                      {isActive(path.split('?')[0]) && (
                        <motion.div
                          layoutId="navbar-indicator"
                          className="absolute inset-0 bg-purple-100 dark:bg-purple-900/40 rounded-lg -z-10"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </Link>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}

          {/* User Menu */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle - Always show */}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Show user info and logout when authenticated AND not on landing page */}
            {user && location.pathname !== '/' && (
              <>
                <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <User className="w-4 h-4" />
                  <span>{user.displayName || user.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}

            {/* Show login/signup when user is not authenticated */}
            {!user && (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-4 py-2 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg font-medium transition-colors duration-200"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white hover:bg-purple-700 rounded-lg font-medium transition-colors duration-200"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Sign Up</span>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation - Only show when user is authenticated AND not on landing page */}
        {user && location.pathname !== '/' && (
          <div className="md:hidden flex justify-around py-2 border-t border-gray-200 dark:border-gray-700">
            {navItems.map(({ path, icon: Icon, label }) => (
              <React.Fragment key={path}>
                {label === 'Create' ? (
                  <button
                    onClick={handleCreateClick}
                    className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors duration-200 ${
                      location.search.includes('create=true')
                        ? 'text-purple-600 dark:text-purple-400'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-xs">{label}</span>
                  </button>
                ) : (
                  <Link
                    to={path}
                    className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors duration-200 ${
                      isActive(path.split('?')[0])
                        ? 'text-purple-600 dark:text-purple-400'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-xs">{label}</span>
                  </Link>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
