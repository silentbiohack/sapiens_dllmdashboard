import React from 'react';
import { WalletButton } from './WalletButton';
import { BarChart3, TrendingUp, Home, Database, BookOpen } from 'lucide-react';
import { useNavigation } from '../contexts/NavigationContext';

export const Header: React.FC = () => {
  const { currentPage, setCurrentPage } = useNavigation();

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-r from-indigo-600 to-purple-700 p-2.5 rounded-xl transform group-hover:scale-105 transition-transform duration-200">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 group-hover:text-indigo-700 transition-colors duration-200">
                  DLMM Dashboard
                </h1>
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <TrendingUp className="w-3 h-3" />
                  <span className="italic">Dynamic Liquidity Market Making</span>
                </div>
              </div>
            </div>
            
            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1 ml-8">
              <button 
                onClick={() => setCurrentPage('dashboard')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                  currentPage === 'dashboard'
                    ? 'text-indigo-600 bg-indigo-50'
                    : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                }`}
              >
                <Home className="w-4 h-4" />
                <span>Dashboard</span>
              </button>
              <a 
                href="#" 
                className="flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50 transition-colors"
              >
                <Database className="w-4 h-4" />
                <span>Pools</span>
              </a>
              <button 
                onClick={() => setCurrentPage('docs')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                  currentPage === 'docs'
                    ? 'text-indigo-600 bg-indigo-50'
                    : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-50'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Docs</span>
              </button>
            </nav>
          </div>
          
          {/* Wallet Button */}
          <div className="transform hover:scale-105 transition-transform duration-200">
            <WalletButton />
          </div>
        </div>
      </div>
    </header>
  );
};