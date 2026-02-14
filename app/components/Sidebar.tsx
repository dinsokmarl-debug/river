
"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import WalletModal from './WalletModal';

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 bottom-0 w-64 border-r border-white/5 bg-black/50 backdrop-blur-xl z-50 flex-col p-6 hidden lg:flex">
            <Link href="/" className="mb-12 block">
                <img src="/assets/river-text-white.svg" alt="River" className="h-8" />
            </Link>

            <nav className="flex-1 space-y-2">
                {['Dashboard', 'Airdrop'].map((item) => {
                    const isActive = pathname === (item === 'Dashboard' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`);
                    return (
                        <Link
                            key={item}
                            href={item === 'Dashboard' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium
                  ${isActive
                                    ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                                    : 'text-white/40 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-black' : 'bg-white/20'}`} />
                            {item}
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto pt-6 border-t border-white/5">
                <div className="flex items-center gap-3 px-4 py-3 text-xs text-white/40">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span>System Operational</span>
                </div>
            </div>
        </aside>
    );
};

const MobileNav = () => {
    const pathname = usePathname();
    return (
        <nav className="fixed bottom-0 left-0 right-0 h-16 bg-[#111] border-t border-white/10 z-[60] flex items-center justify-around lg:hidden pb-safe backdrop-blur-md">
            {['Dashboard', 'Airdrop'].map((item) => {
                const isActive = pathname === (item === 'Dashboard' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`);
                return (
                    <Link
                        key={item}
                        href={item === 'Dashboard' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                        className={`flex flex-col items-center gap-1 ${isActive ? 'text-white' : 'text-white/40'}`}
                    >
                        <span className="text-xs font-medium">{item}</span>
                        {isActive && <div className="w-1 h-1 bg-white rounded-full mt-1"></div>}
                    </Link>
                );
            })}
        </nav>
    );
};

export default function SidebarWrapper() {
    return (
        <>
            <Sidebar />
            <MobileNav />
        </>
    );
}
