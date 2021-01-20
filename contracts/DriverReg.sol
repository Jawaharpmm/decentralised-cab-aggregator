pragma solidity >= 0.6.2;
pragma experimental ABIEncoderV2;

contract DriverReg{
    struct Driver {
    address id;
    string name;
    string phn_num;
    string aadhaar;
    string usertype;
    string license;
    string rc_book;
    string insurance;
    string role;
    bool set;
  }
  mapping (address => Driver) public drivers;
  event driverRegistered(Driver driver);

  
  function driver(address _id,string memory _name,string memory _aadhaar,string memory _license,string memory _rc_book,string memory _insurance,string memory _phn_num) public returns(bool) {
        drivers[_id] = Driver({
        id: _id,
        name: _name,
        aadhaar:_aadhaar,
        usertype: "Driver",
        license: _license,
        rc_book: _rc_book,
        insurance: _insurance,
        role:"DRIVER",
        phn_num: _phn_num,
        set: true
    });
    emit driverRegistered(drivers[_id]);
    return true;
  }
} 