import React, { useState } from 'react';
import { ArrowLeft, Plus, TrendingUp, Users, DollarSign, BarChart3, Copy, ExternalLink } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { getPoolById, formatCurrency, formatPercentage } from '../data/mockPools';
import { useNavigation } from '../contexts/NavigationContext';
import { PoolPriceRange } from './PoolPriceRange';

interface PoolDetailProps {
  poolId: string;
}

const PoolDetail: React.FC<PoolDetailProps> = ({ poolId }) => {
  const { setCurrentPage } = useNavigation();
  const [showAddLiquidity, setShowAddLiquidity] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'liquidity'>('overview');
  
  const pool = getPoolById(poolId);

  if (!pool) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Pool Not Found</h2>
          <p className="text-gray-600 mb-4">The requested pool could not be found.</p>
          <button
            onClick={() => setCurrentPage('pools')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Pools
          </button>
        </div>
      </div>
    );
  }

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`pool_${pool.id}_address_demo`);
  };

  const liquidityDistributionData = pool.bins.map((bin, index) => ({
    price: bin.price.toFixed(4),
    liquidity: bin.liquidity,
    utilization: bin.utilization,
    index,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setCurrentPage('pools')}
            className="p-2 hover:bg-white rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-2">
              <div className="flex -space-x-2">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-lg font-bold">
                  {pool.tokenA.charAt(0)}
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white text-lg font-bold">
                  {pool.tokenB.charAt(0)}
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{pool.name}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>Pool Address: pool_{pool.id}_address_demo</span>
                  <button
                    onClick={handleCopyAddress}
                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowAddLiquidity(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            Add Liquidity
          </button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Total Value Locked</div>
                <div className="text-2xl font-bold text-gray-900">{formatCurrency(pool.tvl)}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">APR</div>
                <div className="text-2xl font-bold text-green-600">{formatPercentage(pool.apr)}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">24h Volume</div>
                <div className="text-2xl font-bold text-gray-900">{formatCurrency(pool.volume24h)}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Liquidity Providers</div>
                <div className="text-2xl font-bold text-gray-900">{pool.liquidityProviders.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'analytics', label: 'Analytics' },
                { id: 'liquidity', label: 'Liquidity Distribution' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Price Range */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Range</h3>
                  <PoolPriceRange
                    minPrice={pool.priceRange.min}
                    currentPrice={pool.priceRange.current}
                    maxPrice={pool.priceRange.max}
                  />
                </div>

                {/* Recent Activity */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Performance</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-600">24h Fees Collected</div>
                      <div className="text-xl font-bold text-gray-900">{formatCurrency(pool.fees24h)}</div>
                      <div className="text-sm text-green-600">+12.5% from yesterday</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-600">Average APR (7d)</div>
                      <div className="text-xl font-bold text-gray-900">{formatPercentage(pool.apr * 0.95)}</div>
                      <div className="text-sm text-green-600">+2.1% from last week</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-600">Price Impact</div>
                      <div className="text-xl font-bold text-gray-900">0.12%</div>
                      <div className="text-sm text-gray-600">Low slippage</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Historical Performance</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={pool.historicalData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="timestamp" 
                          tickFormatter={(value) => new Date(value).toLocaleDateString()}
                        />
                        <YAxis />
                        <Tooltip 
                          labelFormatter={(value) => new Date(value).toLocaleDateString()}
                          formatter={(value: any, name: string) => {
                            if (name === 'tvl' || name === 'volume') return [formatCurrency(value), name.toUpperCase()];
                            if (name === 'apr') return [formatPercentage(value), 'APR'];
                            return [formatCurrency(value), name];
                          }}
                        />
                        <Line type="monotone" dataKey="tvl" stroke="#3B82F6" strokeWidth={2} name="tvl" />
                        <Line type="monotone" dataKey="volume" stroke="#10B981" strokeWidth={2} name="volume" />
                        <Line type="monotone" dataKey="apr" stroke="#F59E0B" strokeWidth={2} name="apr" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'liquidity' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Liquidity Distribution by Price Bins</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={liquidityDistributionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="price" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value: any, name: string) => {
                            if (name === 'liquidity') return [formatCurrency(value), 'Liquidity'];
                            if (name === 'utilization') return [`${value.toFixed(1)}%`, 'Utilization'];
                            return [value, name];
                          }}
                        />
                        <Bar dataKey="liquidity" fill="#3B82F6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Active Price Range</h4>
                    <div className="text-sm text-gray-600">
                      Current liquidity is concentrated between {pool.priceRange.min.toFixed(4)} and {pool.priceRange.max.toFixed(4)}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Utilization Rate</h4>
                    <div className="text-sm text-gray-600">
                      Average bin utilization: {(pool.bins.reduce((acc, bin) => acc + bin.utilization, 0) / pool.bins.length).toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Add Liquidity Modal */}
        {showAddLiquidity && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Add Liquidity</h3>
                  <button
                    onClick={() => setShowAddLiquidity(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {pool.tokenA} Amount
                    </label>
                    <input
                      type="number"
                      placeholder="0.00"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {pool.tokenB} Amount
                    </label>
                    <input
                      type="number"
                      placeholder="0.00"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Strategy
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Balanced (Recommended)</option>
                      <option>Conservative</option>
                      <option>Aggressive</option>
                      <option>Custom Range</option>
                    </select>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-sm text-blue-800">
                      <div className="font-medium mb-1">Estimated Returns</div>
                      <div>APR: {formatPercentage(pool.apr)}</div>
                      <div>Daily Fees: ~{formatCurrency(pool.fees24h / pool.liquidityProviders)}</div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowAddLiquidity(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        setShowAddLiquidity(false);
                        // Demo action - would integrate with wallet
                        alert('Demo: Liquidity addition would be processed here');
                      }}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Add Liquidity
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PoolDetail;