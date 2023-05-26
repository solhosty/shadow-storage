const anchor = require("@project-serum/anchor");
const { Connection, clusterApiUrl, Keypair } = require("@solana/web3.js");
const { ShdwDrive, ShadowFile } = require("@shadow-drive/sdk");
const key =  require('./NP3SYi4apdYNZC55jdePch2k3us3oWLdyYr3dKSsptq.json');
const fs = require('fs');

async function main() {
    let secretKey = Uint8Array.from(key);
    let keypair = Keypair.fromSecretKey(secretKey);
    const connection = new Connection(
        "https://rpc.helius.xyz/?api-key=ea657f44-c42a-4fc7-8829-f500359683a2", "confirmed"
    );    const wallet = new anchor.Wallet(keypair);
    const drive = await new ShdwDrive(connection, wallet).init(); 
    const accts = await drive.getStorageAccounts("v2");
    const fileBuff = fs.readFileSync("./helius.txt");
    let acctPubKey = new anchor.web3.PublicKey(accts[0].publicKey);
    const fileToUpload: typeof ShadowFile = {
    name: "helius.txt",
    file: fileBuff,
    };
    const uploadFile = await drive.uploadFile(acctPubKey, fileToUpload);
    console.log(uploadFile);

}
main();