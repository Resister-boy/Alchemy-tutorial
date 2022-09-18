const hre = require("hardhat");

const main = async () => {
  try {
    const BattleChainContract = await hre.ethers.getContractFactory(
      "BattleChain"
    );
    const battleChain = await BattleChainContract.deploy();
    await battleChain.deployed();

    console.log("Contract deployed to:", battleChain.address);
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
  
main();
