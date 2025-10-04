import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";

export default function SendTokens() {
    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState("");

    const connection = useConnection();
    const wallet = useWallet();

    const sendToken = async () => {
        if (!recipient || !amount) return;

        const transaction = new Transaction();
        transaction.add(
            SystemProgram.transfer({
                fromPubkey: wallet.publicKey,
                toPubkey: new PublicKey(recipient),
                lamports: Number(amount) * LAMPORTS_PER_SOL,
            })
        );

        await wallet.sendTransaction(transaction, connection.connection);
        alert(`✅ Sent ${amount} SOL to ${recipient}`);
        setRecipient("");
        setAmount("");
    }

    return <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '5px', maxWidth: '300px', backgroundColor: '#f9f9f9', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
        Send Tokens
        <input onChange={(e) => setRecipient(e.target.value)} type="text" placeholder="Recipient Address" />
        <input onChange={(e) => setAmount(e.target.value)} type="number" placeholder="Amount (SOL)" />
        <button onClick={sendToken}>Send</button>
    </div>
}