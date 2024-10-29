import React from 'react';
import styles from './Footer.module.css'; 

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.info}>
                    <h4>원민영의 웹 포트폴리오 입니다.</h4>
                    <p>Instagram: <a href="https://www.instagram.com/fantasystar94" target="_blank" rel="noopener noreferrer">@fantasystar94</a></p>
                    <p>Email: <a href="mailto:aniseed_3@naver.com">aniseed_3@naver.com</a></p>
                    <p>Phone: <span>010-3124-3785</span></p>
                    <p>GitHub: <a href="https://github.com/fantasystar94" target="_blank" rel="noopener noreferrer">fantasystar94</a></p>
                </div>
                <div className={styles.copy}>
                    <p>&copy; {new Date().getFullYear()} Your Name. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;