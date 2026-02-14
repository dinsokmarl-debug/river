import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Header() {
    const { isConnected } = useAccount();
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

    return (
        <header className="fixed top-0 left-0 right-0 h-16 lg:h-20 lg:left-64 lg:w-[calc(100%-16rem)] border-b border-white/5 bg-black/90 backdrop-blur-md z-50 flex items-center justify-between lg:justify-end px-4 lg:px-8 gap-6 transition-all duration-300">
            <div className="lg:hidden">
                <img src="/assets/river-text-white.svg" alt="River" className="h-6" />
            </div>

            <div className="hidden lg:flex items-center gap-6 text-sm font-mono text-white/60">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#F0B90B] rounded-full"></span>
                    <span>BINANCE PRICE: {btcPrice}</span>
                </div>
                <div className="w-px h-4 bg-white/10"></div>
                <div>GAS: 12 Gwei</div>
            </div>

            <ConnectButton.Custom>
                {({
                    account,
                    chain,
                    openAccountModal,
                    openChainModal,
                    openConnectModal,
                    authenticationStatus,
                    mounted,
                }) => {
                    // Note: If your app doesn't use authentication, you
                    // can remove all 'authenticationStatus' checks
                    const ready = mounted && authenticationStatus !== 'loading';
                    const connected =
                        ready &&
                        account &&
                        chain &&
                        (!authenticationStatus ||
                            authenticationStatus === 'authenticated');

                    return (
                        <div
                            {...(!ready && {
                                'aria-hidden': true,
                                'style': {
                                    opacity: 0,
                                    pointerEvents: 'none',
                                    userSelect: 'none',
                                },
                            })}
                        >
                            {(() => {
                                if (!connected) {
                                    return (
                                        <button onClick={openConnectModal} className="flex items-center gap-2 px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 bg-white text-black hover:bg-white/90 shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)]">
                                            Connect Wallet
                                        </button>
                                    );
                                }

                                if (chain.unsupported) {
                                    return (
                                        <button onClick={openChainModal} className="px-6 py-2.5 rounded-full font-medium text-sm bg-red-500 text-white hover:bg-red-600 transition">
                                            Wrong network
                                        </button>
                                    );
                                }

                                return (
                                    <button onClick={openAccountModal} className="flex items-center gap-2 px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 bg-white/10 text-white border border-white/20 hover:bg-white/20">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        {account.displayName}
                                    </button>
                                );
                            })()}
                        </div>
                    );
                }}
            </ConnectButton.Custom>
        </header>
    );
}
