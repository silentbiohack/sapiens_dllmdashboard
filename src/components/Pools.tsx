import React, { useState, useMemo } from 'react';
import { Search, Filter, TrendingUp, TrendingDown, ArrowUpDown } from 'lucide-react';
import { mockPools, formatCurrency, formatPercentage } from '../data/mockPools';
import type { Pool } from '../data/mockPools';
import { useNavigation } from '../contexts/NavigationContext';

type SortField = 'name' | 'tvl' | 'apr' | 'volume24h' | 'liquidityProviders';
type SortDirection = 'asc' | 'desc';

interface Filters {
  search: string;
  minTvl: string;
  maxTvl: string;
  minApr: string;
  maxApr: string;
  minVolume: string;
  maxVolume: string;
}

const Pools: React.FC = () => {
  const { setCurrentPage } = useNavigation();
  const [sortField, setSortField] = useState<SortField>('tvl');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    search: '',
    minTvl: '',
    maxTvl: '',
    minApr: '',
    maxApr: '',
    minVolume: '',
    maxVolume: '',
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const handlePoolClick = (poolId: string) => {
    setCurrentPage(`pools/${poolId}`);
  };

  const filteredAndSortedPools = useMemo(() => {
    let filtered = mockPools.filter(pool => {
      const matchesSearch = pool.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                           pool.tokenA.toLowerCase().includes(filters.search.toLowerCase()) ||
                           pool.tokenB.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesTvl = (!filters.minTvl || filters.minTvl === '' || pool.tvl >= parseFloat(filters.minTvl) * 1000000) &&
                        (!filters.maxTvl || filters.maxTvl === '' || pool.tvl <= parseFloat(filters.maxTvl) * 1000000);
      
      const matchesApr = (!filters.minApr || filters.minApr === '' || pool.apr >= parseFloat(filters.minApr)) &&
                        (!filters.maxApr || filters.maxApr === '' || pool.apr <= parseFloat(filters.maxApr));
      
      const matchesVolume = (!filters.minVolume || filters.minVolume === '' || pool.volume24h >= parseFloat(filters.minVolume) * 1000000) &&
                           (!filters.maxVolume || filters.maxVolume === '' || pool.volume24h <= parseFloat(filters.maxVolume) * 1000000);

      return matchesSearch && matchesTvl && matchesApr && matchesVolume;
    });

    filtered.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      return sortDirection === 'asc' 
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    });

    return filtered;
  }, [mockPools, filters, sortField, sortDirection]);

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown className="w-4 h-4 text-gray-400" />;
    return sortDirection === 'asc' 
      ? <TrendingUp className="w-4 h-4 text-blue-500" />
      : <TrendingDown className="w-4 h-4 text-blue-500" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Pools</h1>
          <p className="text-lg text-gray-600">
            Explore all available DLMM liquidity pools and their performance.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search pools (e.g., SOL/USDC, ETH, BTC...)"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-colors ${
                showFilters 
                  ? 'bg-blue-50 border-blue-200 text-blue-700' 
                  : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">TVL Range</label>
                <div className="flex gap-1">
                  <input
                    type="number"
                    placeholder="1"
                    className="flex-1 px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                    value={filters.minTvl}
                    onChange={(e) => setFilters({ ...filters, minTvl: e.target.value })}
                  />
                  <input
                    type="number"
                    placeholder="Max TVL"
                    className="flex-1 px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                    value={filters.maxTvl}
                    onChange={(e) => setFilters({ ...filters, maxTvl: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">APR Range (%)</label>
                <div className="flex gap-1">
                  <input
                    type="number"
                    placeholder="1"
                    className="flex-1 px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                    value={filters.minApr}
                    onChange={(e) => setFilters({ ...filters, minApr: e.target.value })}
                  />
                  <input
                    type="number"
                    placeholder="Max APR"
                    className="flex-1 px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                    value={filters.maxApr}
                    onChange={(e) => setFilters({ ...filters, maxApr: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">24h Volume Range</label>
                <div className="flex gap-1">
                  <input
                    type="number"
                    placeholder="1"
                    className="flex-1 px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                    value={filters.minVolume}
                    onChange={(e) => setFilters({ ...filters, minVolume: e.target.value })}
                  />
                  <input
                    type="number"
                    placeholder="Max Volume"
                    className="flex-1 px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent"
                    value={filters.maxVolume}
                    onChange={(e) => setFilters({ ...filters, maxVolume: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing {filteredAndSortedPools.length} of {mockPools.length} pools
          </p>
        </div>

        {/* Pools Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th 
                    className="px-6 py-4 text-left text-sm font-medium text-gray-900 cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center gap-2">
                      Pool
                      <SortIcon field="name" />
                    </div>
                  </th>
                  <th 
                    className="px-6 py-4 text-right text-sm font-medium text-gray-900 cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('tvl')}
                  >
                    <div className="flex items-center justify-end gap-2">
                      TVL
                      <SortIcon field="tvl" />
                    </div>
                  </th>
                  <th 
                    className="px-6 py-4 text-right text-sm font-medium text-gray-900 cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('apr')}
                  >
                    <div className="flex items-center justify-end gap-2">
                      APR
                      <SortIcon field="apr" />
                    </div>
                  </th>
                  <th 
                    className="px-6 py-4 text-right text-sm font-medium text-gray-900 cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('volume24h')}
                  >
                    <div className="flex items-center justify-end gap-2">
                      24h Volume
                      <SortIcon field="volume24h" />
                    </div>
                  </th>
                  <th 
                    className="px-6 py-4 text-right text-sm font-medium text-gray-900 cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => handleSort('liquidityProviders')}
                  >
                    <div className="flex items-center justify-end gap-2">
                      LPs
                      <SortIcon field="liquidityProviders" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-medium text-gray-900">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAndSortedPools.map((pool) => (
                  <tr 
                    key={pool.id} 
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => handlePoolClick(pool.id)}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex -space-x-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {pool.tokenA.charAt(0)}
                          </div>
                          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                            {pool.tokenB.charAt(0)}
                          </div>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{pool.name}</div>
                          <div className="text-sm text-gray-500">{pool.tokenA} • {pool.tokenB}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="font-semibold text-gray-900">{formatCurrency(pool.tvl)}</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="font-semibold text-green-600">{formatPercentage(pool.apr)}</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="font-semibold text-gray-900">{formatCurrency(pool.volume24h)}</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="font-semibold text-gray-900">{pool.liquidityProviders.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button 
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePoolClick(pool.id);
                        }}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredAndSortedPools.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-2">No pools found</div>
              <div className="text-gray-400">Try adjusting your search or filter criteria</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pools;