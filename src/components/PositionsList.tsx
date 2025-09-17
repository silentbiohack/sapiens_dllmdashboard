import React, { useState } from 'react';
import { TrendingUp, TrendingDown, AlertCircle, RefreshCw, ExternalLink, Copy, ChevronDown, ChevronUp, Activity, DollarSign } from 'lucide-react';
import { useDLMM } from '../hooks/useDLMM';
import { LoadingSpinner } from './LoadingSpinner';
import { Tooltip } from './Tooltip';
import clsx from 'clsx';

export const PositionsList: React.FC = () => {
  const { positions, isLoading, error, refreshData } = useDLMM();
  const [expandedPositions, setExpandedPositions] = useState<Set<string>>(new Set());

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const toggleExpanded = (poolAddress: string) => {
    const newExpanded = new Set(expandedPositions);
    if (newExpanded.has(poolAddress)) {
      newExpanded.delete(poolAddress);
    } else {
      newExpanded.add(poolAddress);
    }
    setExpandedPositions(newExpanded);
  };

  if (error) {
    return (
      <div className="bg-white rounded-2xl border border-rose-200 p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-rose-100 rounded-xl">
            <AlertCircle className="w-6 h-6 text-rose-600" />
          </div>
          <h3 className="text-2xl font-bold tracking-tight text-gray-900">LP Positions</h3>
        </div>
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 mb-6">
          <p className="text-rose-800 text-sm font-medium">{error}</p>
        </div>
        <button
          onClick={refreshData}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-600 to-rose-700 text-white rounded-full hover:from-rose-700 hover:to-rose-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <RefreshCw className="w-4 h-4" />
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-lg">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl">
            <Activity className="w-8 h-8 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-3xl font-bold tracking-tight text-gray-900">LP Positions</h3>
            <p className="text-sm text-gray-500 italic mt-1">Your active liquidity provider positions</p>
          </div>
        </div>
        {!isLoading && (
          <button
            onClick={refreshData}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 text-indigo-700 rounded-full transition-all duration-200 border border-indigo-200 hover:border-indigo-300 font-medium"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        )}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <LoadingSpinner size="lg" />
        </div>
      ) : positions.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Activity className="w-10 h-10 text-gray-400" />
          </div>
          <h4 className="text-xl font-semibold text-gray-900 mb-2">No LP positions found</h4>
          <p className="text-gray-500">Connect your wallet to view your positions</p>
        </div>
      ) : (
        <div className="space-y-4">
          {positions.map((position) => {
            const isExpanded = expandedPositions.has(position.poolAddress);
            const isProfit = position.pnl >= 0;
            
            return (
              <div
                key={position.poolAddress}
                className="bg-gradient-to-r from-gray-50/50 to-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-indigo-200"
              >
                <div 
                  className="p-6 cursor-pointer"
                  onClick={() => toggleExpanded(position.poolAddress)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl">
                        <DollarSign className="w-6 h-6 text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-1">
                          {position.tokenX}/{position.tokenY}
                        </h4>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-500 font-mono bg-gray-100 px-3 py-1 rounded-full">
                            {formatAddress(position.poolAddress)}
                          </span>
                          <div className={clsx(
                            'inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold',
                            isProfit 
                              ? 'bg-emerald-100 text-emerald-700' 
                              : 'bg-rose-100 text-rose-700'
                          )}>
                            {isProfit ? (
                              <TrendingUp className="w-3 h-3" />
                            ) : (
                              <TrendingDown className="w-3 h-3" />
                            )}
                            {position.pnlPercentage.toFixed(2)}%
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900 mb-1">
                          {formatCurrency(position.totalValue)}
                        </p>
                        <div className={clsx(
                          'flex items-center gap-1 text-sm font-semibold',
                          isProfit ? 'text-emerald-600' : 'text-rose-600'
                        )}>
                          {isProfit ? (
                            <TrendingUp className="w-4 h-4" />
                          ) : (
                            <TrendingDown className="w-4 h-4" />
                          )}
                          {formatCurrency(position.pnl)}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Tooltip content="View on Solscan">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(`https://solscan.io/account/${position.poolAddress}`, '_blank');
                            }}
                            className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        </Tooltip>
                        <Tooltip content="Copy pool address">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              copyToClipboard(position.poolAddress);
                            }}
                            className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        </Tooltip>
                        <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200">
                          {isExpanded ? (
                            <ChevronUp className="w-5 h-5" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {isExpanded && (
                  <div className="border-t border-gray-100 bg-gray-50/50 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-white rounded-xl p-4 border border-gray-200">
                        <h5 className="text-sm font-semibold text-gray-700 mb-2">Position Details</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Pool Address:</span>
                            <span className="font-mono text-gray-900">{formatAddress(position.poolAddress)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Token Pair:</span>
                            <span className="font-semibold text-gray-900">{position.tokenX}/{position.tokenY}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-xl p-4 border border-gray-200">
                        <h5 className="text-sm font-semibold text-gray-700 mb-2">Value Metrics</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Total Value:</span>
                            <span className="font-semibold text-gray-900">{formatCurrency(position.totalValue)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">P&L:</span>
                            <span className={clsx(
                              'font-semibold',
                              isProfit ? 'text-emerald-600' : 'text-rose-600'
                            )}>
                              {formatCurrency(position.pnl)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-xl p-4 border border-gray-200">
                        <h5 className="text-sm font-semibold text-gray-700 mb-2">Performance</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500">P&L %:</span>
                            <span className={clsx(
                              'font-semibold',
                              isProfit ? 'text-emerald-600' : 'text-rose-600'
                            )}>
                              {position.pnlPercentage.toFixed(2)}%
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Status:</span>
                            <span className={clsx(
                              'inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium',
                              isProfit 
                                ? 'bg-emerald-100 text-emerald-700' 
                                : 'bg-rose-100 text-rose-700'
                            )}>
                              {isProfit ? 'Profitable' : 'Loss'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};