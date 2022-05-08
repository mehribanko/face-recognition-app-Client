import React from "react";


const Rank =({name, entries})=>{
    return (
        <div>
            <div className="white f4 ">
             <p>{`${name}, your current entry count is ${entries}`}</p>
            </div>
        </div>
    );
}


export default Rank;