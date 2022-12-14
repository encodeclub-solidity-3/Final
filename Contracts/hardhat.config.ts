import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "hardhat-abi-exporter";

dotenv.config();
const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  paths: { tests: "tests" },
  networks: {
    ropsten: {
      url: process.env.ROPSTEN_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      gasPrice: 20000000000,
      gas: 6000000
    },
    hardhat: {
      chainId: 31337,
      allowUnlimitedContractSize: true
    },
    goerli: {
      url: process.env.ALCHEMY_URL,
      accounts: [
        process.env.PRIVATE_KEY !== undefined ? process.env.PRIVATE_KEY : "",
        process.env.PRIVATE_KEY_1 !== undefined ? process.env.PRIVATE_KEY_1 : "",
        process.env.PRIVATE_KEY_2 !== undefined ? process.env.PRIVATE_KEY_2 : ""
      ],
    }
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  abiExporter: {
    path: "../Frontend/utils/ABI",
    runOnCompile: true,
    clear: true,
    flat: true,
    only: [],
    spacing: 2,
    pretty: false,
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  }
};

export default config;
