
"use client";
import { useState, useEffect } from 'react';
import WalletModal from './WalletModal';

export default function Header() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [btcPrice, setBtcPrice] = useState<string>('...');

    useEffect(() => {
        const fetchPrice = async () => {
            try {
                const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
                if (res.ok) {
                    const data = await res.json();
                    setBtcPrice(`$${data.bitcoin.usd.toLocaleString()}`);
                }
            } catch (e) {
                console.error(e);
            }
        };
        fetchPrice();
        // Refresh every 30s
        const interval = setInterval(fetchPrice, 30000);
        return () => clearInterval(interval);
    }, []);

    const handleConnect = (walletName: string) => {
        // Simulating connection
        setIsModalOpen(false);
        setWalletAddress('0x71C...9A21');
    };

    return (
        <>
            <header className="fixed top-0 left-64 right-0 h-20 border-b border-white/5 bg-black/50 backdrop-blur-md z-40 flex items-center justify-end px-8 gap-6">
                <div className="flex items-center gap-6 text-sm font-mono text-white/60">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#F0B90B] rounded-full"></span>
                        <span>BINANCE PRICE: {btcPrice}</span>
                    </div>
                    <div className="w-px h-4 bg-white/10"></div>
                    <div>GAS: 12 Gwei</div>
                </div>

                <button
                    onClick={() => !walletAddress && setIsModalOpen(true)}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300
            ${walletAddress
                            ? 'bg-white/10 text-white border border-white/20'
                            : 'bg-white text-black hover:bg-white/90 shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)]'
                        }`}
                >
                    {walletAddress ? (
                        <>
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            {walletAddress}
                        </>
                    ) : (
                        'Connect Wallet'
                    )}
                </button>
            </header>

            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-[#111] border border-white/10 rounded-3xl p-6 w-full max-w-sm shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>

                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-semibold text-white">Connect Wallet</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-white/40 hover:text-white transition">✕</button>
                        </div>

                        <div className="space-y-3">
                            <button onClick={() => handleConnect('Binance')} className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 rounded-xl transition group">
                                <div className="flex items-center gap-3">
                                    {/* Use local asset or fallback */}
                                    <img src="/assets/binance-wallet.svg" className="w-8 h-8" alt="Binance" />
                                    <span className="font-medium text-white">Binance Wallet</span>
                                </div>
                                <div className="px-2 py-0.5 text-[10px] font-bold bg-[#F0B90B] text-black rounded uppercase tracking-wider">Popular</div>
                            </button>

                            <button onClick={() => handleConnect('MetaMask')} className="w-full flex items-center gap-3 p-4 bg-transparent hover:bg-white/5 border border-transparent hover:border-white/10 rounded-xl transition text-white/60 hover:text-white">
                                <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">🦊</div>
                                <span className="font-medium">MetaMask</span>
                            </button>

                            <button onClick={() => handleConnect('WalletConnect')} className="w-full flex items-center gap-3 p-4 bg-transparent hover:bg-white/5 border border-transparent hover:border-white/10 rounded-xl transition text-white/60 hover:text-white">
                                <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">📡</div>
                                <span className="font-medium">WalletConnect</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
