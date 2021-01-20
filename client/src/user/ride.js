import React,{Component} from 'react'
import UserContract from "../contracts/User.json";
import DriverContract from '../contracts/Driver.json';
import QkTokenContract from '../contracts/QkToken.json'
import getWeb3 from "../getWeb3";
import {withRouter} from 'react-router-dom'
import Header from '../header'
import { css } from "@emotion/core";
import HashLoader from "react-spinners/HashLoader";
import 'bulma/css/bulma.css'

import "../App.css";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class Accept extends Component{

    
     state = { storageValue: 0, web3: null, accounts: null, userContract: null,driverContract:null,curTime:null,
     user:null,tokenContract:null,userAccepts:null,driverAccepts:null,message:'',both:false,disable:false };

  componentDidMount = async () => {

    
    setInterval(() => {
      this.setState({
        curTime : new Date().toLocaleString()
      })
    }, 1000)


    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const UserNetwork = UserContract.networks[networkId];
      const userInstance = new web3.eth.Contract(
        UserContract.abi,
        UserNetwork && UserNetwork.address,
      );

      const DriverNetwork = DriverContract.networks[networkId];
      const driverInstance = new web3.eth.Contract(
        DriverContract.abi,
        DriverNetwork && DriverNetwork.address,
      );

      const TokenNetwork = QkTokenContract.networks[networkId];
      const tokenInstance = new web3.eth.Contract(
        QkTokenContract.abi,
        TokenNetwork && TokenNetwork.address,
      );

      

      //const accept = await driverInstance.methods.acceptUser(accounts[0]).call()
      //const userAddress = await driverInstance.methods.userAddress(accounts[0]).call()

      const user = await userInstance.methods.user(accounts[0]).call()


      const driverAccepts = await driverInstance.methods.forUser(accounts[0]).call()
      const userAccepts = await userInstance.methods.endRide(accounts[0]).call()
      
      const driverAccepting = await driverInstance.methods.endRide(driverAccepts._driverAddress).call()

      


      console.log(user)

      //let code;
      //let passcode;
      //let nothing;
      //let acc = false
      //if(accept){
      	//   acc = true
        //   code = await driverInstance.methods.driverCode(accounts[0]).call()
         //  passcode = code + ''
         //  nothing = passcode.substr(4,7)

      //}


      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, userContract: userInstance,driverContract:driverInstance,user,
        tokenContract:tokenInstance,userAccepts,driverAccepts });
      //this.runExample
    
      if(driverAccepting && userAccepts){

           this.transferTo()

      }

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  } 

  transferTo = async ()=>{

        const {accounts,driverContract,user,tokenContract,userContract,driverAccepts} = this.state
     //     e.preventDefault()
          console.log(user)
          const fare = user._fare
           await tokenContract.methods.transferFrom(accounts[0],driverAccepts._driverAddress,parseInt(fare)).send({from:accounts[0]})
          this.props.history.push('/user/feedback')

  }

  change = e=>{
           this.setState({...this.state,[e.target.name]:e.target.value})
          


  }

   endRide = async e=>{
          const {accounts,driverContract,user,tokenContract,userContract,driverAccepts} = this.state
   	      e.preventDefault()
          await userContract.methods.endRideForUser(accounts[0]).send({from:accounts[0]})
          this.setState({disable:true})
           const driversAccepts = await driverContract.methods.endRide(driverAccepts._driverAddress).call()
           const userAccepts = await userContract.methods.endRide(accounts[0]).call()

           const fare = user._fare
   	      if(driversAccepts){
                 if(userAccepts){
                 
                 //await tokenContract.methods.transferFrom(accounts[0],driverAccepts._driverAddress,parseInt(fare)).send({from:accounts[0]})
                
                //  await driverContract.methods.startRideForDriver(accounts[0],user._userAddress)
                  this.setState({message:'',both:true})
                 // this.props.history.push('/user/feedback')
              }
   	      }else{
   	      	      this.setState({message:'Driver didn\'t say the ride is finished'})
   	      }
   }


     render(){

     	if(this.state.user){
              
                return (
                                              <>
                                             <Header who="driver"/>
                          
                                                  <div style={{marginTop:'30px'}} class="box">
  <article class="media">
    <div class="media-left">
      <figure class="image is-64x64">
        <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image"/>
      </figure>
    </div>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>{this.state.driverAccepts._driverAddress}</strong> <small>Booked_at:{this.state.user._date}</small> <small>Fare:<strong>{this.state.user._fare}</strong></small>
          <br/>
          Pickup:{this.state.user._pickUp} <strong>|</strong> Drop:{this.state.user._drop}
          <br/>
          Cartype:{this.state.user._carType}
        </p>
      </div>
      <nav class="level is-mobile">
        <div class="level-left">
          <a class="level-item" aria-label="reply">
            <span class="icon is-small">
              <i class="fas fa-reply" aria-hidden="true"></i>
            </span>
          </a>
          <a class="level-item" aria-label="retweet">
            <span class="icon is-small">
              <i class="fas fa-retweet" aria-hidden="true"></i>
            </span>
          </a>
          <a class="level-item" aria-label="like">
            <span class="icon is-small">
              <i class="fas fa-heart" aria-hidden="true"></i>
            </span>
          </a>
        </div>
      </nav>
    </div>
  </article>
</div>


            <div style={{marginTop:'40px',textAlign: 'center'}}>
                             <button disable={this.state.disable} className="button is-link" onClick={this.endRide}>EndRide</button>
            </div>
              

              



                       
                   </>
                	)

     	}

         return(
                        <><div style={{marginTop:'300px'}}><HashLoader css={override} size={150} color={'#123abc'}/></div></>


         	)   

     }
      

}


export default withRouter(Accept)