const fs = require("fs");
const path = require("path");
const solc = require("solc");

// đọc file solidity
const contractPath = path.resolve(__dirname, "StudentRegistryV2.sol");
const source = fs.readFileSync(contractPath, "utf8");

// cấu hình compiler
const input = {
  language: "Solidity",
  sources: {
    "StudentRegistryV2.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["abi", "evm.bytecode"]
      }
    }
  }
};

// compile
const output = JSON.parse(solc.compile(JSON.stringify(input)));

// tạo thư mục build nếu chưa có
if (!fs.existsSync("build")) {
  fs.mkdirSync("build");
}

// lấy contract
const contract =
  output.contracts["StudentRegistryV2.sol"]["StudentRegistryV2"];

// ghi ABI
fs.writeFileSync(
  "build/StudentRegistryV2.abi.json",
  JSON.stringify(contract.abi, null, 2)
);

// ghi bytecode
fs.writeFileSync(
  "build/StudentRegistryV2.bytecode.txt",
  contract.evm.bytecode.object
);

console.log("Compile success!");