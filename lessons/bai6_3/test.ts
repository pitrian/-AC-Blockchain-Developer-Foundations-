import { ethers } from "ethers";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  const provider = new ethers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/Ex268gQrSZ0HLzNlQtODQ");
  
  const privateKey = process.env.TESTNET_PRIVATE_KEY || "";
  const wallet = new ethers.Wallet(privateKey, provider);
  const deployerAddress = wallet.address;
  
  const contractAddress = "0x3BEFB1cdED6b08aC4f372b5356a6eDe0F99641DD";
  
  const abi = [
    "function ownerOf(uint256 tokenId) view returns (address)",
    "function balanceOf(address account) view returns (uint256)",
    "function mint(address to) nonpayable"
  ];
  
  const contract = new ethers.Contract(contractAddress, abi, provider);
  
  console.log("====================");
  console.log("Network: sepolia");
  console.log("Deployer:", deployerAddress);
  console.log("Contract:", contractAddress);
  console.log("====================");
  
  const owner = await contract.ownerOf(0);
  console.log("Owner of NFT #0:", owner);
  
  const balance = await contract.balanceOf(deployerAddress);
  console.log("NFT balance of deployer:", balance.toString());
  
  if (owner.toLowerCase() === deployerAddress.toLowerCase()) {
    console.log("====================");
    console.log("✅ TEST PASSED!");
    console.log("====================");
  } else {
    console.log("====================");
    console.log("❌ TEST FAILED!");
    console.log("====================");
  }
}

main().catch(console.error);