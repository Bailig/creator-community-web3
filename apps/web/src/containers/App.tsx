import CreatorCommunity from "@cc/smart-contract/artifacts/contracts/CreatorCommunity.sol/CreatorCommunity.json";
import { ethers } from "ethers";
import { Navigation } from "./Navigation";

const provider = new ethers.providers.JsonRpcProvider(
  import.meta.env.VITE_GOERLI_URL
);

const creatorCommunityContract = new ethers.Contract(
  import.meta.env.VITE_GOERLI_CONTRACT_ADDRESS,
  CreatorCommunity.abi,
  provider
);

export default () => {
  return (
    <>
      <Navigation />
    </>
  );
};
