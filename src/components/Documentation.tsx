import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Zap, 
  BarChart3, 
  Wallet, 
  TrendingUp, 
  Shield, 
  HelpCircle,
  ArrowRight,
  ExternalLink,
  Copy,
  CheckCircle,
  Code,
  AlertTriangle,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

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

interface DocSectionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  items: string[];
  color: string;
  id: string;
}

const DocSection: React.FC<DocSectionProps> = ({ icon, title, description, items, color, id }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      id={id}
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
      variants={cardVariants}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-3 rounded-xl ${color}`}>
          {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="ml-auto p-1 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </button>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      {isExpanded && (
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <ArrowRight className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
};

const CodeBlock: React.FC<{ code: string; language: string }> = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative bg-gray-900 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-400 uppercase">{language}</span>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors"
        >
          {copied ? <CheckCircle className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="text-sm text-gray-300 overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export const Documentation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('getting-started');

  const sections = [
    {
      id: "getting-started",
      icon: <Zap className="w-6 h-6 text-blue-600" />,
      title: "Getting Started",
      description: "Quick start guide for new users to begin using DLMM Dashboard",
      color: "bg-blue-100",
      items: [
        "Connect your Solana wallet (Phantom, Solflare, or other supported wallets)",
        "Wait for your position data to load automatically",
        "Explore the key metrics displayed in the top dashboard section",
        "Use the Price Range component to analyze your positions",
        "Monitor your portfolio performance in real-time",
        "Navigate between different sections using the sidebar menu"
      ]
    },
    {
      id: "metrics",
      icon: <BarChart3 className="w-6 h-6 text-green-600" />,
      title: "Metrics & Analytics",
      description: "Understanding key performance indicators and analytics",
      color: "bg-green-100",
      items: [
        "24h Trading Volume - Total trading volume in the last 24 hours across your positions",
        "24h Fees Collected - Fees earned from trading activity in your liquidity pools",
        "APR (Annual Percentage Rate) - Annualized return rate based on current performance",
        "TVL (Total Value Locked) - Total value of assets locked in your liquidity positions",
        "Price Range Analysis - Current price ranges for optimal liquidity provision",
        "P&L Tracking - Real-time profit and loss calculations for each position"
      ]
    },
    {
      id: "positions",
      icon: <TrendingUp className="w-6 h-6 text-purple-600" />,
      title: "Position Management",
      description: "Effective liquidity management in DLMM pools",
      color: "bg-purple-100",
      items: [
        "Track all active liquidity provider positions in one dashboard",
        "Analyze profit and loss (P&L) for each individual position",
        "Copy pool addresses for external analysis and verification",
        "View positions directly on Solscan blockchain explorer",
        "Monitor liquidity distribution across different price ranges",
        "Receive alerts for positions requiring attention or rebalancing"
      ]
    },
    {
      id: "wallet",
      icon: <Wallet className="w-6 h-6 text-orange-600" />,
      title: "Wallet Connection",
      description: "Secure wallet connection and management",
      color: "bg-orange-100",
      items: [
        "Support for all popular Solana wallets (Phantom, Solflare, Backpack, etc.)",
        "Automatic network detection (mainnet/devnet/testnet)",
        "Secure session data storage with automatic cleanup",
        "Auto-reconnection on page refresh for seamless experience",
        "Display wallet balance and address information",
        "One-click disconnect for enhanced security"
      ]
    },
    {
      id: "security",
      icon: <Shield className="w-6 h-6 text-red-600" />,
      title: "Security Best Practices",
      description: "Security measures and recommended practices",
      color: "bg-red-100",
      items: [
        "Never enter your seed phrase on third-party websites",
        "Always verify the URL before connecting your wallet",
        "Use only official wallet extensions from verified sources",
        "Regularly review active wallet connections and permissions",
        "Disconnect your wallet after each session for maximum security",
        "Enable wallet transaction confirmations for all operations"
      ]
    },
    {
      id: "api-reference",
      icon: <Code className="w-6 h-6 text-indigo-600" />,
      title: "API Reference",
      description: "Technical documentation for developers and advanced users",
      color: "bg-indigo-100",
      items: [
        "DLMM Pool Data API - Fetch real-time pool information and statistics",
        "Position Tracking API - Retrieve user position data and performance metrics",
        "Price Feed Integration - Access to real-time price data and historical charts",
        "Transaction History API - Query transaction history and fee collection data",
        "WebSocket Connections - Real-time updates for live data streaming",
        "Rate Limiting and Authentication - API usage guidelines and best practices"
      ]
    }
  ];

  const codeExamples = {
    connection: `// Connect to DLMM Dashboard
import { useWallet } from '@solana/wallet-adapter-react';

const { connect, connected, publicKey } = useWallet();

// Connect wallet
await connect();

// Check connection status
if (connected && publicKey) {
  console.log('Connected to:', publicKey.toString());
}`,
    
    fetchPositions: `// Fetch user positions
const fetchUserPositions = async (walletAddress: string) => {
  const response = await fetch(\`/api/positions/\${walletAddress}\`);
  const positions = await response.json();
  
  return positions.map(position => ({
    poolAddress: position.pool,
    tvl: position.totalValueLocked,
    apr: position.annualPercentageRate,
    fees24h: position.fees24h
  }));
};`,

    priceRange: `// Calculate optimal price range
const calculatePriceRange = (currentPrice: number, volatility: number) => {
  const range = currentPrice * (volatility / 100);
  
  return {
    lowerBound: currentPrice - range,
    upperBound: currentPrice + range,
    optimalRange: range * 2
  };
};`
  };

  const troubleshootingItems = [
    {
      issue: "Wallet not connecting",
      solution: "Ensure your wallet extension is installed and unlocked. Try refreshing the page and reconnecting."
    },
    {
      issue: "Positions not loading",
      solution: "Check your internet connection and ensure your wallet has active DLMM positions. Data may take a few seconds to load."
    },
    {
      issue: "Incorrect APR calculations",
      solution: "APR is calculated based on the last 24 hours of activity. Low activity periods may show inaccurate projections."
    },
    {
      issue: "Missing transaction history",
      solution: "Transaction history is fetched from the blockchain. Network congestion may cause delays in data availability."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div className="text-center mb-12" variants={cardVariants}>
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-900">Documentation</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete guide to using the DLMM Portfolio Dashboard. 
            Learn all platform features for effective liquidity management and maximize your DeFi returns.
          </p>
        </motion.div>

        {/* Navigation */}
        <motion.div 
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-12"
          variants={cardVariants}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Zap className="w-6 h-6 text-yellow-500" />
            Quick Navigation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sections.map((section) => (
              <a 
                key={section.id}
                href={`#${section.id}`} 
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 p-3 rounded-lg transition-colors duration-200 ${
                  activeSection === section.id 
                    ? 'bg-indigo-100 text-indigo-800' 
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                }`}
              >
                {section.icon}
                <span className="font-medium">{section.title}</span>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Documentation Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {sections.map((section, index) => (
            <DocSection
              key={index}
              id={section.id}
              icon={section.icon}
              title={section.title}
              description={section.description}
              items={section.items}
              color={section.color}
            />
          ))}
        </div>

        {/* Code Examples Section */}
        <motion.div 
          className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-12"
          variants={cardVariants}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Code className="w-6 h-6 text-green-600" />
            Code Examples
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Wallet Connection</h3>
              <CodeBlock code={codeExamples.connection} language="typescript" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Fetching User Positions</h3>
              <CodeBlock code={codeExamples.fetchPositions} language="typescript" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Price Range Calculation</h3>
              <CodeBlock code={codeExamples.priceRange} language="typescript" />
            </div>
          </div>
        </motion.div>

        {/* Troubleshooting Section */}
        <motion.div 
          className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-12"
          variants={cardVariants}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-orange-600" />
            Troubleshooting
          </h2>
          <div className="space-y-6">
            {troubleshootingItems.map((item, index) => (
              <div key={index} className="border-l-4 border-orange-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.issue}
                </h3>
                <p className="text-gray-600">
                  {item.solution}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div 
          className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-12"
          variants={cardVariants}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-indigo-600" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What is DLMM and how does it work?
              </h3>
              <p className="text-gray-600">
                DLMM (Dynamic Liquidity Market Maker) is an automated market maker protocol that allows users 
                to provide liquidity within specific price ranges and earn fees from trading activity. 
                It offers more capital efficiency compared to traditional AMMs.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How is APR calculated?
              </h3>
              <p className="text-gray-600">
                APR is calculated based on fees earned in the last 24 hours, extrapolated to an annual rate 
                considering the current position value. It provides an estimate of potential yearly returns.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is it safe to connect my wallet?
              </h3>
              <p className="text-gray-600">
                Yes, we use standard Solana Wallet Adapter libraries and never store private keys. 
                Connections are made through official wallet extensions with read-only permissions for portfolio data.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What wallets are supported?
              </h3>
              <p className="text-gray-600">
                We support all major Solana wallets including Phantom, Solflare, Backpack, Glow, 
                and any wallet compatible with the Solana Wallet Adapter standard.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div 
          className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white text-center"
          variants={cardVariants}
        >
          <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
          <p className="text-indigo-100 mb-6">
            If you have any questions or need assistance, reach out to our support team
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200">
              <ExternalLink className="w-4 h-4" />
              Telegram Support
            </button>
            <button className="flex items-center gap-2 bg-indigo-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-400 transition-colors duration-200">
              <Copy className="w-4 h-4" />
              Discord Community
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};