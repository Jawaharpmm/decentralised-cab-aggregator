pragma solidity >=0.6.2;
pragma experimental ABIEncoderV2;

contract User{
	
     struct Users{
        address _userAddress;
        uint _distanceTravelled;
        string _pickUp;
        string _drop;
        string _carType;
        uint _fare;
        string _date;
        string _time;
    }

    event ForUser(Users _users);
    
    mapping(address => bool) public startRide;
    mapping(address => bool) public endRide;

    mapping(address => Users) public user;
    mapping(address => bool) public acceptUser;
    mapping(uint=>Users) public totalUser;
    uint256 public totCount=0;

    function Book(address _user,uint _distanceTravelled,string memory _pickUp,string memory _drop,string memory _carType,uint _fare,string memory _date,string memory _time) public {
                       user[_user] = Users(_user,_distanceTravelled,_pickUp,_drop,_carType,_fare,_date,_time);
                       totCount++;
                       endRide[_user] = false;
                       totalUser[totCount] = Users(_user,_distanceTravelled,_pickUp,_drop,_carType,_fare,_date,_time);
                       acceptUser[_user] = false;
                       emit ForUser(user[_user]);
    }




   function endRideForUser(address _user) public{
               endRide[_user] = true;
   }

}