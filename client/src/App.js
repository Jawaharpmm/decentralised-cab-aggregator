import React, { Component } from "react";
import {Route,Link, Switch} from "react-router-dom"

import Home from './home'
import User from './user'
import Driver from './driver'
import 'bulma/css/bulma.css'

import RecommendUser from './user/recommend'
import RecommendDriver from './driver/recommend'
import MonetizeUser from './user/monetize'
import MonetizeDriver from './driver/monetize'

import Book from './user/book'
import Accept from './driver/accept'

import BuyQk from './buyQk'

import RideUser from './user/ride'
import RideDriver from './driver/ride'

import FeedbackUser from './user/feedback'
import FeedbackDriver from './driver/feedback'

import RegisterUser from './user/register'
import RegisterDriver from './driver/register'

import RewardsUser from './user/rewards'
import RewardsDriver from './driver/rewards'

import ShowUser from './user/show'
import ShowDriver from './driver/show'

import ErrorPage from './404'

import "./App.css";

class App extends Component {
 

  render() {
    return (
      <>
      
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/user" component={User}/>
        <Route exact path="/driver" component={Driver}/>
        <Route exact path="/user/book" component={Book}/>
        <Route exact path="/driver/accept" component={Accept}/>
        <Route exact path="/user/recommend" component={RecommendUser}/>
        <Route exact path="/user/monetize" component={MonetizeUser}/>
        <Route exact path="/driver/recommend" component={RecommendDriver}/>
        <Route exact path="/driver/monetize" component={MonetizeDriver}/>
        <Route exact path="/buy" component={BuyQk}/>
        <Route exact path="/user/ride" component={RideUser} />
        <Route exact path="/driver/ride" component={RideDriver} />
        <Route exact path="/user/feedback" component={FeedbackUser} />
        <Route exact path="/driver/feedback" component={FeedbackDriver} />
        <Route exact path="/user/register" component={RegisterUser} />
        <Route exact path="/driver/register" component={RegisterDriver} />
        <Route exact path="/user/rewards" component={RewardsUser} />
        <Route exact path="/driver/rewards" component={RewardsDriver} />
        <Route exact path="/user/transactions" component={ShowUser} />
        <Route exact path="/driver/transactions" component={ShowDriver} />


        <Route exact path="*" component={ErrorPage} />
 
      </Switch>
     
      </>
    );
  }
}

export default App;

