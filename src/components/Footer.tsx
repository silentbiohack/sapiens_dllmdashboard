import React from 'react';
import { Heart, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Main Footer Text */}
          <div className="flex items-center gap-2 text-gray-600">
            <span>Powered by</span>
            <a
              href="https://sapiens.finance"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-indigo-600 hover:text-indigo-700 transition-colors duration-200"
            >
              Sapiens DLMM SDK
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Additional Links */}
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a
              href="https://github.com/silentbiohack/sapiens_dllmdashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-600 transition-colors duration-200 flex items-center gap-1"
            >
              GitHub
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://docs.sapiens.finance"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-600 transition-colors duration-200 flex items-center gap-1"
            >
              Documentation
              <ExternalLink className="w-3 h-3" />
            </a>
            <div className="flex items-center gap-1">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-rose-500 fill-current" />
              <span>for DeFi</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-6 border-t border-gray-100 text-center text-xs text-gray-400">
          <p>© 2025 Sapiens Finance. All rights reserved. Built on Solana.</p>
        </div>
      </div>
    </footer>
  );
};