# DLMM Portfolio Dashboard

A modern, responsive dashboard for tracking Dynamic Liquidity Market Maker (DLMM) positions on Solana. Built with React, TypeScript, and Tailwind CSS featuring advanced analytics, real-time metrics, and comprehensive portfolio management.

## 🚀 Features

### 📊 Horizontal Metrics Dashboard
- **24h Trading Volume**: Real-time trading volume tracking with visual indicators
- **24h Fees Collected**: Monitor fees earned from liquidity provision
- **APR (Annual Percentage Rate)**: Live calculation of annual returns
- **TVL (Total Value Locked)**: Track total value locked in positions
- **Responsive Grid Layout**: 4-column desktop, 2-column tablet, 1-column mobile

### 📈 Price Range Analytics
- **Interactive Price Range Slider**: Visual representation of current position within min/max range
- **Real-time Price Tracking**: Current price indicator with percentage position
- **Min/Max Price Display**: Clear visualization of price boundaries
- **Position Health Indicator**: Shows how well-positioned your liquidity is

### 💼 Portfolio Overview
- **Real-time Portfolio Tracking**: Monitor total portfolio value, P&L, and active positions
- **Interactive Stats Cards**: Hover effects, tooltips, and detailed information
- **Comprehensive Analytics**: Advanced charts and distribution analysis
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### 🔄 Position Management
- **LP Position Tracking**: View all your liquidity provider positions
- **Detailed Position Info**: Token pairs, pool addresses, values, and P&L
- **Interactive Elements**: Copy addresses, view on Solscan, tooltips for context
- **Real-time Updates**: Refresh data with loading states and error handling

### 🎨 Modern UI/UX
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **Gradient Backgrounds**: Modern visual design with subtle gradients
- **Loading States**: Multiple loading spinner variants (spinner, dots, pulse)
- **Tooltips**: Contextual help and information throughout the interface
- **Responsive Grid**: Mobile-first design with adaptive layouts
- **Color-coded Metrics**: Each metric type has its own color scheme for easy identification

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS v3.4.17
- **Icons**: Lucide React
- **Animations**: Framer Motion v12.23.13
- **Charts**: Recharts v3.2.1
- **Build Tool**: Vite v7.1.2
- **Blockchain**: Solana Web3.js + DLMM SDK
- **Wallet Integration**: Solana Wallet Adapter
- **State Management**: React Hooks + Context API
- **Utilities**: clsx for conditional classes

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dash
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/              # React components
│   ├── ErrorBoundary.tsx      # Error boundary wrapper
│   ├── Footer.tsx             # Application footer
│   ├── Header.tsx             # Application header
│   ├── HorizontalMetrics.tsx  # 4-card metrics dashboard
│   ├── LiquidityDistribution.tsx # Liquidity analysis
│   ├── LoadingSpinner.tsx     # Loading states with variants
│   ├── Navbar.tsx             # Navigation bar
│   ├── PoolAnalytics.tsx      # Pool analytics component
│   ├── PortfolioChart.tsx     # Portfolio performance chart
│   ├── PortfolioOverview.tsx  # Portfolio stats overview
│   ├── PositionsList.tsx      # LP positions list
│   ├── PriceRange.tsx         # Interactive price range slider
│   ├── StatsCard.tsx          # Reusable stats card
│   ├── Tooltip.tsx            # Tooltip component
│   └── WalletButton.tsx       # Wallet connection button
├── contexts/               # React contexts
│   └── WalletContext.tsx      # Wallet state management
├── hooks/                  # Custom React hooks
│   └── useDLMM.ts             # DLMM data fetching hook
├── App.tsx                 # Main application component
├── main.tsx                # Application entry point
└── index.css               # Global styles and Tailwind imports
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient (`from-blue-600 to-indigo-600`)
- **Success**: Green (`text-green-600`)
- **Error**: Red (`text-red-600`)
- **Neutral**: Gray scale (`gray-50` to `gray-900`)

### Components
- **Cards**: Rounded corners (`rounded-xl`), subtle shadows, hover effects
- **Buttons**: Smooth transitions, hover states, disabled states
- **Loading**: Multiple variants with smooth animations
- **Tooltips**: Dark theme with arrow indicators

### Responsive Breakpoints
- **Mobile**: `< 640px`
- **Tablet**: `640px - 1024px` (sm, md)
- **Desktop**: `> 1024px` (lg, xl)

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
# Add your environment variables here
VITE_SOLANA_RPC_URL=your_rpc_url
VITE_API_BASE_URL=your_api_url
```

### Tailwind Configuration
The project uses a custom Tailwind configuration with:
- Custom color palette
- Extended animations
- Responsive utilities
- Custom component classes

## 📱 Responsive Design

The dashboard is built with a mobile-first approach:

- **Mobile (< 640px)**: Single column layout, stacked components
- **Tablet (640px - 1024px)**: Two-column grid for stats, optimized spacing
- **Desktop (> 1024px)**: Three-column grid, full feature set

## 🎯 Key Features Implementation

### Interactive Tooltips
- Hover-activated tooltips with positioning logic
- Portal-based rendering for proper z-index handling
- Customizable content and positioning

### Loading States
- Multiple loading spinner variants
- Skeleton loading for cards
- Smooth transitions between states

### Hover Effects
- Scale transformations on interactive elements
- Color transitions with smooth timing
- Background gradient animations

### Error Handling
- Graceful error states with retry functionality
- User-friendly error messages
- Loading state management during retries

## 🚀 Performance Optimizations

- **Component Memoization**: Prevent unnecessary re-renders
- **Lazy Loading**: Code splitting for better initial load times
- **Optimized Images**: SVG icons for scalability
- **Efficient Animations**: CSS transforms for smooth performance

## 🧪 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style
- TypeScript for type safety
- Functional components with hooks
- Consistent naming conventions
- Modular component architecture

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Solana ecosystem for DLMM protocols
- React and Vite teams for excellent developer experience
- Tailwind CSS for the utility-first CSS framework
- Lucide for beautiful icons

---

Built with ❤️ for the Solana DeFi community
