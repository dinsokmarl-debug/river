import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
    const { isConnected } = useAccount();
    const [btcPrice, setBtcPrice] = useState<string>('...');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

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
        <>
            <header className="fixed top-0 left-0 right-0 h-16 lg:h-20 lg:left-64 lg:w-[calc(100%-16rem)] border-b border-white/5 bg-black/90 backdrop-blur-md z-50 flex items-center justify-between lg:justify-end px-4 lg:px-8 gap-6 transition-all duration-300">
                <div className="lg:hidden flex items-center gap-4">
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white border border-white/10"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
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

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm lg:hidden" onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="absolute top-0 bottom-0 left-0 w-64 bg-[#0A0A0A] border-r border-white/10 p-6 flex flex-col" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-8">
                            <img src="/assets/river-text-white.svg" alt="River" className="h-6" />
                            <button onClick={() => setIsMobileMenuOpen(false)} className="text-white/40 hover:text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <nav className="flex-1 space-y-2">
                            {['Dashboard', 'Airdrop'].map((item) => {
                                const isActive = pathname === (item === 'Dashboard' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`);
                                return (
                                    <Link
                                        key={item}
                                        href={item === 'Dashboard' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium
                                            ${isActive
                                                ? 'bg-white text-black'
                                                : 'text-white/40 hover:text-white hover:bg-white/5'
                                            }`}
                                    >
                                        <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-black' : 'bg-white/20'}`} />
                                        {item}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
}
