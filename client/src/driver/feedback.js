import React,{Component} from 'react'
import 'bulma/css/bulma.css'
import ecoinContract from "../contracts/ecoin.json";
import getWeb3 from "../getWeb3";
import {withRouter,Link} from "react-router-dom";
import QkTokenContract from '../contracts/QkToken.json';
import DriverContract from '../contracts/Driver.json';

import { css } from "@emotion/core";
import HashLoader from "react-spinners/HashLoader";

import Spacer from '../Spacer'

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


class FeedBack extends Component{


    state = {web3:null,accounts:null,distance:56,rating:"0",point:"100",ecoin:null,token:null,driver:null};



    componentDidMount = async () => {
  
  
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();
        
        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();
  
        // Get the contract instance.
      	const networkId = await web3.eth.net.getId();
      	const ecoinNetwork = ecoinContract.networks[networkId];
      	const ecoinInstance = new web3.eth.Contract(
        	ecoinContract.abi,
        	ecoinNetwork && ecoinNetwork.address,
        );

        const TokenNetwork = QkTokenContract.networks[networkId];
      const tokenInstance = new web3.eth.Contract(
        QkTokenContract.abi,
        TokenNetwork && TokenNetwork.address,
      );

      const DriverNetwork = DriverContract.networks[networkId];
      const driverInstance = new web3.eth.Contract(
        DriverContract.abi,
        DriverNetwork && DriverNetwork.address,
      );

        this.setState({ web3, accounts, ecoin:ecoinInstance,token:tokenInstance,driver:driverInstance});
        //this.runExample
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }
    };

    change = e=>{
      this.setState({...this.state,[e.target.name]:e.target.value})
}

submit = async e=>{
  e.preventDefault()
  const {accounts,ecoin,distance,rating,point,token,driver} = this.state
  let address = await driver.methods.userAddress(accounts[0]).call();
  let upoint = await ecoin.methods.userpoint(address).call();
  let res = await ecoin.methods.rider(address,parseInt(distance),parseInt(rating),upoint).send({from:accounts[0]});
  let upt = await ecoin.methods.userpoint(address).call();
  console.log(ecoin);
  
  // let res1 = res[1] + parseInt(point);
  // this.setState({point:res1});
  
  this.props.history.push("/driver");
  } 

     render(){


       if (!this.state.web3) {
      return <div style={{marginTop:'300px'}}><HashLoader css={override} size={150} color={'#123abc'}/></div>;
    }

     	return(
                
                <>

                <h1 style={{textAlign:'center'}} className="title is-1">FeedBack</h1>
                   <br/>
                 <h2 style={{textAlign:'center'}} className="title is-3">This is for imporvement of the ride</h2>


                               <form onSubmit={this.submit} style={{textAlign: 'center'}}>
                 <div style={{marginTop:'30px'}} class="field">
  <label class="label">UserName</label>
  <div class="control">
    <input style={{width:'300px'}} class="input" type="text" placeholder="Username"/>
  </div>
</div>

<div class="field">
  <label class="label">Location</label>
  <div class="control has-icons-left has-icons-right">
    <input style={{width:'300px'}} class="input is-success" type="text" placeholder="Your Location"/>
    <span class="icon is-small is-left">
      <i style={{marginLeft:'1200px'}} class="fas fa-user"></i>
    </span>
    <span class="icon is-small is-right">
      <i style={{marginRight:'1200px'}} class="fas fa-check"></i>
    </span>
  </div>
</div>

<div class="field">
  <label class="label">Email</label>
  <div class="control has-icons-left has-icons-right">
    <input style={{width:'300px'}} class="input is-danger" type="email" placeholder="Email input"/>
    <span class="icon is-small is-left">
      <i style={{marginLeft:'1200px'}} class="fas fa-envelope"></i>
    </span>

  </div>
</div>

<div class="field">
  <label class="label">How was the Ride?</label>
  <div class="control">
    <div class="select">
      <select name="rating" value={this.state.rating} onChange={this.change}>
        <option>Select your rating</option>
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>
    </div>
  </div>
</div>

<div class="field">
  <label class="label">Any Message that you want to convey</label>
  <div class="control">
    <textarea style={{width:'400px'}} class="textarea" placeholder="Message"></textarea>
  </div>
</div>



<div class="field is-grouped" style={{marginLeft:'670px'}}>
  <div class="control">
    <button style={{marginLeft:'25px'}} className="button is-link" type = "submit">submit</button>
  </div>
</div>
</form>
<Spacer />
                </>

     		)
     }

}

export default withRouter(FeedBack)