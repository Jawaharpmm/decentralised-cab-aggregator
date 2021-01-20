import React,{Component} from 'react'
import 'bulma/css/bulma.css';
import {withRouter,Link} from 'react-router-dom';
import getWeb3 from "../getWeb3";
import ecoinContract from "../contracts/ecoin.json";
import driverContract from '../contracts/DriverReg.json';
import driver from '../driver';

import Header from '../header'

import Spacer from '../Spacer'

import { css } from "@emotion/core";
import HashLoader from "react-spinners/HashLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


class Rewards1 extends Component{

    

    state={web3:null,accounts:null,ecoin:null,driver:null,upoint: null,about: null}

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
                    
                  	const driverNetwork = driverContract.networks[networkId];
                  	const driverInstance = new web3.eth.Contract(
            	    driverContract.abi,
            	    driverNetwork && driverNetwork.address,
          );

         let upoint = await ecoinInstance.methods.driverpoint(accounts[0]).call();
        let about = await driverInstance.methods.drivers(accounts[0]).call();

        console.log(about)

  
  
          this.setState({ web3, accounts,ecoin:ecoinInstance,driver:driverInstance,upoint,about});
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


         return(
             <>
            <Header who="driver"/>
            <section style={{textAlign:"center"}} class="hero is-medium is-primary is-bold">
            <div class="hero-body">
                <div class="container">
                <h1 class="title is-1">
                    Points:{this.state.upoint}
                </h1>
                

                </div>
            </div>
            </section>
            <section style={{textAlign:"center",marginTop:"25px"}}>
            <div class="tile is-ancestor">

  {<div class="tile is-parent">
    <div class="tile is-child box">
      <p>Name:<h1 class="title is-1">{this.state.about.name}</h1></p>
      <p>Wallet Address:<h2 className="subtitle is-1">{this.state.about.id}</h2></p>
      <p>Aadhaar:<p className="title is-1">{this.state.about.aadhaar}</p></p>
      <p>License:<p className="title is-1">{this.state.about.license}</p></p>
      <p>Insurance:<p className="title is-1">{this.state.about.insurance}</p></p>
      <p>RC_Book:<p className="title is-1">{this.state.about.rc_book}</p></p>
      <p>Phone:<p className="title">{this.state.about.phn_num}</p></p>
      <p>Role:<h2 className="subtitle is-3">DRIVER</h2></p>
    </div>
  </div>}
</div>
            </section>
            <Spacer />
            </>
            
             )
    }

}


export default withRouter(Rewards1)