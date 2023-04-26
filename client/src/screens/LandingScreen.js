import React from 'react'
import {Link} from 'react-router-dom'

function LandingScreen() {
  return (
    <>
    <div className='background'></div>
    <div className='row text-container'>
      <div className='col-md-12 text-center hello'>
      <h2 style={{color:'beige' , fontSize:'80px',fontWeight:'bold',color:"white"}}><b>TripMate</b></h2>
      <header className='header'>
      <div class="waviy">
   <span style={{"--i":1}}>C</span>
   <span style={{"--i":2}}>O</span>
   <span style={{"--i":3}}>M</span>
   <span style={{"--i":4}}>F</span>
   <span style={{"--i":5}}>O</span>
   <span style={{"--i":6}}>R</span>
   <span style={{"--i":7}}>T</span>
   <span style={{"--i":8}}>,</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
   <span style={{"--i":9}}>R</span>
   <span style={{"--i":10}}>E</span>
   <span style={{"--i":11}}>L</span>
   <span style={{"--i":12}}>A</span>
   <span style={{"--i":13}}>X</span>
   <span style={{"--i":14}}>A</span>
   <span style={{"--i":15}}>T</span>
   <span style={{"--i":16}}>I</span>
   <span style={{"--i":17}}>O</span>
   <span style={{"--i":18}}>N</span>
   <span style={{"--i":19}}>,</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
   <span style={{"--i":20}}>A</span>
   <span style={{"--i":21}}>N</span>
   <span style={{"--i":22}}>D</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
   <span style={{"--i":23}}>L</span>
   <span style={{"--i":24}}>U</span>
   <span style={{"--i":25}}>X</span>
   <span style={{"--i":26}}>U</span>
   <span style={{"--i":27}}>R</span>
   <span style={{"--i":28}}>Y</span>
   </div>
   </header>

      <Link to="/home">
      <button className='btn landingbtn'> <b>Get Started</b></button>

      </Link>
      </div>
      
    </div>
    </>
  )
}

export default LandingScreen
