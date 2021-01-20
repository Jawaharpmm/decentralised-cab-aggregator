import React,{Component} from 'react'
import UserContract from "../contracts/User.json";
import DriverContract from '../contracts/Driver.json';
import getWeb3 from "../getWeb3";
import {withRouter} from 'react-router-dom'
import Header from '../header'
import { css } from "@emotion/core";
import HashLoader from "react-spinners/HashLoader";
import 'bulma/css/bulma.css'

import Spacer from '../Spacer'

import "../App.css";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class Accept extends Component{

    
     state = { storageValue: 0, web3: null, accounts: null, userContract: null,driverContract:null,curTime:null,code:'',userCode:'',start:'',user:null,
     message:'',butShow:false };

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

      //const accept = await driverInstance.methods.acceptUser(accounts[0]).call()
      const userAddress = await driverInstance.methods.userAddress(accounts[0]).call()

      const user = await userInstance.methods.user(userAddress).call()

      console.log(user)

      let code;
      let passcode;
      let nothing;
      //let acc = false
      //if(accept){
      	//   acc = true
           code = await driverInstance.methods.driverCode(accounts[0]).call()
           passcode = code + ''
           nothing = passcode.substr(4,7)

      //}


      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, userContract: userInstance,driverContract:driverInstance,code:passcode,userCode:nothing,user });
      //this.runExample
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  } 

  change = e=>{
           this.setState({...this.state,[e.target.name]:e.target.value})

  }

   startRide = async e=>{
          
   	      e.preventDefault()
   	      const {start,code} = this.state
   	      if(start===code){
                  
                  this.setState({start:'',message:'',butShow:true})
                  

   	      }else{
   	      	      this.setState({start:'',message:'Code is not VALID',butShow:false})
   	      }
   }

   pleaseStart =async e=>{
                const {accounts,driverContract,user} = this.state
                console.log(user._userAddress)
                await driverContract.methods.startRideForDriver(accounts[0],user._userAddress).send({from:accounts[0]})
                this.props.history.push('/driver/ride')
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
          <strong>{this.state.user._userAddress}</strong> <small>Booked_at:{this.state.user._date}</small> <small>Fare:<strong>{this.state.user._fare}</strong></small>
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


            <div style={{marginTop:'30px'}}>

              <h1 className="title is-1" style={{textAlign:'center'}}>{this.state.userCode}</h1>
              <div style={{textAlign:'center',marginTop:'30px'}}>
                          <p>The code given above should be entered to the input field with <strong>Customer's</strong> code</p>
                          <br/>
                          <p>The order is <strong>Customer's code + Your code</strong></p>
                          <br />
                          <p>This is for <strong>Verification</strong></p>
                          <br/>
                          <p>The ride will start only if entered code is <strong>VALID</strong></p>
                          <p>There will be a button if entered code is valid to start the ride</p>
              </div>  

              <form style={{marginTop:'30px',textAlign:'center'}} onSubmit={this.startRide}>
                        

    <div class="field">
  <label class="label">Enter the code</label>
  <div class="control">
    <input class="input is-success" type="text" style={{width:'300px'}} placeholder="1234567" value={this.state.start} name="start" onChange={this.change}/>
  </div>
</div>
           <button className="button is-success">Enter the code</button>

              </form>

              {this.state.butShow && (
                <div style={{textAlign: 'center',marginTop: '30px'}}>
                          <button className="button is-link" onClick={this.pleaseStart}>startRide</button>
                </div>
                )}


              {this.state.message && (
                            <div style={{marginTop:'30px'}} class="notification is-link">
                                              {this.state.message}
                                </div>
              	)}

            </div>

            <Spacer />
                       
                   </>
                	)

     	}

         return(
                        <><div style={{marginTop:'300px'}}><HashLoader css={override} size={150} color={'#123abc'}/></div></>


         	)   

     }
      

}


export default withRouter(Accept)