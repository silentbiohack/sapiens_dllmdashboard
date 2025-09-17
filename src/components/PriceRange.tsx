import React, { useState } from 'react';
import { BarChart3 } from 'lucide-react';

export const PriceRange: React.FC = () => {
  const [currentPrice] = useState(1.0000);
  const minPrice = 0.6205;
  const maxPrice = 1.6433;
  
  // Calculate slider position (0-100%)
  const sliderPosition = ((currentPrice - minPrice) / (maxPrice - minPrice)) * 100;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-purple-100">
          <BarChart3 className="w-5 h-5 text-purple-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Price Range</h3>
      </div>

      <div className="space-y-6">
        {/* Price Display Grid */}
        <div className="grid grid-cols-3 gap-4">
          {/* Min Price */}
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600 mb-2">Min Price</p>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-lg font-bold text-gray-900">{minPrice}</p>
            </div>
          </div>

          {/* Current Price */}
          <div className="text-center">
            <p className="text-sm font-medium text-purple-600 mb-2">Current Price</p>
            <div className="bg-purple-50 rounded-lg p-3 border-2 border-purple-200">
              <p className="text-lg font-bold text-purple-700">{currentPrice.toFixed(4)}</p>
            </div>
          </div>

          {/* Max Price */}
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600 mb-2">Max Price</p>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-lg font-bold text-gray-900">{maxPrice}</p>
            </div>
          </div>
        </div>

        {/* Price Range Slider */}
        <div className="relative">
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            {/* Active range (purple part) */}
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full relative"
              style={{ width: `${sliderPosition}%` }}
            >
              {/* Current price indicator */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-purple-500 rounded-full shadow-lg"
                style={{ right: '-8px' }}
              />
            </div>
          </div>
          
          {/* Price labels under slider */}
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>{minPrice}</span>
            <span>{maxPrice}</span>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-purple-700">Position in Range</span>
            <span className="text-sm font-bold text-purple-800">{sliderPosition.toFixed(1)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};