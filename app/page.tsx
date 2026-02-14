
"use client";
import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

export default function Home() {
  return (
    <>
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64 relative">
        <Header />

        <main className="flex-1 p-8 overflow-y-auto pt-28">
          <div className="max-w-6xl mx-auto grid grid-cols-12 gap-8">

            {/* Hero Section */}
            <div className="col-span-12 lg:col-span-8 bg-gradient-to-br from-white/10 to-transparent border border-white/5 rounded-3xl p-8 relative overflow-hidden group">
              <div className="absolute -right-20 -top-20 w-80 h-80 bg-blue-500/20 blur-[80px] rounded-full group-hover:bg-purple-500/20 transition duration-1000"></div>

              <h1 className="text-5xl font-light tracking-tight mb-4 text-white">
                Liquid Staking <br />
                <span className="font-semibold text-white/40">Reimagined.</span>
              </h1>
              <p className="text-white/60 max-w-lg mb-8 text-lg font-light leading-relaxed">
                Unlock the full potential of your assets with River. Stake, earn rewards, and maintain liquidity seamlessly.
              </p>

              <div className="flex gap-4">
                <button className="px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                  Start Staking
                </button>
                <button className="px-8 py-3 bg-white/5 text-white border border-white/10 rounded-full font-medium hover:bg-white/10 transition backdrop-blur-sm">
                  Learn More
                </button>
              </div>
            </div>

            {/* Right Side Stats */}
            <div className="col-span-12 lg:col-span-4 space-y-4">
              <div className="bg-black/40 border border-white/10 rounded-3xl p-6 backdrop-blur-md relative overflow-hidden">
                <div className="text-sm text-white/40 uppercase tracking-widest font-semibold mb-2">Total Value Locked</div>
                <div className="text-4xl font-mono text-white tracking-tighter">$1,294,002,193</div>
                <div className="absolute right-4 top-4 w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></div>
              </div>

              <div className="bg-black/40 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
                <div className="text-sm text-white/40 uppercase tracking-widest font-semibold mb-2">My Rewards</div>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-mono text-[#F0B90B] tracking-tighter">0.0000</span>
                  <span className="mb-1 text-sm text-white/40">BTC</span>
                </div>
              </div>
            </div>

            {/* Dashboard Grid */}
            <div className="col-span-12">
              <h3 className="text-2xl font-light mb-6 text-white/80">Market Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-48 bg-white/5 border border-white/5 rounded-2xl hover:border-white/10 transition p-6 flex flex-col justify-between group">
                    <div className="flex justify-between items-start">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-xl">
                        {i === 1 ? '💎' : i === 2 ? '⚡️' : '🔥'}
                      </div>
                      <span className="text-green-400 text-xs font-mono bg-green-500/10 px-2 py-1 rounded">+2.4%</span>
                    </div>
                    <div>
                      <div className="text-2xl font-semibold mb-1 group-hover:text-[#F0B90B] transition">Asset Name</div>
                      <div className="text-white/40 text-sm">Volume: $12M</div>
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
