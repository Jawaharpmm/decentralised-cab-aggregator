import React, { Component } from "react";
import {Route,Link, Switch} from "react-router-dom"
import Particles from 'react-particles-js';

import User from './user'
import Driver from './driver'
import 'bulma/css/bulma.css'

import "./App.css";


class Home extends Component{
    render(){
        return(
            <>
                 {<Particles

params={{
  particles: {
    color: {
      value: "#000000"
    },
    line_linked: {
      color: {
        value: "#000000"
      }
    },
    number: {
      value: 70
    },
    size: {
      value: 5
    },
  },interactivity: {
    events: {
        onhover: {
            enable: true,
            mode: "repulse"
        }
    }
}
}}
style={{backgroundColor:'whitesmoke'}}/>}

<div style={{position:'absolute',bottom:'500px',left:'570px',top:'300px'}} class="container">
      <h1 class="title is-1" >
        Decentralized Cab
      </h1>
      <h2 className="subtitle">
        <div className="columns">
                <div className="column is-3">
                      <Link to="/user"><button className="button is-link is-rounded">User</button></Link>
                </div>
                <div className="column is-3">
                      <Link to="/driver"><button className="button is-success is-rounded">Driver</button></Link>
                </div>
        </div>
      </h2>
    </div>
            {/*<section class="hero is-medium is-primary is-bold">
  <div class="hero-body">
    <div class="container">
      <h1 class="title">
        Decentralized Cab
      </h1>
      <h2 className="subtitle">
        <div className="columns">
                <div className="column is-1">
                      <Link to="/user"><button className="button is-link is-rounded">User</button></Link>
                </div>
                <div className="column is-1">
                      <Link to="/driver"><button className="button is-danger is-rounded">Driver</button></Link>
                </div>
        </div>
      </h2>
    </div>
  </div>
        </section>*/}
             
            </>
        )
    }
}

export default Home