import React, { useEffect, useState } from "react";
import styles from './Main.module.css';
import axios from "axios";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

const Main = () => {
    const navigate = useNavigate();

    const handleMovieClick = (item, imgSrc) => {
        console.log(item.movieCd)
        navigate(`/detail/${item.movieCd}`, { state: { item, src: imgSrc } });
    };

    const date = new Date();
    
    const formatDateToYYYYMMDD = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate() - 1).padStart(2, '0');
        return `${year}${month}${day}`;
    };

    const [boxOffice, setBoxOffice] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [imgSrcMap, setImgSrcMap] = useState({});

    const apiKey = process.env.REACT_APP_KOBIS_KEY;
    const imgKey = process.env.REACT_APP_KOREAFILM_KEY;
    const kobisurl = process.env.REACT_APP_KOBIS_URL;
    const koreaFilmUrl = process.env.REACT_APP_KOREAFILM_URL;

    const fetchData = async () => {
        try {
            const res = await axios.get(kobisurl, {
                params: {
                    key: apiKey,
                    targetDt: formatDateToYYYYMMDD(date),
                }
            });
            setBoxOffice(res.data.boxOfficeResult.dailyBoxOfficeList);
            localStorage.setItem('boxOfficeData', JSON.stringify(res.data.boxOfficeResult.dailyBoxOfficeList)); // 데이터 저장
        } catch (err) {
            setError('데이터 통신중 오류');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const imgSrcSet = async (name) => {
        try {
            const res = await axios.get(koreaFilmUrl, {
                params: {
                    ServiceKey: imgKey,
                    title: name,
                    listCount: 1,
                }
            });

            const result = res.data.Data[0].Result[0].posters;
            const imgResult = await result.split('|');
            let returnData = imgResult[0];

            if (imgResult[0] === "") {
                returnData = "https://via.placeholder.com/213x303.png?text=213x303+sorry,%20can%27t%20find%20img";
            }

            return returnData;
        } catch (err) {
            setError('데이터 통신중 오류');
            console.error(err);
        }
    };

    useEffect(() => {
        const storedData = localStorage.getItem('boxOfficeData');
        if (storedData) {
            setBoxOffice(JSON.parse(storedData)); // 로컬 스토리지에서 데이터 불러오기
            setLoading(false); // 데이터가 있으면 로딩 중 상태 해제
        } else {
            fetchData(); // 로컬 스토리지에 데이터가 없으면 API 호출
        }
    }, []);

    useEffect(() => {
        const fetchImages = async () => {
            const newImgSrcMap = {};

            for (const item of boxOffice) {
                const imgSrc = await imgSrcSet(item.movieNm);
                if (imgSrc) {
                    newImgSrcMap[item.movieNm] = imgSrc; 
                }
            }

            setImgSrcMap(newImgSrcMap);
        };

        if (boxOffice.length > 0) {
            fetchImages();
        }
    }, [boxOffice]);

    if (loading) {
        return <Loading />;
    } else {
        return (
            <section className={styles.mainSection}>
                <div className={styles.movieWrap}>
                    {boxOffice.map(item => {
                        return (
                            <div key={item.rnum} className={styles.movieitem} onClick={() => { handleMovieClick(item, imgSrcMap[item.movieNm]) }}>
                                <div className={styles.posterWarp}>
                                    <img className={styles.moviePoster} src={imgSrcMap[item.movieNm]} alt={item.movieNm} />
                                    <span className={styles.rate}>{item.rnum}</span>
                                </div>
                                <div className={styles.movieArticles}>
                                    <span className={styles.title}>{item.movieNm}</span>
                                    <span className={styles.date}>{item.openDt}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        );
    }
};

export default Main;