pragma solidity >=0.6.2;
contract ecoin{
    // address public minter;
    //mapping (address => uint256) public token;

    mapping(address => uint256) public freeride1;
    mapping(address => uint256) public userpoint;
    mapping(address => uint256) public driverpoint;
    mapping(address => uint256) public driverRewards;


    uint256 balances1 = 0;
    uint256 freeride = 0;
    uint256 balances = 0;
      
    function driver (address reciever, uint256 km, uint256 rating,uint256 points) public returns(uint256){

        uint256 p = 0;
        
       if (rating > 0){
           if(km <= 5){ 
               require(rating < 6,"error");
               if(rating == 3){
                   balances += 1;
               }
               else if(rating == 4){
                   balances += 2;
               }
               else if (rating == 5){
                   balances += 3;
               }
              
           }
           if(km > 5 && km <= 15){ 
           require(rating < 6,"error");
               if(rating == 3){
                   balances += 2;
               }
               else if(rating == 4){
                   balances += 3;
               }
               else if (rating == 5){
                   balances += 4;
               }
             
           }
            if (km > 15 && km <= 50){ 
            require(rating < 6,"error");
                  if(rating == 3){
                   balances += 3;
               }
               else if(rating == 4){
                   balances += 4;
               }
               else if (rating == 5){
                   balances += 5;
               }
              
            }
           if (km > 50 && km <= 100){
               
               require(rating < 6,"error");
               balances += 180;
           }
           if (km > 100){
               require(rating < 6,"error");
               require(km > 100,"our execuitve will contact you");
           }
           p = points + balances;
           driverpoint[reciever] = p;
       }
       

        return p;
       
        
    }

    
    function rider (address reciever1, uint256 km1, uint256 rating1,uint256 points) public returns(uint256){
          
        
       if (rating1 > 0){
           if(km1 <= 5){ 
           require(rating1 < 6,"error");
               if(rating1 == 3){
                   balances1 += 1;
               }
               else if(rating1 == 4){
                   balances1 += 2;
               }
               else if (rating1 == 5){
                   balances1 += 3;
               }
              
           }
           if(km1 > 5 && km1 <= 15){ 
           require(rating1 < 6,"error");
               if(rating1 == 3){
                   balances1 += 2;
               }
               else if(rating1 == 4){
                   balances1 += 3;
               }
               else if (rating1 == 5){
                   balances1 += 4;
               }
             
           }
            if (km1 > 15 && km1 <= 50){ 
            require(rating1 < 6,"error");
                  if(rating1 == 3){
                   balances1 += 3;
               }
               else if(rating1 == 4){
                   balances1 += 4;
               }
               else if (rating1 == 5){
                   balances1 += 5;
               }
              
            }
           if (km1 > 50){
               require(rating1 < 6,"error");
               
               balances1 += 180;
           }
             if (km1 > 100){
               require(rating1 < 6,"error");
               require(km1 > 100,"our execuitve will contact you");
           }
           points = points + balances1;

           if (points > 0){
            if(points >= 100 && points <= 250){
                freeride += 1;
                freeride1[reciever1] += freeride;
            }
            if(points >= 250 && points <= 500) {
                freeride += 2;
                freeride1[reciever1] += freeride;
            } 
            if(points >= 1000) {
                freeride += 3;
                freeride1[reciever1] += freeride;
            }
                
            }

       }
        userpoint[reciever1] = points;
        return points;
        
    }
    
    
}