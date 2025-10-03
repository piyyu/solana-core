import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { useState } from 'react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

export default function Airdrop() {
    const [val, setVal] = useState("");
    const { connection } = useConnection();
    const wallet = useWallet();

    const sendAirdrop = async () => {
        if (!wallet.publicKey) {
            alert("Wallet not connected");
            return;
        }
        if (val === "" || isNaN(val) || Number(val) <= 0) {
            alert("Invalid amount");
            return;
        }

        try {
            console.log("Requesting airdrop...");
            const signature = await connection.requestAirdrop(
                wallet.publicKey,
                Number(val) * LAMPORTS_PER_SOL
            );

            console.log("Airdrop signature:", signature);
            console.log("Waiting for confirmation...");

            await connection.confirmTransaction(signature, 'confirmed');

            alert(`✅ Airdrop successful! ${signature}`);
        } catch (error) {
            console.error("❌ Full error:", error);
            console.log(`Airdrop failed: ${error.message}`);
        }
    };


    return (
        <div>
            <h2>Airdrop</h2>
            <input
                value={val}
                onChange={(e) => setVal(e.target.value)}
                type="number"
                placeholder="Enter amount (SOL)"
            />
            <button onClick={sendAirdrop}>Airdrop</button>
        </div>
    );
}
