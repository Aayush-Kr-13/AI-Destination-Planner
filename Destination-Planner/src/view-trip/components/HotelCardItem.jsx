import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MAX_RETRIES = 3;

function HotelCardItem({ hotel }) {
    const [photoUrl, setPhotoUrl] = useState();

    useEffect(() => {
        if (hotel) {
            GetPlacePhoto();
        }
    }, [hotel]);

    const fetchWithRetry = async (url, options, retries = MAX_RETRIES) => {
        try {
            const response = await axios.request(options);
            return response.data;
        } catch (error) {
            if (retries > 0 && error.response && error.response.status === 429) {
                // Wait before retrying
                await new Promise(resolve => setTimeout(resolve, 1000 * (MAX_RETRIES - retries + 1)));
                return fetchWithRetry(url, options, retries - 1);
            }
            throw error;
        }
    };

    const GetPlacePhoto = async () => {
        const options = {
            method: 'GET',
            url: 'https://google-search72.p.rapidapi.com/imagesearch',
            params: {
                q: hotel?.hotelName,
                gl: 'us',
                lr: 'lang_en',
                num: '5',
                start: '0'
            },
            headers: {
                'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY4,
                'x-rapidapi-host': 'google-search72.p.rapidapi.com'
            }
        };

        try {
            const data = await fetchWithRetry('https://google-search72.p.rapidapi.com/imagesearch', options);
            console.log(data);
            const photoUrl = data.items[0].originalImageUrl;
            setPhotoUrl(photoUrl);
        } catch (error) {
            console.error('Failed to fetch photo:', error);
            // Handle the error gracefully, e.g., show a placeholder image or message
            setPhotoUrl('/landing.png'); // Default or placeholder image
        }
    };

    return (
        <Link
            to={'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(hotel?.hotelName + "," + hotel?.hotelAddress)}
            target='_blank'
        >
            <div className='hover:scale-105 transition-all cursor-pointer'>
                <img src={photoUrl || "/landing.png"} alt="Image" className="rounded-xl h-[180px] w-full object-cover" />
                <div className='my-2 flex flex-col gap-2'>
                    <h2 className="font-medium">{hotel?.hotelName}</h2>
                    <h2 className="text-xs text-gray-500">📍 {hotel?.hotelAddress}</h2>
                    <h2 className="text-sm">💰 {hotel?.price}</h2>
                    <h2 className="text-sm">⭐ {hotel?.rating} stars</h2>
                </div>
            </div>
        </Link>
    );
}

export default HotelCardItem;
