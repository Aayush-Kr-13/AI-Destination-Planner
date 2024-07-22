import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

// Debounce function to limit the rate at which the API is called
const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

function CreateTrip() {
  const [destination, setDestination] = useState('');
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  // Function to handle search
  const fetchCities = async (query) => {
    if (query.length < 3) {
      setData([]);
      setShowDropdown(false);
      return;
    }

    const options = {
      method: 'GET',
      url: 'https://booking-com.p.rapidapi.com/v1/static/cities',
      params: {
        page: '0',
        name: query
      },
      headers: {
        'x-rapidapi-key': '3e8ef66ca9msh5b1b3703e0f1858p18e899jsn2f40e3f2d1a0',
        'x-rapidapi-host': 'booking-com.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      const limitedData = response.data.result.slice(0, 5); // Limit the results to 5
      setData(limitedData); // Store the limited data in the state
      setError(null); // Clear any previous error
      setShowDropdown(true); // Show the dropdown
      console.log(response.data);
    } catch (error) {
      setError(error); // Store the error in the state
      setData([]); // Clear any previous data
      setShowDropdown(false); // Hide the dropdown
      console.error(error);
    }
  };

  // Debounced search function
  const debouncedFetchCities = debounce(fetchCities, 300);

  // Effect to trigger search on destination change
  useEffect(() => {
    debouncedFetchCities(destination);
  }, [destination]);

  const handleSelectCity = (cityName) => {
    setDestination(cityName);
    setShowDropdown(false);
  };

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us your travel preferences</h2>
      <p className='mt-3 text-gray-500 text-xl'>
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
      </p>

      <div className='mt-20'>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is your destination of choice?</h2>
          <div className='relative'>
            <Input
              type='text'
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder='Enter destination'
              className='mr-2'
            />
            {showDropdown && (
              <div className='absolute z-10 w-full bg-white border border-gray-300 mt-1'>
                {data.map((city) => (
                  <div
                    key={city.city_id}
                    className='px-4 py-2 cursor-pointer hover:bg-gray-200'
                    onClick={() => handleSelectCity(city.name)}
                  >
                    {city.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className='mt-10 text-red-500'>
            <p>Error fetching data: {error.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateTrip;
