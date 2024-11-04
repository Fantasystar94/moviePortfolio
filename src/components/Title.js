import React from "react";
import styles from './Title.module.css'
const Header =({title})=>{

    return (
        <div className={styles.title} >
            <h1>{title}</h1>
        </div>
    )
}

export default Header;