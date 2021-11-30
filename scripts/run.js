const main = async () => {
    const oneLineContractFactory = await hre.ethers.getContractFactory('OneLine');
    const oneLineContract = await oneLineContractFactory.deploy({
        value: hre.ethers.utils.parseEther('0.1'),
    });
    await oneLineContract.deployed();
    console.log("Contract deployed to:", oneLineContract.address);

    let contractBalance = await hre.ethers.provider.getBalance(
        oneLineContract.address
    );
    console.log('Contract balance:', hre.ethers.utils.formatEther(contractBalance));

    let entryCount;
    entryCount = await oneLineContract.getTotalEntries();
    console.log(entryCount.toNumber());

    let entryTxn = await oneLineContract.createEntry('Hello from Nick!');
    await entryTxn.wait();

    contractBalance = await hre.ethers.provider.getBalance(oneLineContract.address);
    console.log('Contract balance:', hre.ethers.utils.formatEther(contractBalance));

    const [_, randomPerson] = await hre.ethers.getSigners();
    entryTxn = await oneLineContract.connect(randomPerson).createEntry('Hello from me!');
    await entryTxn.wait();

    let allEntries = await oneLineContract.getAllEntries();
    console.log(allEntries);
  };
  
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