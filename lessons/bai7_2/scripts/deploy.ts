import { ethers } from "hardhat";

async function main() {
  console.log("Deploying MyMintableTokena...");

  const MyMintableTokena = await ethers.getContractFactory("MyMintableTokena");
  const token = await MyMintableTokena.deploy();

  await token.waitForDeployment();
  const tokenAddress = await token.getAddress();

  console.log("Contract deployed to:", tokenAddress);

  const [deployer] = await ethers.getSigners();
  console.log("Deployer address:", deployer.address);

  const balanceBefore = await token.balanceOf(deployer.address);
  console.log("Balance before extra mint:", ethers.formatUnits(balanceBefore, 18));

  console.log("Minting 1000 more tokens to deployer...");
  const mintTx = await token.mint(deployer.address, ethers.parseUnits("1000", 18));
  await mintTx.wait();

  const balanceAfter = await token.balanceOf(deployer.address);
  console.log("Balance after extra mint:", ethers.formatUnits(balanceAfter, 18));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});