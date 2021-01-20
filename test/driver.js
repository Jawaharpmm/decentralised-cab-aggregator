const Driver = artifacts.require("./Driver.sol");

contract("Driver", accounts => {
  it("...driver functionalities.", async () => {
    const driverInstance = await Driver.deployed();

    // Calling Accept function
    let accept = await driverInstance.Accept(accounts[0],0,accounts[1],"Kuniamuthur","6/9/2020","2:48pm","6/9/2020,2:30pm", { from: accounts[0] });
    console.log(accept)

    //details
    let details = await driverInstance.driver.call(accounts[0])
    console.log(details)

    let verifyAccept = false
    if(accept) verifyAccept=true


    assert.equal(verifyAccept, true, "Driver accepted the user and code is generated");

    //Calling startRide function
 
    let start = await driverInstance.startRideForDriver(accounts[0],accounts[1],{from:accounts[0]})
    console.log(start)

    let verifyStart = false
    if(start) verifyStart = true

    assert.equal(verifyStart, true, "Driver and user started the ride after code verification");
    
    //calling endRide function 

    let end = await driverInstance.endRideForDriver(accounts[0],accounts[1],20,"Kuniamuthur","Ukkadam","Normal","9/8/20,4:52pm",{from:accounts[0]})
    console.log(end)

    let verifyEnd = false
    if(end) verifyEnd = true

    assert.equal(verifyEnd, true, "Driver has ended the ride after they reach the destination point");	

  });
});
