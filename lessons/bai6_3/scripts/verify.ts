import { ethers } from "ethers";
import * as dotenv from "dotenv";
import * as fs from "fs";

dotenv.config();

async function verifyOnEtherscan() {
  const contractAddress = "0x0dD19715D1BdB83C8bF295FA8B0a56A5488B3Dc5";
  const contractSource = fs.readFileSync("./contracts/MyNFT.sol", "utf8");
  const apiKey = process.env.ETHERSCAN_API_KEY || "";
  
  console.log("====================");
  console.log("Etherscan Verification");
  console.log("====================");
  console.log("Contract:", contractAddress);
  console.log("API Key:", apiKey);
  console.log("");
  console.log("Source code:");
  console.log(contractSource);
  console.log("");
  console.log("To verify on Etherscan, run:");
  console.log(`curl -X POST "https://api-sepolia.etherscan.io/api?module=contract&action=verify&address=${contractAddress}&contractaddress=${contractAddress}&codeType=solidity&contractsourcecode=<ENCODED_SOURCE>&compilerversion=0.8.28&optimizationused=1&runs=1000&apiKey=${apiKey}"`);
  console.log("");
  console.log("Or manually verify at:");
  console.log(`https://sepolia.etherscan.io/address/${contractAddress}#verifyContract`);
}

verifyOnEtherscan();