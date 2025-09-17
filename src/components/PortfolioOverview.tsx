import React from 'react';
import { RefreshCw, AlertCircle, DollarSign, TrendingUp, Activity } from 'lucide-react';
import { StatsCard } from './StatsCard';
import { useDLMM } from '../hooks/useDLMM';

export const PortfolioOverview: React.FC = () => {
  const { totalValue, totalPnL, totalPnLPercentage, positions, isLoading, error, refreshData } = useDLMM();

  if (error) {
    return (
      <div className="bg-white rounded-2xl border border-rose-200 p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-rose-100 rounded-xl">
            <AlertCircle className="w-6 h-6 text-rose-600" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Portfolio Overview</h2>
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
            <TrendingUp className="w-8 h-8 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Portfolio Overview</h2>
            <p className="text-sm text-gray-500 italic mt-1">Real-time portfolio performance and metrics</p>
          </div>
        </div>
        <button
          onClick={refreshData}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 disabled:opacity-50 disabled:cursor-not-allowed text-indigo-700 rounded-full transition-all duration-200 border border-indigo-200 hover:border-indigo-300 font-medium"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Total Value"
          value={totalValue}
          format="currency"
          isLoading={isLoading}
          tooltip="Total portfolio value including all positions and cash"
          description="Real-time market value of your entire portfolio"
          icon={DollarSign}
        />
        
        <StatsCard
          title="Total P&L"
          value={totalPnL}
          change={totalPnLPercentage ? `${totalPnLPercentage.toFixed(2)}%` : undefined}
          changeType={totalPnL >= 0 ? 'positive' : 'negative'}
          format="currency"
          isLoading={isLoading}
          tooltip="Profit and Loss since portfolio inception"
          description="Total gains or losses across all positions"
          icon={TrendingUp}
        />
        
        <StatsCard
          title="Active Positions"
          value={positions.length}
          format="number"
          isLoading={isLoading}
          tooltip="Number of currently held positions"
          description="Total count of active trading positions"
          icon={Activity}
        />
      </div>
    </div>
  );
};