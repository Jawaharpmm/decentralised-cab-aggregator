import React,{Component} from 'react'
import Particles from 'react-particles-js';

class Recommend extends Component{

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
	            value: 60,
	            density: {
	                enable: true,
	                value_area: 1500
	            }
	        },
	        line_linked: {
	            enable: true,
	            opacity: 0.05
	        },
	        move: {
	            direction: "right",
	            speed: 0.05
	        },
	        size: {
	            value: 7
	        },
	        opacity: {
	            anim: {
	                enable: true,
	                speed: 1,
	                opacity_min: 0.05
	            }
	        }
	    },
	    interactivity: {
	        events: {
	            onclick: {
	                enable: true,
	                mode: "push"
	            }
	        },
	        modes: {
	            push: {
	                particles_nb: 1
	            }
	        }
	    },
	    retina_detect: true
	}} style={{backgroundColor:'#131862'}}/>

                 <div style={{position:'absolute',bottom:'500px',left:'570px',top:'300px'}} class="container">
   <div class="field">
  <div class="control has-icons-left has-icons-right">
    <input class="input is-medium" type="email" placeholder="Normal"/>
    <span class="icon is-medium is-left">
      <i class="fas fa-envelope"></i>
    </span>
    <span class="icon is-medium is-right">
      <i class="fas fa-check"></i>
    </span>
  </div>
</div>
    <button className="button is-link">Refer</button>
    </div>

 
                   </>
                
        	 	)
        }

}

export default Recommend