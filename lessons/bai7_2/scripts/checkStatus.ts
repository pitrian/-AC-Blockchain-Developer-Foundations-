import axios from "axios";

const API_KEY = "43RGYMZTAETE5CB2BF57FHBTSQR5GJ39UD";
const GUID = "igzwngzk7u3nrllzamracg5v4fmdksavebqkebpyj85qhvz2ie";
const CHAIN_ID = "11155111";

async function checkStatus() {
  try {
    console.log("Checking verification status...");
    const url = `https://api.etherscan.io/v2/api?chainid=${CHAIN_ID}`;
    const data = new URLSearchParams({
      apikey: API_KEY,
      module: "contract",
      action: "checkverifystatus",
      guid: GUID,
    });
    
    const response = await axios.post(url, data.toString(), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    console.log("Response:", response.data);
  } catch (error: any) {
    console.error("Error:", error.response?.data || error.message);
  }
}

checkStatus();