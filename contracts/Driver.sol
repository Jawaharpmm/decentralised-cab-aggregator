pragma solidity >=0.6.2;
pragma experimental ABIEncoderV2;


contract Driver{
	
      struct Drivers{
         address _driverAddress;
         uint _distanceTravelled;
        string location;
        string _date;
        string _time;
   }

   struct Show{
            address _user;
            address _driver;
            uint _fare;
            string _pickup;
            string _drop;
            string _carType;
            string _date;
   }
   
   mapping(address => Drivers) public driver;
   mapping(address => bool) public acceptUser;
   mapping(address => Drivers) public forUser;
   mapping(address => uint256) public driverCode;
   mapping(address => uint256) public userCode;
   mapping(address => address) public userAddress;
   mapping(address => bool) public startRide;
   mapping(address => bool) public endRide;
   mapping(address => bool) public startRideUser;
   mapping(string => bool) public UserUI;
   mapping(address => Show[]) public showUser;
   mapping(address => Show[]) public showDriver;



   event ForDriver(Drivers _driver);

   uint256 public someCode;

   uint256 public totalCount=0;

   function Accept(address _driverAddress,uint _distanceTravelled,address _user,string memory _location,string memory _date,string memory _time,string memory userTime) public returns(uint256){
               driver[_driverAddress] = Drivers(_driverAddress,_distanceTravelled,_location,_date,_time);
               forUser[_user] = Drivers(_driverAddress,_distanceTravelled,_location,_date,_time);
               acceptUser[_user] = true;
               emit ForDriver(driver[_driverAddress]);
               userAddress[_driverAddress] = _user;
               someCode =  Passcode();
               UserUI[userTime] = true;
               totalCount++;
               driverCode[_driverAddress] = someCode;
               userCode[_user] = someCode;
               return someCode;
   }
   

   function Passcode() public view returns(uint256) {
         return uint(keccak256(abi.encodePacked(
            now, 
            block.difficulty, 
            msg.sender)
        )) % 10000000;
   }

   
function startRideForDriver(address _driver,address _user) public{
                 endRide[_driver] = false;
                 startRide[_driver] = true;
                 startRideUser[_user] = true;

   }

   function endRideForDriver(address _driver,address _user,uint _fare,string memory _pickup,string memory _drop,string memory _carType,string memory _date) public{
               endRide[_driver] = true;
               acceptUser[_user] = false;
               startRideUser[_user] = false;
               //rideFinished[_time] = true;
               showUser[_user].push(Show(_user,_driver,_fare,_pickup,_drop,_carType,_date));
               showDriver[_driver].push(Show(_user,_driver,_fare,_pickup,_drop,_carType,_date));


   }

   function returnDriver(address _driver) public view returns(Show[] memory){

        return showDriver[_driver];

   }

      function returnUser(address _user) public view returns(Show[] memory){

        return showUser[_user];

   }


}