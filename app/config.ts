import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, sepolia, bsc, polygon } from 'wagmi/chains';

export const config = getDefaultConfig({
    appName: 'River Protocol',
    projectId: 'YOUR_PROJECT_ID',
    chains: [mainnet, bsc, polygon, sepolia],
    ssr: true, // If your dApp uses server side rendering (SSR)
});
