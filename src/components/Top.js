import React from 'react';
import styles from './Top.module.css'; // CSS 파일 임포트

const Top = () => {
    return (
        <div className={styles.Top}>
            <h1 className={styles.title}>moviePortfolio</h1>
        </div>
    );
};

export default Top;