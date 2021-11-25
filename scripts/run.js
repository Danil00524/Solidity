const main = async () => {
    // ==== Deploying contract ====
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const youtubeContractFactory = await hre.ethers.getContractFactory('YoutubePortal');
    const youtubeContract = await youtubeContractFactory.deploy();
    await youtubeContract.deployed();

    console.log("Contract deployed to:", youtubeContract.address);
    console.log("Contract deployed by:", owner.address);

    // ==== Updating store ====
    await youtubeContract.getTotalVideoShares();
    const youtubeOwnerTxn = await youtubeContract.shareVideo();
    await youtubeOwnerTxn.wait();

    await youtubeContract.getTotalVideoShares();
    const youtubeRandomPersonTxn = await youtubeContract.connect(randomPerson).shareVideo();
    await youtubeRandomPersonTxn.wait();

    await youtubeContract.getTotalVideoShares();
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();
