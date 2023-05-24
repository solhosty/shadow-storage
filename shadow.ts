import anchor from "@project-serum/anchor";
import { Connection, clusterApiUrl, Keypair } from "@solana/web3.js";
import { ShdwDrive, ShadowFile } from "@shadow-drive/sdk";
import * as fs from "fs";
import key from "./shQBVFZbngBA2zeLoKr9AgpyNvwMFTJo36MwavMTQcV.json";

async function main() {
    let secretKey = Uint8Array.from(key);
    let keypair = Keypair.fromSecretKey(secretKey);
    const connection = new Connection(
        clusterApiUrl("mainnet-beta"),
        "confirmed"
    );
    const wallet = new anchor.Wallet(keypair);
    const drive = await new ShdwDrive(connection, wallet).init();
    const newAcct = await drive.createStorageAccount("myDemoBucket", "10MB", "v2");
    console.log(newAcct);   
    const fileBuff = fs.readFileSync("./mytext.txt");
    const acctPubKey = new anchor.web3.PublicKey(
    "0xF5f6eBA8498120B8408C3ecDa1898a1Df2237C93"
    );
    const fileToUpload: ShadowFile = {
    name: "mytext.txt",
    file: fileBuff,
    };
    const uploadFile = await drive.uploadFile(acctPubKey, fileToUpload);
    console.log(uploadFile);
}

main();

//Upload Multiple Files
//This is a nearly identical implementation to uploadFile, except that it requires a FileList or array of ShadowFiles and an optional concurrency parameter.