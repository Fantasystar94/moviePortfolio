import { useState, useEffect } from 'react';

const useLocalStorageFetch = (key, fetchData) => {
    const [data, setData] = useState(() => {
        const storedData = localStorage.getItem(key);
        const storedDate = localStorage.getItem(`${key}_date`);

        // 오늘 날짜와 비교하여 새 데이터 가져오기
        const today = new Date().toISOString().split('T')[0];
        if (storedData && storedDate === today) {
            return JSON.parse(storedData);
        }
        return null;
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAndStoreData = async () => {
            try {
                const fetchedData = await fetchData();
                setData(fetchedData);

                // 로컬스토리지에 데이터와 오늘 날짜 저장
                localStorage.setItem(key, JSON.stringify(fetchedData));
                localStorage.setItem(`${key}_date`, new Date().toISOString().split('T')[0]);
            } catch (err) {
                setError('데이터 통신중 오류');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (!data) {
            fetchAndStoreData();
        } else {
            setLoading(false);
        }
    }, [data, fetchData, key]);

    return { data, loading, error };
};

export default useLocalStorageFetch;