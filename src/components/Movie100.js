import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import Loading from './Loading';
import styles from './Movie100.module.css';
import Modal from './Modal';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; 

const Movie100 = ({ movieArray }) => {
    const [loading, setLoading] = useState(true);
    const [moviesData, setMoviesData] = useState([]);
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);

    const baseUrl = process.env.REACT_APP_KOREAFILM_URL;
    const serviceKey = process.env.REACT_APP_KOREAFILM_KEY;

    const fetchData = async (item) => {
        try {
            const res = await axios.get(baseUrl, {
                params: {
                    ServiceKey: serviceKey,
                    title: item.title,
                    listCount: 1,
                    releaseDts: item.releaseDate,
                    director: item.director,
                },
            });
            return res.data.Data[0].Result;
        } catch (err) {
            setError('데이터 통신중 오류');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const setAllMovie = async () => {
            const promiseData = movieArray.map(item => fetchData(item));
            const movieData = await Promise.all(promiseData);
            setMoviesData(movieData.filter(Boolean));
        };
        setAllMovie();
    }, [movieArray]);

    const openModal = (movie) => {
        setSelectedMovie(movie);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedMovie(null);
    };

    if (loading) {
        return <Loading />;
    } else {
        return (
            <>
                <section className={styles.reccomendWrap}>
                    <Swiper
                        slidesPerView={2}
                        navigation
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        breakpoints={{
                            1024: {
                                slidesPerView:6,
                            },
                            750: {
                                slidesPerView:3,
                            },
                        }}
                    >
                        {moviesData.map((items, index) => (
                            <SwiperSlide key={index} onClick={() => openModal(items[0])} className='swiperItem'>
                                <div className='swiperImg'>
                                    <img
                                        src={
                                            items[0].posters.split('|')[0]
                                                ? items[0].posters.split('|')[0]
                                                : "https://via.placeholder.com/213x303.png?text=213x303+sorry,%20can%27t%20find%20img"
                                        }
                                        alt={items[0].title.replace(/!HS|!HE/g, '')}
                                    />
                                </div>
                                <h5>
                                    {items[0].title.replace(/!HS|!HE/g, '')}
                                </h5>
                                <span>
                                    {items[0].repRlsDate.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')}
                                </span>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </section>
                <Modal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    movieInfo={selectedMovie}
                    src={selectedMovie ? selectedMovie.posters.split('|')[0] : ''}
                />
            </>
        );
    }
};

export default Movie100;