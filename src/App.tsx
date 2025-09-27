import React from 'react';
import { motion } from 'framer-motion';
import { WalletProvider } from './contexts/WalletContext';
import { NavigationProvider, useNavigation } from './contexts/NavigationContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { PortfolioOverview } from './components/PortfolioOverview';
import { PortfolioChart } from './components/PortfolioChart';
import { LiquidityDistribution } from './components/LiquidityDistribution';
import { PositionsList } from './components/PositionsList';
import { PoolAnalytics } from './components/PoolAnalytics';
import { HorizontalMetrics } from './components/HorizontalMetrics';
import { PriceRange } from './components/PriceRange';
import { Documentation } from './components/Documentation';
import Pools from './components/Pools';
import PoolDetail from './components/PoolDetail';

// Animation variants for smooth card appearances
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5
    }
  }
};

const DashboardContent: React.FC = () => {
  return (
    <motion.main 
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Horizontal Metrics */}
      <motion.section className="w-full" variants={cardVariants}>
        <HorizontalMetrics />
      </motion.section>

      {/* Price Range */}
      <motion.section className="w-full" variants={cardVariants}>
        <PriceRange />
      </motion.section>

      {/* Portfolio Overview */}
      <motion.section className="w-full" variants={cardVariants}>
        <PortfolioOverview />
      </motion.section>
      
      {/* Charts Section */}
      <motion.section 
        className="grid grid-cols-1 xl:grid-cols-2 gap-6"
        variants={cardVariants}
      >
        <motion.div 
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
        >
          <PortfolioChart />
        </motion.div>
        <motion.div 
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
        >
          <LiquidityDistribution />
        </motion.div>
      </motion.section>
      
      {/* Positions and Analytics */}
      <motion.section 
        className="grid grid-cols-1 xl:grid-cols-3 gap-6"
        variants={cardVariants}
      >
        <motion.div 
          className="xl:col-span-2"
          whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
        >
          <PositionsList />
        </motion.div>
        <motion.div 
          className="xl:col-span-1"
          whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
        >
          <PoolAnalytics />
        </motion.div>
      </motion.section>
    </motion.main>
  );
};

const AppContent: React.FC = () => {
  const { currentPage } = useNavigation();

  const renderContent = () => {
    if (currentPage === 'dashboard') {
      return <DashboardContent />;
    } else if (currentPage === 'docs') {
      return <Documentation />;
    } else if (currentPage === 'pools') {
      return <Pools />;
    } else if (currentPage.startsWith('pools/')) {
      const poolId = currentPage.split('/')[1];
      return <PoolDetail poolId={poolId} />;
    } else {
      return <DashboardContent />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <Navbar />
      {currentPage === 'dashboard' && <Header />}
      
      {renderContent()}
      
      <Footer />
    </div>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <WalletProvider>
        <NavigationProvider>
          <AppContent />
        </NavigationProvider>
      </WalletProvider>
    </ErrorBoundary>
  );
}

export default App;
