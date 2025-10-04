import { ed25519 } from "@noble/curves/ed25519";
import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";

export default function SignMessage() {
    const wallet = useWallet();
    const [message, setMessage] = useState("");

    const SignMessage = async () => {
        if (!wallet.publicKey) {
            alert("Wallet not connected");
            return;
        }

        if (message === "") {
            alert("Message is empty");
            return;
        }

        const encodedMessage = new TextEncoder().encode(message);
        const signature = await wallet.signMessage(encodedMessage);
        if (!ed25519.verify(signature, encodedMessage, wallet.publicKey.toBytes())) throw new Error("Invalid signature");

        alert(`✅ Signed message: ${Buffer.from(signature).toString('hex')}`);
        setMessage("");
        console.log("Signature (base58):", bs58.encode(signature));
    }

    return <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '5px', maxWidth: '300px', backgroundColor: '#f9f9f9', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
        <input value={message} onChange={(e) => setMessage(e.target.value)} type="text" placeholder="Enter message to sign" />
        <button onClick={SignMessage}>Sign Message</button>
    </div>
}