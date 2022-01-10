const main = async () => {
    // ==== Deploying contract ====
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const youtubeContractFactory = await hre.ethers.getContractFactory('YoutubePortal');
    const youtubeContract = await youtubeContractFactory.deploy();
    await youtubeContract.deployed();

    console.log("Contract deployed to:", youtubeContract.address);
    console.log("Contract deployed by:", owner.address);

    // ==== Testing ====
    let contractBalance = await hre.ethers.provider.getBalance(
        youtubeContract.address
    );
    console.log(
        'Contract balance:',
        hre.ethers.utils.formatEther(contractBalance)
    );

    let waveTxn = await youtubeContract.shareVideo('A message!');
    await waveTxn.wait();

    /*
     * Get Contract balance to see what happened!
     */
    contractBalance = await hre.ethers.provider.getBalance(youtubeContract.address);
    console.log(
        'Contract balance:',
        hre.ethers.utils.formatEther(contractBalance)
    );

    // await youtubeContract.getTotalVideoShares();
    // const youtubeOwnerTxn = await youtubeContract.shareVideo('A message!');
    // await youtubeOwnerTxn.wait();
    //
    // await youtubeContract.getTotalVideoShares();
    // const youtubeRandomPersonTxn = await youtubeContract.connect(randomPerson).shareVideo('Another message');
    // await youtubeRandomPersonTxn.wait();
    //
    // await youtubeContract.getTotalVideoShares();

    let allSharesInfo = await youtubeContract.getAllSharesInfo();
    console.log(allSharesInfo);
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
