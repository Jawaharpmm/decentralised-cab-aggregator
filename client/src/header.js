import React,{Component} from 'react'
import {Link} from 'react-router-dom'

class Header extends Component{

	render(){
      
       if(this.props.who==='user'){

		return(
                
                <nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <Link to="/" class="navbar-item">
      <h1 className="title is-1 has-text-info">DC</h1>
    </Link>

    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">

      <Link to="/user/monetize" class="navbar-item">
        Monetize the Token
      </Link>

      <Link to="/user/rewards" class="navbar-item">
        Rewards and achievements
      </Link>
       
      <Link to="/user/recommend" class="navbar-item">
        Recommend
      </Link>

      <Link to="/user/transactions" class="navbar-item">
        Show all transactions
      </Link>

      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">
          More
        </a>

        <div class="navbar-dropdown">
          <a class="navbar-item">
            About
          </a>
          <a class="navbar-item">
            Jobs
          </a>
          <a class="navbar-item">
            Contact
          </a>
          <hr class="navbar-divider" />
          <a class="navbar-item">
            Report an issue
          </a>
        </div>
      </div>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <a class="button is-primary">
            <strong>Help</strong>
          </a>
          <a class="button is-danger">
            <strong>SOS</strong>
          </a>
          
        </div>
      </div>
    </div>
  </div>
</nav>

			)
		}

     if(this.props.who==='driver'){
     	return(

                           <nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <Link to="/" class="navbar-item">
      <h1 className="title is-1 has-text-info">DC</h1>
    </Link>

    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
    
      <Link to="/driver/monetize" class="navbar-item">
        Monetize the Token
      </Link>

      <Link to="/driver/rewards" class="navbar-item">
        Rewards and achievements
      </Link>
       
      <Link to="/driver/recommend" class="navbar-item">
        Recommend
      </Link>

      <Link to="/driver/transactions" class="navbar-item">
        Show all transactions
      </Link>

      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link">
          More
        </a>

        <div class="navbar-dropdown">
          <a class="navbar-item">
            About
          </a>
          <a class="navbar-item">
            Jobs
          </a>
          <a class="navbar-item">
            Contact
          </a>
          <hr class="navbar-divider" />
          <a class="navbar-item">
            Report an issue
          </a>
        </div>
      </div>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          <a class="button is-primary">
            <strong>Help</strong>
          </a>
          <a class="button is-danger">
            <strong>SOS</strong>
          </a>
          
        </div>
      </div>
    </div>
  </div>
</nav>

     	)
     }

	}
}

export default Header