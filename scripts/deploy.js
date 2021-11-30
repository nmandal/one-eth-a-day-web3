const main = async () => {
    const oneLineContractFactory = await hre.ethers.getContractFactory('OneLine');
    const oneLineContract = await oneLineContractFactory.deploy({
      value: hre.ethers.utils.parseEther('0.001'),
    });
  
    await oneLineContract.deployed();
  
    console.log('OneLine address: ', oneLineContract.address);
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
  
  runMain();