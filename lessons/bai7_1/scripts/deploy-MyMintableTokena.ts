import "@nomicfoundation/hardhat-ethers";
import { ethers } from "hardhat";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("====================");
  console.log("Network: sepolia");
  console.log("Deployer:", deployer.address);
  console.log("====================");

  const MyMintableTokena = await ethers.getContractFactory("contracts/MyMintableTokena.sol:MyMintableTokena", deployer);

  console.log("Deploying MyMintableTokena...");

  const contract = await MyMintableTokena.deploy({
    gasLimit: 2000000,
    gasPrice: 5000000000
  });

  await contract.waitForDeployment();

  const contractAddress = await contract.getAddress();
  console.log("✅ MyMintableTokena deployed at:", contractAddress);

  const balance = await contract.balanceOf(deployer.address);
  const balanceInToken = ethers.formatUnits(balance, 18);

  console.log("====================");
  console.log("Balance of deployer:", balanceInToken, "CR3");
  console.log("====================");

  console.log("\nOwner can mint more tokens using:");
  console.log(`await contract.mint(toAddress, amount)`);
}

main();