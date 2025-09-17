import { useState, useEffect, useCallback } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { DLMM } from '@saros-finance/dlmm-sdk';

export interface LPPosition {
  poolAddress: string;
  tokenX: string;
  tokenY: string;
  totalValue: number;
  pnl: number;
  pnlPercentage: number;
  liquidityDistribution: Array<{
    binId: number;
    liquidity: number;
    price: number;
  }>;
}

export interface PortfolioData {
  totalValue: number;
  totalPnL: number;
  totalPnLPercentage: number;
  activePositions: number;
  positions: LPPosition[];
  isLoading: boolean;
  error: string | null;
}

export const useDLMM = () => {
  const { connection } = useConnection();
  const { publicKey, connected } = useWallet();
  const [portfolioData, setPortfolioData] = useState<PortfolioData>({
    totalValue: 0,
    totalPnL: 0,
    totalPnLPercentage: 0,
    activePositions: 0,
    positions: [],
    isLoading: false,
    error: null,
  });

  const fetchPositions = useCallback(async () => {
    if (!connected || !publicKey) {
      setPortfolioData(prev => ({
        ...prev,
        positions: [],
        totalValue: 0,
        totalPnL: 0,
        totalPnLPercentage: 0,
        activePositions: 0,
        isLoading: false,
        error: null,
      }));
      return;
    }

    setPortfolioData(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate occasional network errors for demonstration
      if (Math.random() < 0.1) {
        throw new Error('Network error: Failed to fetch positions');
      }
      
      // Mock data for demonstration
      const mockPositions: LPPosition[] = [
        {
          poolAddress: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
          tokenX: 'SOL',
          tokenY: 'USDC',
          totalValue: 1250.75,
          pnl: 125.50,
          pnlPercentage: 11.15,
          liquidityDistribution: [
            { binId: 1, liquidity: 500, price: 95.5 },
            { binId: 2, liquidity: 750, price: 96.0 },
            { binId: 3, liquidity: 400, price: 96.5 },
          ],
        },
        {
          poolAddress: '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM',
          tokenX: 'RAY',
          tokenY: 'USDC',
          totalValue: 850.25,
          pnl: -45.75,
          pnlPercentage: -5.11,
          liquidityDistribution: [
            { binId: 1, liquidity: 300, price: 0.025 },
            { binId: 2, liquidity: 550, price: 0.026 },
          ],
        },
        {
          poolAddress: '58oQChx4yWmvKdwLLZzBi4ChoCc2fqCUWBkwMihLYQo2',
          tokenX: 'ORCA',
          tokenY: 'SOL',
          totalValue: 675.00,
          pnl: 89.25,
          pnlPercentage: 15.24,
          liquidityDistribution: [
            { binId: 1, liquidity: 200, price: 0.15 },
            { binId: 2, liquidity: 475, price: 0.16 },
          ],
        },
      ];

      const totalValue = mockPositions.reduce((sum, pos) => sum + pos.totalValue, 0);
      const totalPnL = mockPositions.reduce((sum, pos) => sum + pos.pnl, 0);
      const totalPnLPercentage = totalValue > 0 ? (totalPnL / (totalValue - totalPnL)) * 100 : 0;

      setPortfolioData({
        totalValue,
        totalPnL,
        totalPnLPercentage,
        activePositions: mockPositions.length,
        positions: mockPositions,
        isLoading: false,
        error: null,
      });

    } catch (error) {
      console.error('Error fetching DLMM positions:', error);
      setPortfolioData(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch portfolio data. Please try again.',
      }));
    }
  }, [connection, publicKey, connected]);

  useEffect(() => {
    fetchPositions();
  }, [fetchPositions]);

  const refreshData = useCallback(() => {
    fetchPositions();
  }, [fetchPositions]);

  return {
    ...portfolioData,
    refreshData,
  };
};