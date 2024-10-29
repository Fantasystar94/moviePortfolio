import React from 'react';
import styles from './Loading.module.css';

const Loading =()=>{
    return(
        <div className={styles.loading}>
            <span className={styles.spinner}></span>
            <h3 className={styles.notice}>로딩중입니다. </h3>
        </div>
    )
}
export default Loading;