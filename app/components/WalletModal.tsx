
interface IWalletModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConnect: (walletName: string) => void;
}

const WalletModal: React.FC<IWalletModalProps> = ({ isOpen, onClose, onConnect }) => {
    if (!isOpen) return null;

    const WALLETS = [
        { name: 'Binance Wallet', icon: '/assets/binance-wallet.svg', isPopular: true },
        { name: 'MetaMask', icon: '/assets/spark-icon.svg', isPopular: false }, // Use spark icon as placeholder if needed
        { name: 'WalletConnect', icon: '/assets/spark-icon.svg', isPopular: false },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={onClose}>
            <div
                className="relative w-full max-w-sm bg-[#1A1A1A] rounded-2xl border border-white/10 p-6 shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

                <div className="flex justify-between items-center mb-6 mt-2">
                    <h2 className="text-xl font-medium text-white">Connect Wallet</h2>
                    <button className="text-white/40 hover:text-white transition" onClick={onClose}>✕</button>
                </div>

                <div className="space-y-3">
                    {WALLETS.map((wallet) => (
                        <button
                            key={wallet.name}
                            onClick={() => onConnect(wallet.name)}
                            className={`w-full flex items-center justify-between p-4 rounded-xl transition border group
                ${wallet.isPopular
                                    ? 'bg-white/5 hover:bg-white/10 border-white/5 hover:border-white/20'
                                    : 'bg-transparent hover:bg-white/5 border-transparent hover:border-white/10'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-white/10 p-1 flex items-center justify-center overflow-hidden">
                                    <img src={wallet.icon} alt={wallet.name} className="w-full h-full object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
                                </div>
                                <span className="text-white font-medium group-hover:text-[#F0B90B] transition-colors">{wallet.name}</span>
                            </div>
                            {wallet.isPopular && (
                                <div className="text-[10px] font-bold bg-[#F0B90B] text-black px-2 py-0.5 rounded uppercase tracking-wider">
                                    Popular
                                </div>
                            )}
                        </button>
                    ))}
                </div>

                <div className="mt-6 text-center text-xs text-white/20 hover:text-white/40 cursor-pointer transition">
                    New to wallets? Learn more
                </div>
            </div>
        </div>
    );
};

export default WalletModal;
