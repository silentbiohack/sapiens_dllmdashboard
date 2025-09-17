import React from 'react';
import { BarChart3 } from 'lucide-react';

interface PoolPriceRangeProps {
  minPrice: number;
  currentPrice: number;
  maxPrice: number;
}

export const PoolPriceRange: React.FC<PoolPriceRangeProps> = ({ 
  minPrice, 
  currentPrice, 
  maxPrice 
}) => {
  // Calculate position of current price within the range
  const range = maxPrice - minPrice;
  const currentPosition = ((currentPrice - minPrice) / range) * 100;

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-semibold text-gray-900">Price Range</h3>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">Min Price</p>
          <p className="text-lg font-bold text-gray-900">{minPrice.toFixed(4)}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">Current Price</p>
          <p className="text-lg font-bold text-indigo-700">{currentPrice.toFixed(4)}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-1">Max Price</p>
          <p className="text-lg font-bold text-gray-900">{maxPrice.toFixed(4)}</p>
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="relative">
        <div className="w-full h-2 bg-gray-200 rounded-full">
          <div 
            className="h-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
            style={{ width: '100%' }}
          />
        </div>
        <div 
          className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white border-2 border-indigo-600 rounded-full shadow-md"
          style={{ left: `${currentPosition}%`, transform: 'translateX(-50%) translateY(-50%)' }}
        />
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>{minPrice.toFixed(2)}</span>
          <span>{maxPrice.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-700">
          Current liquidity is concentrated between {minPrice.toFixed(4)} and {maxPrice.toFixed(4)}
        </p>
      </div>
    </div>
  );
};