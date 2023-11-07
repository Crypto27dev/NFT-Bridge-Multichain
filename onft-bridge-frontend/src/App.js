// require("dotenv").config();
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import ONFTBridge from './components/ONFTBridge';
import DeployContract from './components/DeployContract';
import './App.css';

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  mainnet,
  polygonMumbai,  
  optimismGoerli,
  lineaTestnet,
  mantleTestnet,
  polygonZkEvmTestnet,
  bscTestnet,
  baseGoerli,
  zkSyncTestnet,
  polygon,
  optimism,
  // linea,
  base,
  zkSync,
  mantle,
  polygonZkEvm,
  bsc
} from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export const linea : Chain = {
  id: 59_144,
  name: 'Linea',
  network: 'linea',
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH'
  },
  rpcUrls: {
    public: { http: ['https://linea.rpc.thirdweb.com'] },
    default: { http: ['https://linea.rpc.thirdweb.com'] }
  },
  blockExplorers: {
    etherscan: { name: 'SnowTrace', url: 'https://lineascan.build/' },
    default: { name: 'SnowTrace', url: 'https://lineascan.build/' }
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 42,
    }
  }
}

function App() {

  const { chains, publicClient } = configureChains(
    [mainnet,  polygonMumbai,    optimismGoerli, lineaTestnet, 
    mantleTestnet, polygonZkEvmTestnet, bscTestnet, baseGoerli,zkSyncTestnet,
    polygon,
    optimism,
    linea,
    base,
    zkSync,
    mantle,
    polygonZkEvm,
    bsc],
    [
      alchemyProvider({ apiKey: "eErafqfM6rYtBzJqFeVQp9pH8Lcr_ZYm" }),
      publicProvider()
    ]
  );

  const { connectors } = getDefaultWallets({
    appName: 'My RainbowKit App',
    projectId: "8e54f53909f1aa426580d5e1e75dfdf5",
    chains
  });

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
    useConfig: true
  })

  return (

    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Router>
          <div className="App">
            <nav className='mt-3'>
              <ul className="nav justify-content-center">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/onft-bridge">ONFT Bridge</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/deploy-contract">Deploy Contract</Link>
                </li>
                <li>
                  <ConnectButton />
                </li>
              </ul>
            </nav>

            <Routes>
              <Route path="\/" element={<Home />} />
              <Route path="/onft-bridge" element={<ONFTBridge />} />
              <Route path="/deploy-contract" element={<DeployContract />} />
            </Routes>
          </div>
        </Router>
      </RainbowKitProvider>
    </WagmiConfig>    
  );
}

export default App;
