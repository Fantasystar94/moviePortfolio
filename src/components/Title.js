import React from "react";

const Header =({title})=>{
    const style = {
        margin:'50px auto 100px',
        fontSize:'25px',
    }
    return (
        <div style={style}>
            <h1>{title}</h1>
        </div>
    )
}

export default Header;