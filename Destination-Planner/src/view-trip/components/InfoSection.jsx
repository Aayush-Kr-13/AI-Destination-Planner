import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { IoIosSend } from "react-icons/io";
import axios from 'axios';

function InfoSection({ trip }) {

  const [PhotoUrl,setPhotoUrl] = useState();

  useEffect(()=>{
    trip&&GetPlacePhoto();
  },[trip])

  const GetPlacePhoto = async (query) => {
    const options = {
      method: 'GET',
      url: 'https://google-search72.p.rapidapi.com/imagesearch',
      params: {
        q: trip?.userSelection?.location,
        gl: 'us',
        lr: 'lang_en',
        num: '5',
        start: '0'
      },
      headers: {
        'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY3,
        'x-rapidapi-host': 'google-search72.p.rapidapi.com'
      }
    };
  
    try {
      const response = await axios.request(options);
      console.log(response.data);
      const PhotoUrl = response.data.items[0].originalImageUrl;
      setPhotoUrl(PhotoUrl);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  return (
    <div>
      <img src={PhotoUrl || "/landing.png"} alt={trip?.userSelection?.location} className='h-[340px] w-full object-cover rounded-xl ' onError={(e) => e.target.src = '/landing.png'}/>
      
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">{trip?.userSelection?.location} </h2>
          <div className="flex gap-5">
             <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">📅{trip?.userSelection?.noOfDays} Day</h2>
             <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">💸{trip?.userSelection?.budget} Budget</h2>
             <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">🗺️No of Traveler : {trip?.userSelection?.traveler}</h2>
          </div>
        </div>
        <Button><IoIosSend /></Button>      

       </div>
      
    </div>
  );
}

export default InfoSection;
