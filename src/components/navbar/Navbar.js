import React from "react";
import './Navbar.css';

const Navbar =({onRouteChange, isSignedIn})=>{
    if(isSignedIn){
    return (
        <nav className="navbar">
            <p onClick={()=>onRouteChange("signout")} className="f3 link dim white ph5 pointer">Sign out</p>
        </nav>
    )}
    else{
        return(
                <nav className="navbar">
                    <p onClick={()=>onRouteChange("signin")} className="f3 link dim white ph5 pointer">Sign in</p>
                
                    <p onClick={()=>onRouteChange("signup")} className="f3 link dim white ph5 pointer">Sign up</p>
                </nav>
        )
    }
}



export default Navbar;