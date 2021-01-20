import React,{Component} from 'react'
import Particles from 'react-particles-js';
import 'bulma/css/bulma.css';
import {withRouter,Link} from 'react-router-dom';
import getWeb3 from "../getWeb3";
import userContract from '../contracts/RiderReg.json';
import driverContract from '../contracts/DriverReg.json';

import { css } from "@emotion/core";
import HashLoader from "react-spinners/HashLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


class Register extends Component{

    state = {name:"",aadhar:"",phno:"",web3:null,accounts:null,user:null,message:'',regUser:null,regDriver:null,message:''}


    change = e=>{
        this.setState({...this.state,[e.target.name]:e.target.value})
  }


  


    componentDidMount = async () => {
  
  
        try {
          // Get network provider and web3 instance.
          const web3 = await getWeb3();
          
          // Use web3 to get the user's accounts.
          const accounts = await web3.eth.getAccounts();
    
          // Get the contract instance.
        	const networkId = await web3.eth.net.getId();
        	const userNetwork = userContract.networks[networkId];
        	const userInstance = new web3.eth.Contract(
          	userContract.abi,
          	userNetwork && userNetwork.address,
          );

          const driverNetwork = driverContract.networks[networkId];
          const driverInstance = new web3.eth.Contract(
            driverContract.abi,
            driverNetwork && driverNetwork.address,
          );

          const regUser = await userInstance.methods.user(accounts[0]).call()
          const regDriver = await driverInstance.methods.drivers(accounts[0]).call()

          console.log(regDriver.role,regUser.role)

  
          this.setState({ web3, accounts,user:userInstance,regUser,regDriver});
          //this.runExample
        } catch (error) {
          // Catch any errors for any of the above operations.
          alert(
            `Failed to load web3, accounts, or contract. Check console for details.`,
          );
          console.error(error);
        }
      };

      submit = async e=>{
        e.preventDefault()
        const {accounts,user,name,aadhar,phno,regUser,regDriver} = this.state
        //if(regUser || regDriver){
          const roleUser = regUser.role
          const roleDriver = regDriver.role

          if(roleUser==="USER"){

          this.setState({...this.state,message:'You have already registered as a User'})
        }

        if(roleDriver==="DRIVER"){
          this.setState({...this.state,message:'You have already registered as a Driver'})
        }

        if(roleUser==="" && roleDriver===""){
        let res = await user.methods.rider(accounts[0],name,aadhar,phno).send({from:accounts[0]});
        this.setState({...this.state,message:''})
        this.props.history.push("/user");
      }
        }

        render(){
          if (!this.state.web3) {
      return <div style={{marginTop:'300px'}}><HashLoader css={override} size={150} color={'#123abc'}/></div>;
    }

        	 return(

                   
                <div class="container">
                    
                    <form onSubmit={this.submit} style={{textAlign:'center',marginTop:'200px'}}>
                        <h1 className="title is-1">REGISTER</h1>
                    <div class="field">
                        <label class="label">Name</label>
                        <div class="control">
                            <input name="name" value={this.state.name} onChange={this.change} style={{width:'300px'}} class="input" type="text" placeholder="Name"/>
                        </div>
                        </div>

                        <div class="field">
                        <label class="label">Aadhaar</label>
                        <div class="control">
                            <input name="aadhar" value={this.state.aadhar} onChange={this.change} style={{width:'300px'}} class="input" type="text" placeholder="Aadhaar"/>
                        </div>
                        </div>

                        <div class="field">
                        <label class="label">Phone No</label>
                        <div class="control">
                            <input name="phno" value={this.state.phno} onChange={this.change} style={{width:'300px'}} class="input" type="text" placeholder="Phone"/>
                        </div>
                        </div>

                        <div class="control" >
                            <button type="submit" class="button is-primary">Submit</button>
                        </div>
                    </form>
                    {this.state.message && (
                
                <div style={{marginTop:'30px'}} class="notification is-link">
                                              {this.state.message}
                                </div>
                
          )}
                    </div>

                
        	 	)
        }

}


export default withRouter(Register)