import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css'; // CSS 파일 임포트

const Modal = ({ isOpen, onClose, movieInfo, src }) => {
    
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'; 
        } else {
            document.body.style.overflow = ''; 
        }
        
        return () => {
            document.body.style.overflow = ''; 
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>
                    ×
                </button>
                <div className={styles.mainBox}>
                    <img
                        src={
                            src
                                ? src
                                : "https://via.placeholder.com/213x303.png?text=213x303+sorry,%20can%27t%20find%20img"
                        }
                        alt="Movie Poster"
                        className={styles.poster}
                    />
                    <div className={styles.mainTitleWrap}>
                        <h3 className={styles.title}>{movieInfo.title.replace(/!HS|!HE/g, '').trim()}</h3>
                        <h4 className={styles.titleEn}>{movieInfo.titleEng}</h4>
                        <span>{movieInfo.directors.director[0].directorNm.replace(/!HS|!HE/g, '').trim()} 감독 작품</span>
                        <span className={styles.genre}>{movieInfo.genre} {movieInfo.keywords}</span>
                        <span className={styles.rating}>{movieInfo.rating}</span>
                        <span className={styles.actors}>{movieInfo.actors.actor[0].actorNm} 주연</span>
                        <a
                            href={`https://www.youtube.com/results?search_query=${encodeURIComponent("영화 " + movieInfo.title.replace(/!HS|!HE/g, '').trim())}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.youtubeLink}
                        >
                            유튜브 영상 보기
                        </a>
                    </div>
                </div>
                <p className={styles.plot}>
                    {movieInfo.plots.plot[0].plotText}
                </p>
            </div>
        </div>
    );
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    movieInfo: PropTypes.object.isRequired,
    src: PropTypes.string.isRequired,
};

export default Modal;