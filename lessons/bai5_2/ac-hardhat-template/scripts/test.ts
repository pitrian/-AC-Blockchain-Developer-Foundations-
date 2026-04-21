import { ethers } from "hardhat";

const abi = [
  "function getCount() public view returns (uint256)",
  "function increment() public"
];

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const counter = await ethers.getContract("Counter");
  console.log("Counter address:", await counter.getAddress());

  const contract = new ethers.Contract(await counter.getAddress(), abi, deployer);

  const tx = await contract.increment();
  await tx.wait();

  const count = await contract.getCount();
  console.log("Current count is:", count.toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});