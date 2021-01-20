import React from 'react'
import Header from './header'
import 'bulma/css/bulma.css'

import './Style.css'

import {Link} from 'react-router-dom'
 
const ErrorPage = ()=>{

          return(
            
              <>
                  
               <div>

                    <div id="notfound">
		<div class="notfound">
			<div class="notfound-404">
				<h1>404</h1>
				<h2>Page not found</h2>
			</div>
			<Link to="/">Homepage</Link>
		</div>
	</div>

               </div>

              </>

          	)

}

export default ErrorPage