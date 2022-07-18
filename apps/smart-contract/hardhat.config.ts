import "@nomicfoundation/hardhat-toolbox";

import { getEnv } from "@cc/env";
import { HardhatUserConfig } from "hardhat/config";

const { GOERLI_URL, ACCOUNT_PRIVATE_KEY } = getEnv();

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: GOERLI_URL,
      accounts: [ACCOUNT_PRIVATE_KEY],
    },
  },
};

export default config;
