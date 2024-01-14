// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
    const currentTimestampInSeconds = Math.round(Date.now() / 1000);
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    const unlockTime = currentTimestampInSeconds + 30; // + ONE_YEAR_IN_SECS;

    const lockedAmount = hre.ethers.parseEther("1");

    const LockFactory = await hre.ethers.getContractFactory("Lock");
    const Lock = await LockFactory.deploy(unlockTime, { value: lockedAmount });

    console.log(
        `Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${Lock.target}`
    );

    console.log("Contract address:", Lock.target);
    console.log("Owner address:", await Lock.owner());
    console.log("Contract balance:", await hre.ethers.provider.getBalance(Lock.target), "wei");
    console.log("Owner balance:", await hre.ethers.provider.getBalance(await Lock.owner()), "wei");
    // wait for 60 seconds
    console.log("Waiting for 60 seconds before unlocking...");
    await new Promise((resolve) => setTimeout(resolve, 60000));
    await Lock.withdraw();
    console.log("Contract balance:", await hre.ethers.provider.getBalance(Lock.target), "wei");
    console.log("Owner balance:", await hre.ethers.provider.getBalance(await Lock.owner()), "wei");
    console.log("Lock unlocked!");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

