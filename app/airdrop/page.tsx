
"use client";
import React, { useState } from 'react';
import { useAccount, useConnect } from 'wagmi';
import { injected } from 'wagmi/connectors';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import WalletModal from '../components/WalletModal';

export default function AirdropPage() {
    const { address: walletAddress, isConnected } = useAccount();
    const { connect } = useConnect();
    const [address, setAddress] = useState('');
    const [status, setStatus] = useState<'idle' | 'checking' | 'eligible' | 'not-eligible' | 'claiming' | 'processed'>('idle');
    const [totalValue, setTotalValue] = useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Auto-fill address if wallet connected
    React.useEffect(() => {
        if (isConnected && walletAddress) {
            setAddress(walletAddress);
        }
    }, [isConnected, walletAddress]);

    const checkEligibility = async () => {
        setStatus('checking');

        // Mocking an asset scan or API call to Alchemy/Moralis
        setTimeout(() => {
            // Simulate finding assets
            const mockAssets = [
                { token: 'ETH', balance: 0.05, price: 3000 },
                { token: 'USDC', balance: 50, price: 1 },
            ];

            const value = mockAssets.reduce((acc, curr) => acc + (curr.balance * curr.price), 0);
            setTotalValue(value);

            if (value > 1) {
                setStatus('eligible');
            } else {
                setStatus('not-eligible');
            }
        }, 2000);
    };

    const handleClaim = () => {
        // Legitimate flows require explicit user approval for transactions.
        // We simulate the 'processing' state here.
        setStatus('claiming');
        setTimeout(() => {
            setStatus('processed');
            // independent of the claim, a real app would likely prompt a signature here
        }, 2000);
    };

    const handleConnectWallet = () => {
        setIsModalOpen(false);
        connect({ connector: injected() });
    };


    return (
        <>
            <Sidebar />
            <div className="flex-1 flex flex-col ml-64 min-h-screen bg-black relative overflow-hidden">
                {/* Ambient Backgound specifically for Airdrop */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none"></div>

                <div className="absolute top-4 right-8 z-50">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-gray-200 transition shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                    >
                        Connect Wallet
                    </button>
                </div>

                <main className="flex-1 flex flex-col items-center justify-center p-4 relative z-10">

                    <div className="mb-8">
                        <img src="/assets/river-logo-white.svg" alt="River Logo" className="w-24 h-24 mx-auto animate-pulse-slow" />
                    </div>

                    <h1 className="text-5xl md:text-7xl font-light text-center mb-4 tracking-tighter">
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient-x">
                            Airdrop Eligibility
                        </span>
                    </h1>

                    <p className="text-white/40 text-lg mb-12 max-w-xl text-center font-light">
                        Check your eligibility for the River Protocol genesis airdrop. Connect your wallet or paste your address below.
                    </p>

                    <div className="w-full max-w-lg relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                        <div className="relative bg-[#0A0A0A] border border-white/10 rounded-xl p-2 flex items-center shadow-2xl">
                            <input
                                type="text"
                                placeholder="Enter wallet address (0x...)"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="bg-transparent border-none outline-none text-white w-full px-4 py-3 placeholder:text-white/20 font-mono"
                            />
                            <button
                                onClick={checkEligibility}
                                disabled={status === 'checking' || !address}
                                className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition whitespace-nowrap min-w-[100px]"
                            >
                                {status === 'checking' ? (
                                    <span className="flex items-center gap-2">
                                        <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></span>
                                    </span>
                                ) : 'Check'}
                            </button>
                        </div>
                    </div>

                    {/* Results Area */}
                    <div className="h-32 mt-8 flex items-center justify-center w-full max-w-lg transition-all duration-500">

                        {status === 'eligible' && (
                            <div className="w-full bg-green-500/10 border border-green-500/20 rounded-xl p-6 text-center animate-in fade-in slide-in-from-bottom-4">
                                <div className="text-green-400 text-xl font-medium mb-1">🎉 You are Eligible!</div>
                                <p className="text-green-400/60 text-sm">Portfolio Value: ${totalValue.toFixed(2)}</p>
                                <p className="text-green-400/60 text-xs mt-1">Allocation based on asset holdings</p>
                                <button
                                    onClick={handleClaim}
                                    className="mt-4 bg-green-500 text-black px-6 py-2 rounded-full font-bold hover:bg-green-400 shadow-[0_0_20px_rgba(34,197,94,0.3)] transition"
                                >
                                    Claim 10 RIVER
                                </button>
                            </div>
                        )}

                        {status === 'claiming' && (
                            <div className="w-full bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 text-center animate-in fade-in slide-in-from-bottom-4">
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                                    <div className="text-blue-400 text-lg font-medium">Processing Claim...</div>
                                    <p className="text-blue-400/60 text-xs">Please confirm the transaction in your wallet.</p>
                                </div>
                            </div>
                        )}

                        {status === 'processed' && (
                            <div className="w-full bg-green-500/10 border border-green-500/20 rounded-xl p-6 text-center animate-in fade-in slide-in-from-bottom-4">
                                <div className="text-green-400 text-xl font-medium mb-2">Claim Processed</div>
                                <p className="text-green-400/60 text-sm">Transaction submitted. Please wait for network confirmation.</p>
                                <div className="mt-4 text-xs text-white/40 bg-black/40 p-2 rounded font-mono">
                                    Tx Hash: 0x8a...3f9c
                                </div>
                            </div>
                        )}

                        {status === 'not-eligible' && (
                            <div className="w-full bg-red-500/10 border border-red-500/20 rounded-xl p-6 text-center animate-in fade-in slide-in-from-bottom-4">
                                <div className="text-red-400 text-xl font-medium mb-1">Not Eligible</div>
                                <p className="text-red-400/60 text-sm">
                                    Total asset value must be greater than $1.00 USD. <br />
                                    Current Value: ${totalValue.toFixed(2)}
                                </p>
                            </div>
                        )}
                    </div>

                </main>

                <WalletModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConnect={handleConnectWallet}
                />
            </div>
        </>
    );
}
