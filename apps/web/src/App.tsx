import CreatorCommunity from "@cc/smart-contract/artifacts/contracts/CreatorCommunity.sol/CreatorCommunity.json";
import { ethers } from "ethers";
import { useState } from "react";

const provider = new ethers.providers.JsonRpcProvider(
  import.meta.env.VITE_GOERLI_URL
);

const creatorCommunityContract = new ethers.Contract(
  import.meta.env.VITE_GOERLI_CONTRACT_ADDRESS,
  CreatorCommunity.abi,
  provider
);

export const App = () => {
  const [value, setValue] = useState<string>();

  const handleConnect = async () => {
    if (!window.ethereum) {
      alert("MetaMask must be installed!");
      return;
    }
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];
    setValue(account);
  };

  return (
    <div className="App">
      <div>
        <button onClick={handleConnect}>connect</button>
      </div>
      Account: {value}
    </div>
  );
};
