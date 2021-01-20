const RiderReg = artifacts.require("./RiderReg.sol");

contract("RiderReg", accounts => {
  it("...user registration.", async () => {
    const userInstance = await RiderReg.deployed();

    // Calling Register function
    let user = await userInstance.rider(accounts[0],"Jack","4312 3456 1230 1123","9912435810", { from: accounts[0] });
    console.log(user)

    //details
    let details = await userInstance.user.call(accounts[0])
    console.log(details)

    let verifyUser = false
    if(user) verifyUser=true


    assert.equal(verifyUser, true, "User successfully registered");
    	

  });
});
