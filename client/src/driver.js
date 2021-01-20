import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
import {withRouter,Link} from 'react-router-dom'
import UserContract from "./contracts/User.json";
import DriverContract from './contracts/Driver.json';
import QkTokenContract from './contracts/QkToken.json'
import { css } from "@emotion/core";
import HashLoader from "react-spinners/HashLoader";
import driverContract from './contracts/DriverReg.json';
import 'bulma/css/bulma.css'

import ecoinContract from "./contracts/ecoin.json";

import Header from './header'

import Spacer from './Spacer'

import "./App.css";


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class Driver extends Component{
       
    state = { storageValue: null, web3: null, accounts: null, userContract: null,driverContract:null,tokenContract:null,curTime:null,
      ar:[],time:[],balance:null,registeruser:null,register:null,ecoin:null,message:'' };

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

      const driverNetwork = driverContract.networks[networkId];
        	const driversInstances = new web3.eth.Contract(
          	driverContract.abi,
          	driverNetwork && driverNetwork.address,
          );

      let reg = await driversInstances.methods.drivers(accounts[0]).call();

      //console.log(driverInstance)
      

      const ecoinNetwork = ecoinContract.networks[networkId];
                  const ecoinInstance = new web3.eth.Contract(
                    ecoinContract.abi,
                    ecoinNetwork && ecoinNetwork.address,
                  );

          let upoint = await ecoinInstance.methods.driverpoint(accounts[0]).call();
        

      const balance = await tokenInstance.methods.balanceOf(accounts[0]).call()

      const total = await userInstance.methods.totCount().call()

      const totalUI = await driverInstance.methods.totalCount().call()

      //for(let j=0;j<totalUI;j++){
        //     const date = await driverInstance.methods.dates(j).call()
        //     console.log(date)
      //}

      //const dates = await driverInstance.methods.retDate().call()
      //const len = dates.length
      //console.log(dates,len)

      for(let i=1;i<=total;i++){
              const user = await userInstance.methods.totalUser(i).call()
              const date = user._time
              const userUI = await driverInstance.methods.UserUI(date).call()
              //const res = dates.find(t=>t===date)
              //console.log(res)
              // dates.forEach(d=>{
              //        if(d===date){

              //         this.setState({...this.state})

              //        }else{

              //         this.setState({...this.state,ar:[...this.state.ar,user]})

              //        }
                     // console.log('true')  
                      //console.log(date,d)
              //})
              //console.log(date)
              //const userUI = await driverInstance.methods.UserUI(date).call()
              //console.log(userUI)
              //const {time} = this.state
             // const res = time.find(t=>t===date)
              //console.log(res)
              //if(userUI){
                //     this.setState({...this.state})
              //}else{
              if(userUI!==true){
                this.setState({...this.state,ar:[...this.state.ar,user]})
              }
              this.setState({...this.state,ar:[...this.state.ar]})
              //}  
      }

      console.log(this.state.time)

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, userContract: userInstance,driverContract:driverInstance,
        tokenContract: tokenInstance,balance,registeruser:driversInstances,register:reg.set,storageValue:upoint });
      //this.runExample
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response });
  };

   
  acceptUser = async (user,loc,time)=>{
            const {register,accounts,userContract,driverContract,curTime} = this.state

            //const timee = curTime

            

            //this.setState({...this.state,time:[...this.state.time,timee]})

            if(!register){

            this.setState({...this.state,message:'As a driver you have not registered.So please REGISTER to accept the ride'})

            }else{

            await driverContract.methods.Accept(accounts[0],0,user,loc,curTime,curTime,time).send({from:accounts[0]})
            this.setState({...this.state,message:''})
            this.props.history.push('/driver/accept')
              }

   }

  rejectUser = async (user)=>{
         const {ar} = this.state
         
  }


  render() {
      //console.log(this.state.ar)

    if (!this.state.web3) {
      return <div style={{marginTop:'300px'}}><HashLoader css={override} size={150} color={'#123abc'}/></div>;
    }
    return (
      <>
      
      <div className="App">
        <Header who="driver"/>

<h1 className="title is-1 mt-3">Driver Page</h1>

<h1 class="title is-4" style={{textAlign:'center'}}>Balance of token is :{this.state.balance}QK</h1>
{this.state.register ?null: (
  <p class="title is-4" style={{textAlign:'center'}}>Register Here  <Link className="button is-link" to="/driver/register">Register</Link></p>
)}

<p>Want to buy some tokens <Link className="button is-link" to="/buy">Buy QK</Link></p>

<div class="columns mt-3 has-text-white">
  <div class="column is-grouped-centered" style={{backgroundColor:'hsl(171, 100%, 41%)',marginLeft:'20px'}}>
    Current Time:{this.state.curTime}
  </div>
  <div class="column is-grouped-centered" style={{backgroundColor:'hsl(171, 100%, 41%)',marginLeft:'20px'}}>
    Distance Travelled:17km
    <br></br>
    Earning Today:Rs.570
  </div>
  <div class="column is-grouped-centered" style={{backgroundColor:'hsl(171, 100%, 41%)',marginLeft:'20px'}}>
    {this.state.accounts}
  </div>
  <div class="column is-grouped-centered" style={{backgroundColor:'hsl(171, 100%, 41%)',marginLeft:'20px'}}>
  Cutomer Value Point: {this.state.storageValue}
  </div>
</div>

<div className="container" style={{marginTop:'40px'}}>

    <h1 className="title is-1">Customers</h1>
    {this.state.ar.map((u,i)=>(

         

      
       
       
       <div key={i} className="columns has-text-white" style={{marginTop:'30px'}}>
         
        <div className="column has-background-primary">
               <h1 className="title is-5" style={{color:'white'}}>{u._userAddress}</h1>
               <p>Booked_at:{u._time}</p>
               <p>Pickup:{u._pickUp},Drop:{u._drop}</p>
               <p>Fare:{u._fare}QK</p>
       </div>                   

        <div class="column" style={{marginTop:'30px'}}>

        <div class="field is-grouped">
  <div className="control">
    <button onClick={()=>this.acceptUser(u._userAddress,u._pickUp,u._time)} className="button is-link">Accept</button>
  </div>
  <div className="control">
    <button onClick={()=>this.reject(u._userAddress)} className="button is-link is-light">Reject</button>
  </div>
</div>

          </div>        
        {this.state.message && (
                
                <div style={{marginTop:'30px'}} class="notification is-link">
                                              {this.state.message}
                                </div>
                
          )}

       </div>
  
            
      


      ))}    
        </div>  
      </div>
      <Spacer />
      </>
    );
  }

}

export default withRouter(Driver)