// scripts/deploy.js

const hre = require("hardhat");

async function main() {
  // We get the contract to deploy.
  const BuyMeCoffeeContract = await hre.ethers.getContractFactory("BuyMeCoffee");
  const buyMeCoffee = await BuyMeCoffeeContract.deploy();

  await buyMeCoffee.deployed();

  console.log("BuyMeACoffee deployed to:", buyMeCoffee);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });