import { useEffect, useState } from "react";
import { Navigation } from "../components";

const getMetaMaskAddress = async () => {
  if (!window.ethereum) {
    alert("MetaMask must be installed!");
    return "";
  }
  const accounts = await window.ethereum.request<string[]>({
    method: "eth_requestAccounts",
  });
  if (!accounts) {
    console.error("Request account failed.");
    return "";
  }
  return accounts[0];
};

export default () => {
  const [walletAddress, setWalletAddress] = useState<string>();

  useEffect(() => {
    getMetaMaskAddress()
      .then(setWalletAddress)
      .catch((error) => console.error(error));
  }, []);

  const handleWalletConnect = async () => {
    const address = await getMetaMaskAddress();
    setWalletAddress(address);
  };

  const user = walletAddress ? { walletAddress } : undefined;

  return <Navigation user={user} onWalletConnect={handleWalletConnect} />;
};
