import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const counter = await ethers.getContract("Counter");
  console.log("Counter address:", await counter.getAddress());

  const tx = await counter.increment();
  await tx.wait();

  const count = await counter.getCount();
  console.log("Current count is:", count.toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});