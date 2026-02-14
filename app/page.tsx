
"use client";
import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

export default function Home() {
  const [prices, setPrices] = React.useState({
    bitcoin: { usd: 68420, usd_24h_change: 2.4 }, // Initial fallback values matching user request
    ethereum: { usd: 3892, usd_24h_change: 1.8 },
    solana: { usd: 148, usd_24h_change: -0.5 }
  });

  React.useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true');
        if (res.ok) {
          const data = await res.json();
          setPrices(data);
        }
      } catch (error) {
        console.error('Failed to fetch prices', error);
      }
    };
    fetchPrices();
    const interval = setInterval(fetchPrices, 30000); // 30s refresh
    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(val);
  };

  const formatChange = (val: number) => {
    if (val === undefined) return '0.00%';
    return `${val >= 0 ? '+' : ''}${val.toFixed(2)}%`;
  };
  return (
    <>
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64 relative min-h-screen">
        <Header />

        <main className="flex-1 p-8 overflow-y-auto pt-28">
          <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">

            {/* Hero Section */}
            <div className="col-span-12 lg:col-span-8 relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition duration-500"></div>
              <div className="relative h-full glass rounded-3xl p-10 overflow-hidden flex flex-col justify-center">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                {/* 3D Coin Placeholder (CSS Sphere) */}
                <div className="absolute right-[-50px] top-[20px] w-64 h-64 md:w-96 md:h-96 animate-float opacity-80 pointer-events-none">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-yellow-300 via-yellow-500 to-orange-600 shadow-[inset_-20px_-20px_50px_rgba(0,0,0,0.5),0_0_50px_rgba(234,179,8,0.3)] relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/assets/river-logo-white.svg')] bg-cover opacity-20 mix-blend-overlay rotate-12 scale-150"></div>
                    <div className="absolute top-10 left-10 w-20 h-20 bg-white/30 rounded-full blur-xl"></div>
                  </div>
                </div>

                <div className="relative z-10 max-w-xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-blue-300 mb-6 backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                    River Protocol v2 Live
                  </div>

                  <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6 text-white leading-[1.1]">
                    Liquid Staking <br />
                    <span className="font-semibold text-white/50">Reimagined.</span>
                  </h1>

                  <p className="text-white/60 text-lg font-light leading-relaxed mb-10 max-w-md">
                    Unlock the full potential of your Bitcoin. Stake, earn rewards, and maintain liquidity seamlessly on the most secure protocol.
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <button className="px-8 py-3.5 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)] flex items-center gap-2 group/btn">
                      Start Staking
                      <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                    </button>
                    <button className="px-8 py-3.5 glass glass-hover text-white rounded-full font-medium backdrop-blur-md">
                      View Documentation
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side Stats */}
            <div className="col-span-12 lg:col-span-4 space-y-6 flex flex-col">
              <div className="glass glass-hover rounded-3xl p-6 relative overflow-hidden flex-1 min-h-[180px] flex flex-col justify-center">
                <div className="absolute top-0 right-0 p-6 opacity-20">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-white"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                </div>
                <div className="text-xs text-white/40 uppercase tracking-widest font-semibold mb-3">Total Value Locked</div>
                <div className="text-4xl lg:text-5xl font-mono text-white tracking-tighter tabular-nums">$1.29B</div>
                <div className="mt-4 flex items-center gap-2 text-green-400 text-sm bg-green-500/10 self-start px-2 py-1 rounded">
                  <span>+12.4%</span>
                  <span className="text-white/20">|</span>
                  <span className="text-white/40">24h</span>
                </div>
              </div>

              <div className="glass glass-hover rounded-3xl p-6 relative overflow-hidden flex-1 min-h-[180px] flex flex-col justify-center">
                <div className="text-xs text-white/40 uppercase tracking-widest font-semibold mb-3">My Rewards</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl lg:text-5xl font-mono text-[#F0B90B] tracking-tighter tabular-nums">0.0000</span>
                  <span className="text-lg text-white/40">BTC</span>
                </div>
                <div className="mt-4 text-sm text-white/40">
                  ≈ $0.00 USD
                </div>
              </div>
            </div>

            {/* Dashboard Grid */}
            <div className="col-span-12 mt-4">
              <div className="flex justify-between items-end mb-6">
                <h3 className="text-2xl font-light text-white/90">Market Overview</h3>
                <button className="text-sm text-white/40 hover:text-white transition">View All Markets</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: 'Bitcoin', symbol: 'BTC', price: prices?.bitcoin?.usd || 0, change: prices?.bitcoin?.usd_24h_change || 0, icon: '₿', color: 'text-orange-500' },
                  { name: 'Ethereum', symbol: 'ETH', price: prices?.ethereum?.usd || 0, change: prices?.ethereum?.usd_24h_change || 0, icon: 'Ξ', color: 'text-blue-500' },
                  { name: 'Solana', symbol: 'SOL', price: prices?.solana?.usd || 0, change: prices?.solana?.usd_24h_change || 0, icon: '◎', color: 'text-purple-500' }
                ].map((asset, i) => (
                  <div key={i} className="glass glass-hover rounded-2xl p-6 flex flex-col justify-between group h-40">
                    <div className="flex justify-between items-start">
                      <div className={`w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-2xl ${asset.color}`}>
                        {asset.icon}
                      </div>
                      <span className={`text-xs font-mono px-2 py-1 rounded ${asset.change >= 0 ? 'text-green-400 bg-green-500/10' : 'text-red-400 bg-red-500/10'}`}>
                        {formatChange(asset.change)}
                      </span>
                    </div>
                    <div>
                      <div className="text-xl font-medium mb-1 group-hover:text-white transition text-white/80">{asset.name}</div>
                      <div className="flex justify-between items-end">
                        <span className="text-white/40 text-sm">{asset.symbol}</span>
                        <span className="text-white font-mono">{formatCurrency(asset.price)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </main>
      </div>
    </>
  );
}
