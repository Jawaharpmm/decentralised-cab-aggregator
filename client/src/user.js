import React, { Component } from "react";
import UserContract from "./contracts/User.json";
import DriverContract from './contracts/Driver.json';
import QkTokenContract from './contracts/QkToken.json'
import {withRouter,Link} from "react-router-dom"
import getWeb3 from "./getWeb3";
import userContract from './contracts/RiderReg.json';
import ecoinContract from "./contracts/ecoin.json";

import { css } from "@emotion/core";
import HashLoader from "react-spinners/HashLoader";
import 'bulma/css/bulma.css'

import Header from './header'

import Spacer from './Spacer'

import "./App.css";


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


class User extends Component{
       
    state = { storageValue: null, web3: null, accounts: null, userContract: null,driverContract:null,curTime:null,pickup:'',drop:'',
    cartype:'',fare:'',message:'',tokenContract:null,balance:null,registeruser:null,register:null,ecoin:null };

    
    
    reload = ()=>{
        window.location.reload()
    }


   
  
    componentDidMount = async () => {
     
      setInterval(() => {
        this.setState({
          curTime : new Date().toLocaleString()
        })
      }, 1000)


    try {
      
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      //const acc = await portis.widget
      //console.log(acc.communication.showBitcoinWallet("m/49'/0'/0'/0/0").then(val=>console.log(val)))
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const UserNetwork = UserContract.networks[networkId];
      const userInstance = new web3.eth.Contract(
        UserContract.abi,
        UserNetwork && UserNetwork.address,
      );

      console.log(userInstance)

      const TokenNetwork = QkTokenContract.networks[networkId];
      const tokenInstance = new web3.eth.Contract(
        QkTokenContract.abi,
        TokenNetwork && TokenNetwork.address,
      );

      const userNetwork = userContract.networks[networkId];
        	const usersInstance = new web3.eth.Contract(
          	userContract.abi,
          	userNetwork && userNetwork.address,
          );

          let reg = await usersInstance.methods.user(accounts[0]).call();

          console.log(reg.set)

      const balance = await tokenInstance.methods.balanceOf(accounts[0]).call()

      const ecoinNetwork = ecoinContract.networks[networkId];
                  const ecoinInstance = new web3.eth.Contract(
                    ecoinContract.abi,
                    ecoinNetwork && ecoinNetwork.address,
                  );

       let upoint = await ecoinInstance.methods.userpoint(accounts[0]).call();   

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, userContract: userInstance,balance,tokenContract:tokenInstance,
        registeruser:usersInstance,register:reg.set,storageValue:upoint });
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

    console.log(accounts)
    // Stores a given value, 5 by default.
    await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response });
  };


   change = e=>{
           this.setState({...this.state,[e.target.name]:e.target.value})
   }

   fareChange = ()=>{
             const {pickup,drop,cartype} = this.state
             if(pickup==="Kuniamuthur"){
                     if(drop==="Ukkadam" || drop==="Valparai" || drop==="Mailkal"){
                                     this.setState({...this.state,fare:'20'})
                     }
             }else if(pickup==="Ukkadam"){
                            if(drop==="Kuniamuthur" || drop==="Valparai" || drop==="Mailkal"){
                                     this.setState({...this.state,fare:'32'})
                           }
             }else if(pickup==="Valparai"){
                           if(drop==="Kuniamuthur" || drop==="Ukkadam" || drop==="Mailkal"){
                                     this.setState({...this.state,fare:'25'})
                           }
             }else if(pickup==="Mailkal"){
                         if(drop==="Kuniamuthur" || drop==="Ukkadam" || drop==="Valparai"){
                                     this.setState({...this.state,fare:'50'})
                           }
             }
   }


   bookCab = async e=>{
    e.preventDefault()
    const {accounts,userContract,pickup,drop,fare,cartype,curTime,balance,register} = this.state
    console.log(balance,fare)
    
    if(parseInt(balance)<=parseInt(fare) && !register){
            this.setState({...this.state,message:'Please REGISTER and BUY tokens to book'})
    }
    if(!register){
         this.setState({...this.state,message:'As a user you have not registered.So please REGISTER to book the ride'})
    }
    if(parseInt(balance)<=parseInt(fare)){
               this.setState({...this.state,message:'Insufficient amount of Tokens.Please BUY the tokens'})
    }
    if(register && parseInt(balance)>parseInt(fare)){

    await userContract.methods.Book(accounts[0],0,pickup,drop,cartype,parseInt(fare),curTime,curTime).send({from:accounts[0]})
    this.setState({...this.state,message:''})
   this.props.history.push('/user/book')
     }
   }


  render() {
    console.log(this.state.register);
    if (!this.state.web3) {
        
      return <div style={{marginTop:'300px'}}><HashLoader css={override} size={150} color={'#123abc'}/></div>;
    }
    return (
      <>
      <div className="App">
        <Header who="user"/>

<h1 className="title is-1 mt-3">Customer Page</h1>

<h1 class="title is-4" style={{textAlign:'center'}}>Balance of token is :{this.state.balance}QK</h1>

{this.state.register ?null: (
  <p class="title is-4" style={{textAlign:'center'}}>Register Here  <Link className="button is-link" to="/user/register">Register</Link></p>
)}

<p>Want to buy some tokens <Link className="button is-link" to="/buy">Buy QK</Link></p>

<div class="columns mt-3 has-text-white">
  <div class="column" style={{backgroundColor:'hsl(171, 100%, 41%)',marginLeft:'20px'}}>
    Current Time:{this.state.curTime}
  </div>
  <div class="column" style={{backgroundColor:'hsl(171, 100%, 41%)',marginLeft:'20px'}}>
    Distance Travelled:17km
  </div>
  <div class="column" style={{backgroundColor:'hsl(171, 100%, 41%)',marginLeft:'20px'}}>
    {this.state.accounts}
    
    
  </div>
  <div class="column" style={{backgroundColor:'hsl(171, 100%, 41%)',marginLeft:'20px'}}>
  Cutomer Value Point: {this.state.storageValue}
  </div>
</div>
   

   <form onSubmit={this.bookCab}>
    <div className="container" style={{marginTop:'40px'}}>
      
       
    <div class="field">
  <label class="label">Pickup Location</label>
  <div class="select is-rounded">
  <select name="pickup" value={this.state.pickup} onChange={this.change}>
    <option>Select Some Pickup</option>
    <option>Kuniamuthur</option>
    <option>Ukkadam</option>
    <option>Valparai</option>
    <option>Mailkal</option>
  </select>
</div>
</div>

<div class="field">
  <label class="label">Drop Location</label>
  <div class="select is-rounded">
  <select name="drop" value={this.state.drop} onChange={this.change}>
    <option>Select Some Drop</option>
    <option>Kuniamuthur</option>
    <option>Ukkadam</option>
    <option>Valparai</option>
    <option>Mailkal</option>
  </select>
</div>
</div>

<div class="field">
  <label class="label">Car Type</label>
  <div class="select is-rounded">
  <select name="cartype" value={this.state.cartype} onChange={this.change}>
    <option>Select Some carType</option>
    <option>Normal</option>
    <option>Medium</option>
    <option>Luxury</option>
  </select>
</div>
</div>

<div class="field">
  <label class="label">Fare</label>
  <div class="control">
       <h3 className="input" onMouseMove={this.fareChange} style={{width:'300px'}}>{this.state.fare}QK</h3>
  </div>
</div>



<div class="field is-grouped is-grouped-centered">
  <div class="control">
    <button type="submit" class="button is-link">Book/Find</button>
  </div>
</div>

            
      </div>    
        </form>
        
        {this.state.message && (
                
                <div style={{marginTop:'30px'}} class="notification is-link">
                                              {this.state.message}
                                </div>
                
          )}

      </div>
      <Spacer />
      </>
    );
  }

}

export default withRouter(User)