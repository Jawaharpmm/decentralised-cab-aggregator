var User = artifacts.require("./User.sol");
var Driver = artifacts.require("./Driver.sol");
var QkToken = artifacts.require('./QkToken.sol');
var DriverReg = artifacts.require('./DriverReg.sol');
var RiderReg = artifacts.require('./RiderReg.sol');
var ecoin = artifacts.require('./ecoin.sol')
//var SimpleStorage = artifacts.require('./SimpleStorage.sol')

module.exports = function(deployer) {
  deployer.deploy(User);
  deployer.deploy(Driver);
  deployer.deploy(QkToken,210000)
  deployer.deploy(DriverReg)
  deployer.deploy(RiderReg)
  deployer.deploy(ecoin)
  //deployer.deploy(SimpleStorage)
};
