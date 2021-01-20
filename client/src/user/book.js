import React,{Component} from 'react'
import UserContract from "../contracts/User.json";
import DriverContract from '../contracts/Driver.json';
import getWeb3 from "../getWeb3";
import {withRouter} from 'react-router-dom'

import Spacer from '../Spacer'

import Header from '../header'
import { css } from "@emotion/core";
import HashLoader from "react-spinners/ClockLoader";
import 'bulma/css/bulma.css'

import "../App.css";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class Book extends Component{

      
       state = { storageValue: 0, web3: null, accounts: null, userContract: null,driverContract:null,curTime:null,code:'',userCode:'',accept:false,driver:null,
       rideStart:null };

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

      const accept = await driverInstance.methods.acceptUser(accounts[0]).call()

      const driver= await driverInstance.methods.forUser(accounts[0]).call()

      const rideStart = await driverInstance.methods.startRideUser(accounts[0]).call()

      console.log(rideStart)

      

      //console.log(driver.map(d=>console.log(d.location)))

      let code;
      let passcode;
      let nothing;
      let acc = false
      if(accept){
      	   acc = true
           code = await driverInstance.methods.userCode(accounts[0]).call()
           passcode = code + ''
           nothing = passcode.substr(0,4)

      }


      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, userContract: userInstance,driverContract:driverInstance,code:passcode,userCode:nothing,accept:acc,driver,rideStart });
      //this.runExample
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  } 
     

     render(){

     	if(!this.state.accept && !this.state.driver){


         return(
                   <>
                       <h1 style={{textAlign:'center',marginTop:'200px'}} className="title is-3">Wait for some time<br/>Until a Driver accepts </h1>
                       <div style={{marginTop:'70px'}}><HashLoader css={override} size={150} color={'#36D7B7'}/></div>  
                   </>
         	)   
          }
          return (
                    <>
                    <Header who="user"/>
                        {
                         this.state.driver && (

                                  <div className="box" style={{marginTop:'30px'}}>
  <article class="media">
    <div class="media-left">
      <figure class="image is-64x64">
        <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image"/>
      </figure>
    </div>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>{this.state.driver._driverAddress}</strong> <small>Accepted_at:{this.state.driver._time}</small> <small>Approximate Time Arrival:2m</small>
          <br/>
          From:{this.state.driver.location}
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


                         	)

                        }
                           


                          <div style={{marginTop:'30px'}}>
                                               
                                    <h1 className="title is-1" style={{textAlign:'center'}}>{this.state.userCode}</h1>
                                    <div style={{marginTop:'30px',textAlign:'center'}}>
                                              <p class="is-3">The code given above should be delivered to the <strong>Driver</strong></p>
                                              <br/>
                                              <p>This is for <strong>Verification</strong> purpose</p>
                                              <br/>
                                              <p>The ride will start only if the given code is <strong>Valid</strong></p>
                                              <p>If the code is valid then the there will be a button saying startRide</p>
                                              <p>Click that button to get start your ride</p>
                                    </div>
                          </div>

                          <div style={{marginTop:'30px',textAlign:'center'}}>
                                    {this.state.rideStart && (
                                         <button className="button is-link" onClick={()=>this.props.history.push('/user/ride')}>startRide</button>
                                      )}
                          </div>
                          <Spacer />
                    </>
          	)
     }
      

}

export default withRouter(Book)