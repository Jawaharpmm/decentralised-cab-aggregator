pragma solidity >= 0.6.2;
pragma experimental ABIEncoderV2;

contract RiderReg{
    struct User {
    address id;
    string name;
    string phn_num;
    string aadhaar;
    string usertype;
    string role;
    bool set;
  }
  mapping (address => User) public user;
  event userRegistered(User user);
  
  function rider(address _id,string memory _name,string memory _aadhaar,string memory _phn_num) public returns(bool) {
        user[_id] = User({
        id: _id,
        name: _name,
        aadhaar:_aadhaar,
        usertype: "Rider",
        phn_num: _phn_num,
        role:"USER",
        set: true
    });
    emit userRegistered(user[_id]);
    return true;
  }
  } 