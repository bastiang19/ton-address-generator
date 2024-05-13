import { TonClient, WalletContractV4 } from "@ton/ton";
import { mnemonicNew, mnemonicToPrivateKey } from "@ton/crypto";

const desiredEndings = ['durov', 'ton', 'paul']; // an array of desired endings

const searchBouncable = false; // if you need to find Bouncable address - use true, else - use false

async function main() {
    const client = new TonClient({
      endpoint: 'https://toncenter.com/api/v2/jsonRPC',
    });

    try {
       console.log('Start');
        while (true) { 
            let mnemonics = await mnemonicNew();
            let keyPair = await mnemonicToPrivateKey(mnemonics);
            let workchain = 0;
            let wallet = WalletContractV4.create({ workchain, publicKey: keyPair.publicKey });
            let address = wallet.address.toString({ bounceable: searchBouncable }).toLowerCase();

            if (desiredEndings.some(ending => address.endsWith(ending))) {
                console.log("Secret Key:", keyPair.secretKey.toString('hex'));
                console.log("Public Key:", keyPair.publicKey.toString('hex'));
                console.log("Seed Phrase:", mnemonics.join(' '));
                console.log("Address (Bouncable):", wallet.address.toString({ bounceable: true }));
                console.log("Address (UnBouncable):", wallet.address.toString({ bounceable: false }));
                console.log('----------------------------------------------------------');
            }
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

main();
