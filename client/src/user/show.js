import React,{Component} from 'react'
import 'bulma/css/bulma.css';

import DriverContract from '../contracts/Driver.json';
import getWeb3 from "../getWeb3";
import Header from '../header'
import { css } from "@emotion/core";
import HashLoader from "react-spinners/HashLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class ShowTransactions extends Component{

   state = {web3:null,accounts:null,driverContract:null,ar:[]}

    componentDidMount = async () => {
  
  
        try {
          // Get network provider and web3 instance.
          const web3 = await getWeb3();
          
          // Use web3 to get the user's accounts.
          const accounts = await web3.eth.getAccounts();
    
          // Get the contract instance.
                  const networkId = await web3.eth.net.getId();
                  
         const DriverNetwork = DriverContract.networks[networkId];
      const driverInstance = new web3.eth.Contract(
        DriverContract.abi,
        DriverNetwork && DriverNetwork.address,
      );                    
                    
      const arr = await driverInstance.methods.returnUser(accounts[0]).call()
      console.log(arr)  


  
          this.setState({ web3, accounts,driverContract:driverInstance,ar:arr});
          //this.runExample
        } catch (error) {
          // Catch any errors for any of the above operations.
          alert(
            `Failed to load web3, accounts, or contract. Check console for details.`,
          );
          console.error(error);
        }
      };



    render(){

      if (!this.state.web3) {
      return <div style={{marginTop:'300px'}}><HashLoader css={override} size={150} color={'#123abc'}/></div>;
    }

    if(this.state.ar.length===0){

           return <><Header who="user"/><div style={{textAlign:'center'}}><h1 className="title is-1">No transactions as you don't completed any ride.</h1></div></>
    }


    	return (<>
    		<Header who="user"/>

        {
        this.state.ar.map((d,i)=>(


               <div style={{marginTop:'30px'}} class="card">
  <header class="card-header">
    <p class="card-header-title">
      {d[3]} --------> {d[4]}
    </p>
    <a href="#" class="card-header-icon" aria-label="more options">
      <span class="icon">
        <i class="fas fa-angle-down" aria-hidden="true"></i>
      </span>
    </a>
  </header>
  <div class="card-content">
    <div style={{textAlign:'center'}} class="content title is-4">
          {d[0]} -------------> {d[1]}

      <br/>
         <p className="title is-1">{d[2]}QK</p>
    </div>
  </div>
  <footer class="card-footer">
    <a href="#" class="card-footer-item">{d[5]}</a>
    <a href="#" class="card-footer-item">COMPLETED</a>
    <a href="#" class="card-footer-item">{d[6]}</a>
  </footer>
</div> 

        ))
      }


    		</>)
    }

}

export default ShowTransactions