import { ethers } from "ethers";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  const provider = new ethers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/Ex268gQrSZ0HLzNlQtODQ");

  const abi = [
    "function balanceOf(address account) view returns (uint256)"
  ];
  
  const contractAddress = "0x056705D4F5e5902B4749Cca5d2b083cBaB6Cd39a";
  const contract = new ethers.Contract(contractAddress, abi, provider);

  const privateKey = process.env.TESTNET_PRIVATE_KEY || "";
  const wallet = new ethers.Wallet(privateKey, provider);
  const deployerAddress = wallet.address;

  console.log("====================");
  console.log("Deployer Address:", deployerAddress);
  console.log("Contract Address:", contractAddress);
  console.log("====================");

  const balance = await contract.balanceOf(deployerAddress);
  const balanceInToken = ethers.formatUnits(balance, 18);

  console.log("Balance of deployer:", balanceInToken, "MTK");
  console.log("Expected: 1000000 MTK");

  const balanceNumber = parseFloat(balanceInToken);
  if (balanceNumber === 1000000) {
    console.log("✅ Test PASSED!");
  } else {
    console.log("❌ Test FAILED!");
  }
}

main().catch(console.error);
