import { useState } from 'react'
import './App.css'
import React, { FC, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';

import '@solana/wallet-adapter-react-ui/styles.css';
import Airdrop from './components/Airdrop';
import ShowBalance from './components/ShowBalance';
import SendTokens from './components/SendTokens';
import SignMessage from './components/SignMessage';

function App() {

  return (
    <ConnectionProvider endpoint={"https://api.devnet.solana.com"}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', justifyContent: 'space-between'}}>
            <WalletMultiButton />
            {/* <WalletDisconnectButton /> */}
          </div>
          <div><h1>Solana Faucet</h1></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
            <Airdrop />
            <ShowBalance />
            <SendTokens />
            <SignMessage />
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}

export default App
