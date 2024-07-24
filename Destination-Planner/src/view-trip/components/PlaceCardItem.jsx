import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MAX_RETRIES = 3;

function PlaceCardItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    if (place) {
      GetPlacePhoto();
    }
  }, [place]);

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
        q: place?.placeName,
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
      console.log(data.items[0].originalImageUrl);
      const photoUrl = data.items[0].originalImageUrl;
      setPhotoUrl(photoUrl);
    } catch (error) {
      console.error('Failed to fetch photo:', error);
      setPhotoUrl('/landing.png'); // Default or placeholder image
    }
  };

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place?.placeName)}`}
      target='_blank'
    >
      <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
        <img 
          src={photoUrl || "/landing.png"} 
          alt="visit"
          className='w-[130px] h-[130px] rounded-xl'
        />
        <div>
          <h2 className='font-bold text-lg'>{place.placeName}</h2>
          <p className='text-sm text-gray-400'>{place.placeDetails}</p>
          {/*<Button><FaMapLocationDot /></Button>*/}
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;
