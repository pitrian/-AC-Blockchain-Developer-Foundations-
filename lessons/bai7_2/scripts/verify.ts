import axios from "axios";
import fs from "fs";
import path from "path";

const API_KEY = "43RGYMZTAETE5CB2BF57FHBTSQR5GJ39UD";
const CONTRACT_ADDRESS = process.argv[2] || "0xcf20e070791F8606A1870e80c143bf563b29a4FC";
const CHAIN_ID = "11155111";

async function verify() {
  const sourceCode = fs.readFileSync(path.join(process.cwd(), "flattened.sol"), "utf8");

  const data = new URLSearchParams({
    apikey: API_KEY,
    module: "contract",
    action: "verifysourcecode",
    contractaddress: CONTRACT_ADDRESS,
    sourceCode: sourceCode,
    codeformat: "solidity-single-file",
    contractname: "MyMintableTokena",
    compilerversion: "v0.8.28+commit.7893614a",
    optimizationUsed: "1",
    runs: "1000",
    licenseType: "3",
    evmversion: "paris",
  });

  try {
    console.log("Verifying contract:", CONTRACT_ADDRESS);
    const url = `https://api.etherscan.io/v2/api?chainid=${CHAIN_ID}`;
    const response = await axios.post(url, data.toString(), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    console.log("Response:", JSON.stringify(response.data, null, 2));
  } catch (error: any) {
    console.error("Error:", error.response?.data || error.message);
  }
}

verify();