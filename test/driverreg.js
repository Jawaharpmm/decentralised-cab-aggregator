const DriverReg = artifacts.require("./DriverReg.sol");

contract("DriverReg", accounts => {
  it("...driver registration.", async () => {
    const driverInstance = await DriverReg.deployed();

    // Calling Register function
    let driver = await driverInstance.driver(accounts[0],"Kevin","4442 7485 1234 1183","840543232","5546790","409835671","9819445710", { from: accounts[0] });
    console.log(driver)

    //details
    let details = await driverInstance.drivers.call(accounts[0])
    console.log(details)

    let verifyDriver = false
    if(driver) verifyDriver=true


    assert.equal(verifyDriver, true, "Driver successfully registered");
    	

  });
});
