const User = artifacts.require("./User.sol");

contract("User", accounts => {
  it("...user functionalities.", async () => {
    const userInstance = await User.deployed();

    // Calling Accept function
    let book = await userInstance.Book(accounts[0],0,"Kuniamuthur","Ukkadam","Normal",20,"6/9/2020","2:48pm", { from: accounts[0] });
    console.log(book)

    //details
    let details = await userInstance.user.call(accounts[0])
    console.log(details)

    let verifyBook = false
    if(book) verifyBook=true


    assert.equal(verifyBook, true, "User booked for a cab");
    
    //calling endRide function 

    let end = await userInstance.endRideForUser(accounts[0],{from:accounts[0]})
    console.log(end)

    let verifyEnd = false
    if(end) verifyEnd = true

    assert.equal(verifyEnd, true, "User has ended the ride after they reach the destination point");	

  });
});
