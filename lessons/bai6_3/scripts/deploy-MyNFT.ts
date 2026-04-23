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

  const MyNFT = await ethers.getContractFactory("contracts/MyNFT.sol:MyNFT", deployer);

  console.log("Deploying MyNFT...");

  const contract = await MyNFT.deploy({
    gasLimit: 2000000,
    gasPrice: 5000000000
  });

  await contract.waitForDeployment();

  const contractAddress = await contract.getAddress();
  console.log("✅ MyNFT deployed at:", contractAddress);

  console.log("Minting NFT #0 to deployer...");

  const mintTx = await contract.mint(deployer.address, {
    gasLimit: 100000,
    gasPrice: 5000000000
  });
  await mintTx.wait();

  console.log("✅ Minted NFT #0 to deployer:", deployer.address);

  const owner = await contract.ownerOf(0);
  console.log("Owner of NFT #0:", owner);

  if (owner.toLowerCase() === deployer.address.toLowerCase()) {
    console.log("====================");
    console.log("✅ TEST PASSED!");
    console.log("====================");
  } else {
    console.log("====================");
    console.log("❌ TEST FAILED!");
    console.log("====================");
  }
}

main();