import React, { useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { createMint, createInitializeMint2Instruction, getMinimumBalanceForRentExemptMint, MINT_SIZE, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { Keypair, Transaction, SystemProgram } from '@solana/web3.js';

export function TokenLaunchpad() {
    const [name, setName] = useState('');
    const [symbol, setSymbol] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [initialSupply, setInitialSupply] = useState();

    const wallet = useWallet();
    const { connection } = useConnection();

    // createMint(); => gives the schema for creating a mint { could'nt call directly cuz we did not have the users private key }

    const createToken = async () => {
        // if (!wallet.connected) {
        //     alert('Please connect your wallet!');
        //     return;
        // }
        // if (!name || !symbol || !imageURL || !initialSupply) {
        //     alert('Please fill in all fields!');
        //     return;
        // }

        const lamports = await getMinimumBalanceForRentExemptMint(connection);
        const keypair = Keypair.generate();

        const transaction = new Transaction().add(
            SystemProgram.createAccount({
                fromPubkey: wallet.publicKey,
                newAccountPubkey: keypair.publicKey,
                space: MINT_SIZE,
                lamports,
                programId: TOKEN_PROGRAM_ID,
            }),
            createInitializeMint2Instruction(keypair.publicKey, 6, wallet.publicKey, wallet.publicKey, TOKEN_PROGRAM_ID),
        );

        const recentBlockhash = await connection.getLatestBlockhash();
        transaction.recentBlockhash = recentBlockhash.blockhash;
        transaction.feePayer = wallet.publicKey;

        transaction.partialSign(keypair);
        const resp = await wallet.sendTransaction(transaction, connection);
        console.log('Transaction response:', resp);
    }

    return <div style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }}>
        <h1>Solana Token Launchpad</h1>
        <input value={name} onChange={(e) => setName(e.target.value)} className='inputText' type='text' placeholder='Name'></input> <br />
        <input value={symbol} onChange={(e) => setSymbol(e.target.value)} className='inputText' type='text' placeholder='Symbol'></input> <br />
        <input value={imageURL} onChange={(e) => setImageURL(e.target.value)} className='inputText' type='text' placeholder='Image URL'></input> <br />
        <input value={initialSupply} onChange={(e) => setInitialSupply(Number(e.target.value))} className='inputText' type='text' placeholder='Initial Supply'></input> <br />
        <button onClick={createToken} className='btn'>Create a token</button>
    </div>
}