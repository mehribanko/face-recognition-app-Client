import React from "react";
import './Logo.css';
import logo from './logo.png'
import Tilt from 'react-parallax-tilt';

const Logo =()=>{
    return (
    <Tilt className="tilt">
       <div  style={{ width:'150px', height: '130px', backgroundColor: '#6e7a97',  borderRadius:'5px' }}>
          <img style={{width: '100px', height:'90px', paddingTop:'20px'}} src={logo} alt='logo image'></img>
        </div>
    </Tilt>
    )
}


export default Logo;