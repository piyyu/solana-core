import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

export default function ShowBalance() {
    const { connection } = useConnection();
    const wallet = useWallet();
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const getBalance = async () => {
            if (!wallet.publicKey) return;

            const balance = await connection.getBalance(wallet.publicKey);
            setBalance(balance / LAMPORTS_PER_SOL);
        };

        getBalance();
    }, [wallet.publicKey, connection]);

    return (
        <>
        {!wallet.connected ? null : <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px', maxWidth: '300px', backgroundColor: '#f9f9f9', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
            <h2>Balance</h2>
            <p>Your balance: {balance} SOL</p>
        </div>}
        </>
    );
}
