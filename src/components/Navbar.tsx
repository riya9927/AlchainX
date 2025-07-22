import React from 'react';
import {
  Brain,
  Wallet,
  User,
  Upload,
  Home,
  Search,
  LogIn,
  UserPlus,
  LogOut,
} from 'lucide-react';
import { logout } from '../firebaseAuth';

type Page = 'home' | 'marketplace' | 'upload' | 'dashboard' | 'model-detail' | 'login' | 'signup';

interface NavbarProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
  isWalletConnected: boolean;
  isAuthenticated: boolean;
  onWalletToggle: () => void;
  onLogout: () => void; // callback to update parent state on logout
}

export default function Navbar({
  currentPage,
  onPageChange,
  isWalletConnected,
  isAuthenticated,
  onWalletToggle,
  onLogout,
}: NavbarProps) {
  const navItems = [
    { id: 'home' as Page, label: 'Home', icon: Home },
    { id: 'marketplace' as Page, label: 'Marketplace', icon: Search },
    { id: 'upload' as Page, label: 'Upload', icon: Upload },
    { id: 'dashboard' as Page, label: 'Dashboard', icon: User },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      onLogout(); // notify parent
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <nav className="border-b border-white/10 bg-black/20 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                AIchainX
              </span>
            </div>

            {/* Nav Items */}
            <div className="hidden md:flex space-x-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onPageChange(item.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                      currentPage === item.id
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Wallet + Auth Buttons */}
          <div className="flex items-center space-x-3">
            {!isAuthenticated && currentPage !== 'login' && currentPage !== 'signup' && (
              <>
                <button
                  onClick={() => onPageChange('login')}
                  className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition"
                >
                  <LogIn className="w-4 h-4" />
                  <span className="hidden sm:inline">Login</span>
                </button>
                <button
                  onClick={() => onPageChange('signup')}
                  className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition"
                >
                  <UserPlus className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign Up</span>
                </button>
              </>
            )}

            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-red-400 hover:text-white hover:bg-red-500/20 border border-red-400/30 rounded-lg transition"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}

            {/* Wallet */}
            <button
              onClick={onWalletToggle}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isWalletConnected
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30'
                  : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
              }`}
            >
              <Wallet className="w-4 h-4" />
              <span className="hidden sm:inline">
                {isWalletConnected ? '0x1234...5678' : 'Connect Wallet'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
