const QkToken = artifacts.require("./QkToken.sol");

contract("QkToken", accounts => {
  it("...qktoken functionalities.", async () => {
    const tokenInstance = await QkToken.deployed();

    // Showing token name,symbol,totalSupply Accept function
    const name = await tokenInstance.name.call()
    assert.equal(name, "Qkee Token", "The name is correct");

    const symbol = await tokenInstance.symbol.call()
    assert.equal(symbol, "QK", "The symbol is correct");

    const total = await tokenInstance.totalSupply.call()
    assert.equal(total,210000,"The totalSupply is correct")

    let currBal = await tokenInstance.balanceOf.call(accounts[1])
    console.log(currBal)

    //buying tokens
    await tokenInstance.transfer(accounts[1],30,{from:accounts[1]})

    let bal = await tokenInstance.balanceOf.call(accounts[1])
    console.log(bal)


    let verifyBal = false
    if(bal>0) verifyBal = true


    assert.equal(verifyBal, true, "Successfully buyed some tokens");
    
    //transferring tokens from one account to another 

    let currBalFrom = await tokenInstance.balanceOf.call(accounts[1])
    console.log(currBalFrom)

    let currBalTo = await tokenInstance.balanceOf.call(accounts[2])
    console.log(currBalTo)

    await tokenInstance.transferFrom(accounts[1],accounts[2],10,{from:accounts[1]})

    let BalFrom = await tokenInstance.balanceOf.call(accounts[1])
    console.log(BalFrom)

    let BalTo = await tokenInstance.balanceOf.call(accounts[2])
    console.log(BalTo)

    let verifyBalTwo = false
    if(BalTo>0) verifyBalTwo = true

    assert.equal(verifyBalTwo, true, "Successfully transferred tokens from one account to another account");	

  });
});
