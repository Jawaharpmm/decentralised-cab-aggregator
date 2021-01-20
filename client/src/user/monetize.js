import React,{Component} from 'react'
import Particles from 'react-particles-js';

class Monetize extends Component{

        render(){


        	 return(

                   <>

                     <Particles
    params={{
	    particles: {
	    	color: {
      value: "#fff"
    },
	        number: {
	            value: 160,
	            density: {
	                enable: false
	            }
	        },
	        size: {
	            value: 3,
	            random: true,
	            anim: {
	                speed: 4,
	                size_min: 0.3
	            }
	        },
	        line_linked: {
	            enable: false
	        },
	        move: {
	            random: true,
	            speed: 1,
	            direction: "top",
	            out_mode: "out"
	        }
	    },
	    interactivity: {
	        events: {
	            onhover: {
	                enable: true,
	                mode: "bubble"
	            },
	            onclick: {
	                enable: true,
	                mode: "repulse"
	            }
	        },
	        modes: {
	            bubble: {
	                distance: 250,
	                duration: 2,
	                size: 0,
	                opacity: 0
	            },
	            repulse: {
	                distance: 400,
	                duration: 4
	            }
	        }
	    }
	}} style={{backgroundColor:'#bea9de'}}/>

                 <div style={{position:'absolute',bottom:'500px',left:'570px',top:'300px'}} class="container">
      <div class="field has-addons has-addons-centered">
  <p class="control">
    <span class="select">
      <select>
        <option>$</option>
        <option>£</option>
        <option>€</option>
      </select>
    </span>
  </p>
  <p class="control">
    <input class="input is-medium" type="text" placeholder="Amount of Token"/>
  </p>
  <p class="control">
    <a class="button is-primary">
      Convert
    </a>
  </p>
</div>
    </div>

 
                   </>
                
        	 	)
        }

}


export default Monetize