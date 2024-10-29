import React, { useEffect, useState } from "react";
import styles from './Detail.module.css';
import { useLocation } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
const Detail = () => {
    //url 넘어온 데이터 세팅
    const location = useLocation();
    const { item, src } = location.state || {};
    //url 넘어온 데이터 세팅
    console.log(item)
    const [movieInfo, setMovieInfo] = useState();
    const koreaFilmUrl = process.env.REACT_APP_KOREAFILM_URL;
    const imgKey = process.env.REACT_APP_KOREAFILM_KEY;

    const [error, setError] = useState('');
    const [actors, setActors] = useState([]);
    const [loading, setLoading] = useState(true);

    const movieInfoSet = async (name) => {
        try {
            const res = await axios.get(koreaFilmUrl, {
                params: {
                    ServiceKey: imgKey,
                    title: name.movieNm,
                    listCount: 1,
                }
            });
            setMovieInfo(res.data.Data[0].Result[0]);
        } catch (err) {
            setError('데이터 통신중 오류');
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        movieInfoSet(item);
    }, [item]); // item이 변경될 때마다 호출

    useEffect(() => {
        if (movieInfo) {
            settingActors(); // movieInfo가 설정된 후 호출
        }
        
    }, [movieInfo]); // movieInfo가 업데이트될 때마다 호출

    const settingActors = () => {
        const actorNames = [];
        if(movieInfo.actors.actor.length>=3){
            for (let i = 0; i < 3; i++) {
                actorNames.push(movieInfo.actors.actor[i].actorNm);
            }
        }
        else{
            actorNames.push(movieInfo.actors.actor[0].actorNm)
        }
        setActors(actorNames);
    };
    if (loading) {
        return <Loading />;
    }

    return (
        <section>
      
                <div className={styles.mainBox}>
                    <img src={src} alt="Movie Poster" />
                    <div className={styles.mainTitleWrap}>
                        <h3 className={styles.title}>{item.movieNm}</h3>
                        <h4 className={styles.titleEn}>{movieInfo.titleEng}</h4>
                        <span>{movieInfo.directors.director[0].directorNm} 감독 작품</span>
                        <span>{movieInfo.genre} {movieInfo.keywords} | {movieInfo.rating}</span>
                        <span>{actors.join(', ')} 주연</span> {/* 배열을 문자열로 변환하여 표시 */}
                        <a 
                        href={`https://www.youtube.com/results?search_query=${encodeURIComponent(item.movieNm)}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        >유튜브 영상 보기
                        </a>
                    </div>
                </div>
                    <p className={styles.plot}>
                        {movieInfo.plots.plot[0].plotText}
                    </p>
          
        </section>
    );
};

export default Detail;