import React, { useEffect, useState } from 'react';
import { getData } from '../../api/api';

const SearchRide = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getData();
                setData(res.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Search Ride</h1>

            {data.map((item, index) => (
                <div key={index}>
                    <h2>{item.fullName.firstName}</h2>
                    <p>{item.email}</p>
                    <p>{item.phone}</p>
                </div>
            ))}
        </div>
    );
};

export default SearchRide;