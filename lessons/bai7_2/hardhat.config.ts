import { task } from "hardhat/config";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-verify";
import * as dotenv from "dotenv";

dotenv.config();

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});

const privateKey = process.env.TESTNET_PRIVATE_KEY || "";
const sepoliaUrl = process.env.SEPOLIA_URL || "";

module.exports = {
  networks: {
    hardhat: {
      chainId: 31337,
    },
    sepolia: {
      url: sepoliaUrl,
      chainId: 11155111,
      accounts: [privateKey],
    },
  },
  etherscan: {
    apiKey: {
      sepolia: process.env.ETHERSCAN_API_KEY || ""
    },
    customChains: [
      {
        network: "sepolia",
        chainId: 11155111,
        urls: {
          apiURL: "https://api.etherscan.io/v2/api",
          browserURL: "https://sepolia.etherscan.io"
        }
      }
    ]
  },
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
};