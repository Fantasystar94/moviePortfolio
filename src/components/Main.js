import React from "react";
import styles from './Main.module.css';
import axios from "axios";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import formatDateToYYYYMMDD from '../utils/formatDateToYYYYMMDD';
import useLocalStorageFetch from "../hooks/useLocalStorage";

const Main = () => {
    const navigate = useNavigate();

    const handleMovieClick = (item) => {
        navigate(`/detail/${item.movieCd}`, { state: { item } });
    };

    const apiKey = process.env.REACT_APP_KOBIS_KEY;
    const imgKey = process.env.REACT_APP_KOREAFILM_KEY;
    const kobisurl = process.env.REACT_APP_KOBIS_URL;
    const koreaFilmUrl = process.env.REACT_APP_KOREAFILM_URL;

    const fetchData = async () => {
        const date = new Date();
        try {
            const res = await axios.get(kobisurl, {
                params: {
                    key: apiKey,
                    targetDt: formatDateToYYYYMMDD(date),
                }
            });

            const protoData = res.data.boxOfficeResult.dailyBoxOfficeList;
            const imgSrcSet = await Promise.all(protoData.map(async (movie) => {
                try {
                    const res = await axios.get(koreaFilmUrl, {
                        params: {
                            ServiceKey: imgKey,
                            title: movie.movieNm,
                            listCount: 1,
                        }
                    });

                    const result = res.data.Data[0].Result[0].posters;
                    const imgResult = await result.split('|');
                    let returnData = imgResult[0] || "https://via.placeholder.com/213x303.png?text=213x303+sorry,%20can%27t%20find%20img";

                    return {
                        ...movie,
                        posters: returnData
                    };
                } catch (err) {
                    console.error(err);
                    return movie; 
                }
            }));

            return imgSrcSet;
        } catch (err) {
            console.error(err);
            throw new Error('데이터 통신중 오류'); 
        }
    };

    const { data: boxOffice, loading, error } = useLocalStorageFetch('boxOfficeData', fetchData);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <section className={styles.mainSection}>
            <div className={styles.movieWrap}>
                {boxOffice.map(item => (
                    <div key={item.movieCd} className={styles.movieitem} onClick={() => handleMovieClick(item)}>
                        <div className={styles.posterWarp}>
                            <img className={styles.moviePoster} src={item.posters} alt={item.movieNm} />
                            <span className={styles.rate}>{item.rnum}</span>
                        </div>
                        <div className={styles.movieArticles}>
                            <span className={styles.title}>{item.movieNm}</span>
                            <span className={styles.date}>{item.openDt}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Main;