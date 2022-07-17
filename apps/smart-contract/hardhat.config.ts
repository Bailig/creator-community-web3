import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";
import { HardhatUserConfig } from "hardhat/config";

const { GOERLI_URL, ACCOUNT_PRIVATE_KEY } = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: GOERLI_URL,
      accounts: [ACCOUNT_PRIVATE_KEY!],
    },
  },
};

export default config;
