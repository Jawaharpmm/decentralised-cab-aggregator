import React, { Component } from "react";
import UserContract from "./contracts/User.json";
import DriverContract from './contracts/Driver.json';
import QkTokenContract from './contracts/QkToken.json'
import {withRouter} from "react-router-dom"
import getWeb3 from "./getWeb3";

import { css } from "@emotion/core";
import HashLoader from "react-spinners/HashLoader";
import 'bulma/css/bulma.css'

import Header from './header'

import "./App.css";


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class BuyQk extends Component{

     state = {web3: null,tokenContract: null,accounts:null,balance: null,value:''}

     componentDidMount = async ()=>{

           try{

           	const web3 = await getWeb3();
      //const acc = await portis.widget
      //console.log(acc.communication.showBitcoinWallet("m/49'/0'/0'/0/0").then(val=>console.log(val)))
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const TokenNetwork = QkTokenContract.networks[networkId];
      const tokenInstance = new web3.eth.Contract(
        QkTokenContract.abi,
        TokenNetwork && TokenNetwork.address,
      );

      const balance = await tokenInstance.methods.balanceOf(accounts[0]).call()

      this.setState({web3,accounts,balance,tokenContract: tokenInstance,amount:''})

           }catch(e){
           	alert('Some error || No web3 Provider')
           	console.log(e)
           }
       
     }

     change = e=>{
     	this.setState({...this.state,[e.target.name]:e.target.value})
     }

     buyTokens =async e=>{
     	e.preventDefault()
        const {accounts,tokenContract,value} = this.state
        await tokenContract.methods.transfer(accounts[0],parseInt(value)).send({from:accounts[0],value:'1000000000'}) 
        this.setState({...this.state,value:''})
     }

     render(){

     	console.log(this.props.history)

          if(!this.state.web3){

               return (
                      <div style={{marginTop:'300px'}}><HashLoader css={override} size={150} color={'#123abc'}/></div>
               	)

          }

          return (

               <>
                    
                       <div style={{marginTop:'40px',textAlign: 'center'}}>
                            <h1 className="title is-1">Your address is {this.state.accounts[0]}</h1>
                            <h1 className="title is-3">Your balance is {this.state.balance}</h1>
                       </div>

                        <form style={{marginTop: '30px',textAlign: 'center'}} onSubmit={this.buyTokens}>

                        <div class="field">
  <div class="control has-icons-left has-icons-right">
    <input name="value" value={this.state.value} onChange={this.change} class="input is-large" type="text" placeholder="Large"/>
    <span class="icon is-medium is-left">
      <i class="fas fa-bandcamp fa-lg"></i>
    </span>
    <span class="icon is-medium is-right">
      <i class="fas fa-check fa-lg"></i>
    </span>
  </div>
</div>

                         <div class="field is-grouped is-grouped-centered">
  <p class="control">
    <button type="submit" class="button is-primary">
      BuyQk
    </button>
  </p>
  
</div>

                        </form>
                <div class="field is-grouped is-grouped-centered">
                 <p class="control">
    <button onClick={()=>this.props.history.goBack()} class="button is-light">
      Cancel
    </button>
  </p>
</div>
               </>
                     
          )

     }

}

export default withRouter(BuyQk)