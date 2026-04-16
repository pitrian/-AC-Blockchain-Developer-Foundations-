import { task } from "hardhat/config";
import "@nomicfoundation/hardhat-ethers";
import "hardhat-deploy";
import "hardhat-deploy-ethers";
import * as dotenv from "dotenv";

dotenv.config();

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});

const {
  TESTNET_PRIVATE_KEY: testnetPrivateKey,
  MAINNET_PRIVATE_KEY: mainnetPrivateKey,
} = process.env;

module.exports = {
  networks: {
    "sepolia": {
      url: "https://eth-sepolia.public.blastapi.io",
      chainId: 11155111,
      accounts: [testnetPrivateKey],
      timeout: 40000,
    },
    "ethereum": {
      url: "https://eth-mainnet.public.blastapi.io",
      chainId: 1,
      accounts: [mainnetPrivateKey],
      timeout: 60000,
    }
  },
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
      viaIR: true
    },
  },
  mocha: {
    timeout: 40000,
  },
  namedAccounts: {
    deployer: 0,
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v6",
  },
};