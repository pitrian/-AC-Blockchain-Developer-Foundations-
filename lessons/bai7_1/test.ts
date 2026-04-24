import { ethers } from "ethers";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  const provider = new ethers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/Ex268gQrSZ0HLzNlQtODQ");
  
  const privateKey = process.env.TESTNET_PRIVATE_KEY || "";
  const wallet = new ethers.Wallet(privateKey, provider);
  const deployerAddress = wallet.address;
  
  const contractAddress = "0x7c3E8257Dc7FDbE58e32E0467238F8eEcCb07234";
  
  const abi = [
    "function balanceOf(address account) view returns (uint256)",
    "function mint(address to, uint256 amount) external"
  ];
  
  const contract = new ethers.Contract(contractAddress, abi, wallet);
  
  console.log("====================");
  console.log("Network: sepolia");
  console.log("Deployer:", deployerAddress);
  console.log("Contract:", contractAddress);
  console.log("====================");
  
  const balance = await contract.balanceOf(deployerAddress);
  const balanceInToken = ethers.formatUnits(balance, 18);
  console.log("Balance of deployer:", balanceInToken, "CR3");
  
  console.log("\n--- Minting 500 more tokens ---");
  const mintTx = await contract.mint(deployerAddress, ethers.parseUnits("500", 18));
  await mintTx.wait();
  console.log("Minted 500 CR3 to deployer");
  
  const newBalance = await contract.balanceOf(deployerAddress);
  const newBalanceInToken = ethers.formatUnits(newBalance, 18);
  console.log("New balance:", newBalanceInToken, "CR3");
  
  if (parseFloat(newBalanceInToken) === 1500) {
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