import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const CreatorCommunity = await ethers.getContractFactory("CreatorCommunity");
  const creatorCommunity = await CreatorCommunity.deploy();

  await creatorCommunity.deployed();

  console.log("Creator Community Address:", creatorCommunity.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
