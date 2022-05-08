import React from "react";
import './Imagelink.css';

const Imagelink =({onInputChange, onSubmit})=>{
    return (
        <div>
            <p className="f4 "> {'This app will detect faces in your photos. Try it out!'}</p>
            <div className="center">
                <div className="form center pa3 br3 shadow-5">
                <input className="f4 pa2 w-70 center" type='text' onChange={onInputChange}></input>
                <button className="w-30 grow f4 link ph3 dib white"  onClick={onSubmit} style={{background: '#65708d'}}>Detect</button>
                </div>
            </div>
        </div>
        
    )
}


export default Imagelink;