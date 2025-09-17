import React from 'react';
import { BarChart3, FileText, Layers } from 'lucide-react';
import { useNavigation } from '../contexts/NavigationContext';

export const Navbar: React.FC = () => {
  const { currentPage, setCurrentPage } = useNavigation();

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl">
              <BarChart3 className="w-8 h-8 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Sapiens</h1>
              <p className="text-xs text-gray-500">DLMM Dashboard</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => setCurrentPage('dashboard')}
              className={`font-medium transition-colors duration-200 px-3 py-2 rounded-lg ${
                currentPage === 'dashboard'
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setCurrentPage('pools')}
              className={`inline-flex items-center gap-2 font-medium transition-colors duration-200 px-3 py-2 rounded-lg ${
                currentPage === 'pools' || currentPage.startsWith('pools/')
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              <Layers className="w-4 h-4" />
              Pools
            </button>
            <button
              onClick={() => setCurrentPage('docs')}
              className={`inline-flex items-center gap-2 font-medium transition-colors duration-200 px-3 py-2 rounded-lg ${
                currentPage === 'docs'
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              <FileText className="w-4 h-4" />
              Docs
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="p-2 rounded-lg text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-colors duration-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};