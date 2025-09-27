import React, { useState } from 'react';
import { ChevronDown, TrendingUp, Activity, DollarSign, BarChart3, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useDLMM } from '../hooks/useDLMM';
import clsx from 'clsx';

interface PoolDetailsProps {
  poolAddress: string;
  tokenX: string;
  tokenY: string;
  totalValue: number;
  pnl: number;
  pnlPercentage: number;
}

const PoolDetails: React.FC<PoolDetailsProps> = ({
  poolAddress,
  tokenX,
  tokenY,
  totalValue,
  pnl,
  pnlPercentage,
}) => {
  // Mock detailed analytics data
  const mockAnalytics = {
    volume24h: Math.random() * 100000 + 50000,
    fees24h: Math.random() * 1000 + 500,
    apr: Math.random() * 50 + 10,
    tvl: Math.random() * 1000000 + 500000,
    priceRange: {
      min: Math.random() * 0.5 + 0.5,
      max: Math.random() * 0.5 + 1.5,
      current: 1.0,
    },
    liquidityDistribution: [
      { price: 0.8, liquidity: 20 },
      { price: 0.9, liquidity: 45 },
      { price: 1.0, liquidity: 100 },
      { price: 1.1, liquidity: 60 },
      { price: 1.2, liquidity: 25 },
    ],
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  };

  return (
    <div className="space-y-6">
      {/* Pool Header */}
      <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50 rounded-2xl p-6 border border-indigo-100 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl">
              <BarChart3 className="w-8 h-8 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{tokenX}/{tokenY}</h3>
              <p className="text-sm text-gray-500 font-mono bg-white/60 px-3 py-1 rounded-full mt-1">
                {formatAddress(poolAddress)}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-gray-900 mb-1">{formatCurrency(totalValue)}</p>
            <div className={clsx(
              'inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold',
              pnl >= 0 
                ? 'bg-emerald-100 text-emerald-700' 
                : 'bg-rose-100 text-rose-700'
            )}>
              {pnl >= 0 ? (
                <ArrowUpRight className="w-4 h-4" />
              ) : (
                <ArrowDownRight className="w-4 h-4" />
              )}
              {formatCurrency(pnl)} ({formatPercentage(pnlPercentage)})
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-100 rounded-xl">
              <Activity className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-sm font-semibold text-gray-700">24h Volume</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(mockAnalytics.volume24h)}</p>
          <p className="text-xs text-gray-500 mt-1">Trading volume</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-emerald-100 rounded-xl">
              <DollarSign className="w-5 h-5 text-emerald-600" />
            </div>
            <span className="text-sm font-semibold text-gray-700">24h Fees</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(mockAnalytics.fees24h)}</p>
          <p className="text-xs text-gray-500 mt-1">Fees collected</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-100 rounded-xl">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-sm font-semibold text-gray-700">APR</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatPercentage(mockAnalytics.apr)}</p>
          <p className="text-xs text-gray-500 mt-1">Annual return</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-orange-100 rounded-xl">
              <Activity className="w-5 h-5 text-orange-600" />
            </div>
            <span className="text-sm font-semibold text-gray-700">TVL</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(mockAnalytics.tvl)}</p>
          <p className="text-xs text-gray-500 mt-1">Total value locked</p>
        </div>
      </div>

      {/* Price Range */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg">
        <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <div className="p-2 bg-indigo-100 rounded-xl">
            <BarChart3 className="w-5 h-5 text-indigo-600" />
          </div>
          Price Range
        </h4>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-500 mb-1">Min Price</p>
              <p className="text-lg font-bold text-gray-900">{mockAnalytics.priceRange.min.toFixed(4)}</p>
            </div>
            <div className="text-center p-4 bg-indigo-50 rounded-xl border border-indigo-200">
              <p className="text-sm text-indigo-600 mb-1">Current Price</p>
              <p className="text-lg font-bold text-indigo-700">{mockAnalytics.priceRange.current.toFixed(4)}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-500 mb-1">Max Price</p>
              <p className="text-lg font-bold text-gray-900">{mockAnalytics.priceRange.max.toFixed(4)}</p>
            </div>
          </div>
          
          {/* Price Range Visualization */}
          <div className="mt-6">
            <div className="h-3 bg-gray-200 rounded-full relative overflow-hidden">
              <div 
                className="h-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full absolute"
                style={{
                  left: '20%',
                  width: '60%'
                }}
              />
              <div 
                className="w-4 h-4 bg-white border-2 border-indigo-600 rounded-full absolute top-[-2px] shadow-lg"
                style={{ left: '50%', transform: 'translateX(-50%)' }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>{mockAnalytics.priceRange.min.toFixed(2)}</span>
              <span className="font-semibold text-indigo-600">Current</span>
              <span>{mockAnalytics.priceRange.max.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Liquidity Distribution */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg">
        <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-xl">
            <Activity className="w-5 h-5 text-purple-600" />
          </div>
          Liquidity Distribution
        </h4>
        <div className="space-y-3">
          {mockAnalytics.liquidityDistribution.map((item, index) => (
            <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
              <span className="text-sm font-semibold text-gray-700 w-16">{item.price.toFixed(2)}</span>
              <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-indigo-600 h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${item.liquidity}%` }}
                />
              </div>
              <span className="text-sm font-semibold text-gray-700 w-12">{item.liquidity}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const PoolAnalytics: React.FC = () => {
  const { positions, isLoading } = useDLMM();
  const [selectedPool, setSelectedPool] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-lg">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl">
            <BarChart3 className="w-8 h-8 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-3xl font-bold tracking-tight text-gray-900">Pool Analytics</h3>
            <p className="text-sm text-gray-500 italic mt-1">Detailed pool performance metrics</p>
          </div>
        </div>
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-200 border-t-indigo-600"></div>
        </div>
      </div>
    );
  }

  if (positions.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-lg">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl">
            <BarChart3 className="w-8 h-8 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-3xl font-bold tracking-tight text-gray-900">Pool Analytics</h3>
            <p className="text-sm text-gray-500 italic mt-1">Detailed pool performance metrics</p>
          </div>
        </div>
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <BarChart3 className="w-10 h-10 text-gray-400" />
          </div>
          <h4 className="text-xl font-semibold text-gray-900 mb-2">No pools to analyze</h4>
          <p className="text-gray-500">Add liquidity to pools to see analytics</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Pool Selector Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">
        <div className="p-6 md:p-8 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl">
              <BarChart3 className="w-8 h-8 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-3xl font-bold tracking-tight text-gray-900">Pool Analytics</h3>
              <p className="text-sm text-gray-500 italic mt-1">Click on a pool to view detailed analytics</p>
            </div>
          </div>
        </div>
        
        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Pool</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Value</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">P&L</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">P&L %</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {positions.map((position, index) => {
                const isProfit = position.pnl >= 0;
                const isSelected = selectedPool === position.poolAddress;
                
                return (
                  <tr 
                    key={position.poolAddress}
                    className={clsx(
                      'hover:bg-gray-50 transition-colors cursor-pointer',
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50',
                      isSelected && 'bg-indigo-50 hover:bg-indigo-50'
                    )}
                    onClick={() => setSelectedPool(
                      selectedPool === position.poolAddress ? null : position.poolAddress
                    )}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg">
                          <DollarSign className="w-4 h-4 text-indigo-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{position.tokenX}/{position.tokenY}</p>
                          <p className="text-xs text-gray-500 font-mono">
                            {position.poolAddress.slice(0, 8)}...{position.poolAddress.slice(-8)}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="font-bold text-gray-900">
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD',
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }).format(position.totalValue)}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className={clsx(
                        'inline-flex items-center gap-1 font-semibold',
                        isProfit ? 'text-emerald-600' : 'text-rose-600'
                      )}>
                        {isProfit ? (
                          <ArrowUpRight className="w-4 h-4" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4" />
                        )}
                        {new Intl.NumberFormat('en-US', {
                          style: 'currency',
                          currency: 'USD',
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }).format(position.pnl)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className={clsx(
                        'inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold',
                        isProfit 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : 'bg-rose-100 text-rose-700'
                      )}>
                        {isProfit ? '↑' : '↓'}
                        {position.pnlPercentage.toFixed(2)}%
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <ChevronDown className={clsx(
                        'w-5 h-5 text-gray-400 transition-transform mx-auto',
                        isSelected && 'rotate-180 text-indigo-600'
                      )} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Pool Details */}
      {selectedPool && (
        <div className="animate-fade-in-up">
          {(() => {
            const position = positions.find(p => p.poolAddress === selectedPool);
            if (!position) return null;
            
            return (
              <PoolDetails
                poolAddress={position.poolAddress}
                tokenX={position.tokenX}
                tokenY={position.tokenY}
                totalValue={position.totalValue}
                pnl={position.pnl}
                pnlPercentage={position.pnlPercentage}
              />
            );
          })()}
        </div>
      )}
    </div>
  );
};