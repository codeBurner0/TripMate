import React from 'react'
import {Link} from 'react-router-dom'

function LandingScreen() {
  return (
    <div className='row landing'>
      <div className='col-md-12 text-center'>

      <h2 style={{color:'beige' , fontSize:'80px'}}><b>The Hotel Hub</b></h2>
      <h1 style={{color:'white'}}>There is only one boss. The Guest.</h1>

      <Link to="/home">
      <button className='btn landingbtn'> <b>Get Started</b></button>

      </Link>
      </div>
      
    </div>
  )
}

export default LandingScreen
