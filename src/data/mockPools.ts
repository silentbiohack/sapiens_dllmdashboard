export interface Pool {
  id: string;
  name: string;
  tokenA: string;
  tokenB: string;
  tvl: number;
  apr: number;
  volume24h: number;
  liquidityProviders: number;
  fees24h: number;
  priceRange: {
    min: number;
    current: number;
    max: number;
  };
  bins: Array<{
    price: number;
    liquidity: number;
    utilization: number;
  }>;
  historicalData: Array<{
    timestamp: number;
    tvl: number;
    volume: number;
    fees: number;
    apr: number;
  }>;
}

export const mockPools: Pool[] = [
  {
    id: 'sol-usdc',
    name: 'SOL/USDC',
    tokenA: 'SOL',
    tokenB: 'USDC',
    tvl: 12500000,
    apr: 31.69,
    volume24h: 2850000,
    liquidityProviders: 1247,
    fees24h: 8550,
    priceRange: {
      min: 85.50,
      current: 98.75,
      max: 125.30,
    },
    bins: Array.from({ length: 20 }, (_, i) => ({
      price: 85.50 + (i * 2),
      liquidity: Math.random() * 500000 + 100000,
      utilization: Math.random() * 100,
    })),
    historicalData: Array.from({ length: 30 }, (_, i) => ({
      timestamp: Date.now() - (29 - i) * 24 * 60 * 60 * 1000,
      tvl: 12000000 + Math.random() * 1000000,
      volume: 2000000 + Math.random() * 1500000,
      fees: 6000 + Math.random() * 5000,
      apr: 25 + Math.random() * 15,
    })),
  },
  {
    id: 'eth-usdc',
    name: 'ETH/USDC',
    tokenA: 'ETH',
    tokenB: 'USDC',
    tvl: 8750000,
    apr: 28.45,
    volume24h: 1950000,
    liquidityProviders: 892,
    fees24h: 5850,
    priceRange: {
      min: 2850.00,
      current: 3125.50,
      max: 3650.00,
    },
    bins: Array.from({ length: 20 }, (_, i) => ({
      price: 2850 + (i * 40),
      liquidity: Math.random() * 400000 + 80000,
      utilization: Math.random() * 100,
    })),
    historicalData: Array.from({ length: 30 }, (_, i) => ({
      timestamp: Date.now() - (29 - i) * 24 * 60 * 60 * 1000,
      tvl: 8000000 + Math.random() * 1500000,
      volume: 1500000 + Math.random() * 1000000,
      fees: 4000 + Math.random() * 4000,
      apr: 20 + Math.random() * 20,
    })),
  },
  {
    id: 'btc-usdc',
    name: 'BTC/USDC',
    tokenA: 'BTC',
    tokenB: 'USDC',
    tvl: 15200000,
    apr: 24.12,
    volume24h: 3200000,
    liquidityProviders: 654,
    fees24h: 9600,
    priceRange: {
      min: 42000.00,
      current: 45750.00,
      max: 52000.00,
    },
    bins: Array.from({ length: 20 }, (_, i) => ({
      price: 42000 + (i * 500),
      liquidity: Math.random() * 600000 + 150000,
      utilization: Math.random() * 100,
    })),
    historicalData: Array.from({ length: 30 }, (_, i) => ({
      timestamp: Date.now() - (29 - i) * 24 * 60 * 60 * 1000,
      tvl: 14000000 + Math.random() * 2000000,
      volume: 2500000 + Math.random() * 1500000,
      fees: 7000 + Math.random() * 5000,
      apr: 18 + Math.random() * 15,
    })),
  },
  {
    id: 'usdt-usdc',
    name: 'USDT/USDC',
    tokenA: 'USDT',
    tokenB: 'USDC',
    tvl: 22100000,
    apr: 12.85,
    volume24h: 8500000,
    liquidityProviders: 2156,
    fees24h: 25500,
    priceRange: {
      min: 0.9985,
      current: 1.0002,
      max: 1.0025,
    },
    bins: Array.from({ length: 20 }, (_, i) => ({
      price: 0.9985 + (i * 0.0002),
      liquidity: Math.random() * 1000000 + 500000,
      utilization: Math.random() * 100,
    })),
    historicalData: Array.from({ length: 30 }, (_, i) => ({
      timestamp: Date.now() - (29 - i) * 24 * 60 * 60 * 1000,
      tvl: 20000000 + Math.random() * 4000000,
      volume: 7000000 + Math.random() * 3000000,
      fees: 20000 + Math.random() * 10000,
      apr: 8 + Math.random() * 10,
    })),
  },
  {
    id: 'ray-sol',
    name: 'RAY/SOL',
    tokenA: 'RAY',
    tokenB: 'SOL',
    tvl: 4250000,
    apr: 45.67,
    volume24h: 850000,
    liquidityProviders: 423,
    fees24h: 2550,
    priceRange: {
      min: 0.0185,
      current: 0.0205,
      max: 0.0245,
    },
    bins: Array.from({ length: 20 }, (_, i) => ({
      price: 0.0185 + (i * 0.0003),
      liquidity: Math.random() * 200000 + 50000,
      utilization: Math.random() * 100,
    })),
    historicalData: Array.from({ length: 30 }, (_, i) => ({
      timestamp: Date.now() - (29 - i) * 24 * 60 * 60 * 1000,
      tvl: 3500000 + Math.random() * 1500000,
      volume: 600000 + Math.random() * 500000,
      fees: 1500 + Math.random() * 2000,
      apr: 35 + Math.random() * 25,
    })),
  },
  {
    id: 'orca-usdc',
    name: 'ORCA/USDC',
    tokenA: 'ORCA',
    tokenB: 'USDC',
    tvl: 3100000,
    apr: 38.92,
    volume24h: 620000,
    liquidityProviders: 287,
    fees24h: 1860,
    priceRange: {
      min: 2.15,
      current: 2.48,
      max: 3.05,
    },
    bins: Array.from({ length: 20 }, (_, i) => ({
      price: 2.15 + (i * 0.045),
      liquidity: Math.random() * 150000 + 30000,
      utilization: Math.random() * 100,
    })),
    historicalData: Array.from({ length: 30 }, (_, i) => ({
      timestamp: Date.now() - (29 - i) * 24 * 60 * 60 * 1000,
      tvl: 2500000 + Math.random() * 1200000,
      volume: 400000 + Math.random() * 400000,
      fees: 1000 + Math.random() * 1500,
      apr: 30 + Math.random() * 20,
    })),
  },
  {
    id: 'mngo-usdc',
    name: 'MNGO/USDC',
    tokenA: 'MNGO',
    tokenB: 'USDC',
    tvl: 1850000,
    apr: 52.34,
    volume24h: 380000,
    liquidityProviders: 156,
    fees24h: 1140,
    priceRange: {
      min: 0.0085,
      current: 0.0098,
      max: 0.0125,
    },
    bins: Array.from({ length: 20 }, (_, i) => ({
      price: 0.0085 + (i * 0.0002),
      liquidity: Math.random() * 100000 + 20000,
      utilization: Math.random() * 100,
    })),
    historicalData: Array.from({ length: 30 }, (_, i) => ({
      timestamp: Date.now() - (29 - i) * 24 * 60 * 60 * 1000,
      tvl: 1500000 + Math.random() * 700000,
      volume: 250000 + Math.random() * 300000,
      fees: 700 + Math.random() * 800,
      apr: 40 + Math.random() * 25,
    })),
  },
  {
    id: 'step-usdc',
    name: 'STEP/USDC',
    tokenA: 'STEP',
    tokenB: 'USDC',
    tvl: 950000,
    apr: 67.89,
    volume24h: 185000,
    liquidityProviders: 89,
    fees24h: 555,
    priceRange: {
      min: 0.0125,
      current: 0.0142,
      max: 0.0185,
    },
    bins: Array.from({ length: 20 }, (_, i) => ({
      price: 0.0125 + (i * 0.0003),
      liquidity: Math.random() * 50000 + 10000,
      utilization: Math.random() * 100,
    })),
    historicalData: Array.from({ length: 30 }, (_, i) => ({
      timestamp: Date.now() - (29 - i) * 24 * 60 * 60 * 1000,
      tvl: 700000 + Math.random() * 500000,
      volume: 120000 + Math.random() * 150000,
      fees: 300 + Math.random() * 500,
      apr: 50 + Math.random() * 35,
    })),
  },
];

export const getPoolById = (id: string): Pool | undefined => {
  return mockPools.find(pool => pool.id === id);
};

export const formatCurrency = (value: number): string => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(2)}M`;
  } else if (value >= 1000) {
    return `$${(value / 1000).toFixed(1)}K`;
  } else {
    return `$${value.toFixed(2)}`;
  }
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(2)}%`;
};