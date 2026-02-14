
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'River - Liquid Staking',
  description: 'The next generation of liquid staking.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white relative h-screen overflow-hidden`}>
        {/* Global ambient light */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none z-0"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#F0B90B]/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

        <div className="relative z-10 flex h-full">
          {children}
        </div>
      </body>
    </html>
  );
}
