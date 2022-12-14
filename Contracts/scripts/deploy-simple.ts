import { ethers } from "hardhat";
import "dotenv/config";
import * as savingCircleJson from "../artifacts/contracts/SimpleSavingCircle.sol/SimpleSavingCircle.json";
import * as fs from "fs";

// Do never expose your keys like this
const EXPOSED_KEY =
  "8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f";


/*
    Deployment Script of SavingCircle.sol
*/
async function main() {
    const wallet = process.env.MNEMONIC && process.env.MNEMONIC.length > 0
    ? ethers.Wallet.fromMnemonic(process.env.MNEMONIC)
    : new ethers.Wallet(process.env.PRIVATE_KEY ?? EXPOSED_KEY);
console.log(`Using address ${wallet.address}`);
const provider = ethers.providers.getDefaultProvider("goerli");
const signer = wallet.connect(provider);
const balanceBN = await signer.getBalance();
const balance = Number(ethers.utils.formatEther(balanceBN));
console.log(`Wallet balance ${balance}`);
if (balance < 0.01) {
  throw new Error("Not enough ether");
}
console.log("Deploying Saving Circle Contract");
const SavingCircleContractFactory = new ethers.ContractFactory (
  savingCircleJson.abi,
  savingCircleJson.bytecode,
  signer
);

const contract = await SavingCircleContractFactory.deploy();
console.log("Awaiting confirmations");
await contract.deployed();
console.log("Completed");
console.log(`Contract deployed at ${contract.address}`);

fs.writeFileSync(
  "../Frontend/utils/contractAddress.js",
  `export const contractAddress = "${contract.address}"`
);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});