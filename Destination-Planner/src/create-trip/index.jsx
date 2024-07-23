import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelList } from '@/constants/options';
import { toast } from '../components/ui/use-toast';
import { chatSession } from '@/service/AIModal';
import { useClerk, useUser } from '@clerk/clerk-react';
import { doc, setDoc } from "firebase/firestore";
import { db } from '@/service/firebaseConfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";

// Debounce function to limit the rate at which the API is called
const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

function CreateTrip() {
  const [openDialog, setOpenDialog] = useState(false);
  const [openSignInDialog, setOpenSignInDialog] = useState(false); // State for sign-in dialog
  const { client, openSignIn, signOut } = useClerk();
  const { user } = useUser();
  const [destination, setDestination] = useState('');
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [formData, setFormData] = useState({
    location: '',
    noOfDays: '',
    budget: '',
    traveler: '',
  });
  const[loading,setLoading]=useState(false);

  const handleInputChange = (name, value) => {
    if (name === 'noOfDays' && value > 5) {
      toast({ title: "Please enter days less than 5", description: "Number of days cannot exceed 5" });
      return;
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const onGenerateTrip = async () => {
    if (!user) {
      // Trigger dialog if user is not signed in
      setOpenDialog(true);
      return;
    }

    if (!formData?.location) {
      toast({ title: "Please enter your destination", description: "You need to specify a destination for your trip." });
      return;
    }
    if (!formData?.noOfDays) {
      toast({ title: "Please enter the number of days", description: "Specify how many days you are planning for your trip." });
      return;
    }
    if (!formData?.budget) {
      toast({ title: "Please enter budget details", description: "Provide your budget for the trip." });
      return;
    }
    if (!formData?.traveler) {
      toast({ title: "Please enter travel companions", description: "Indicate who you are traveling with." });
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget);

    console.log(FINAL_PROMPT);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      console.log(result?.response?.text());
      // Save the generated trip
      setLoading(false);
      await SaveAiTrip(result?.response?.text());
    } catch (error) {
      console.error("Error generating trip:", error);
    }
  };

  // Creating a new method to add data to our database
  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const docId = Date.now().toString();
    await setDoc(doc(db, "AllTrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      // Add email address of the user
      userEmail: user.primaryEmailAddress.emailAddress,
      id:docId
    });
    setLoading(false);
  };

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
      params: { page: '0', name: query },
      headers: {
        'x-rapidapi-key': VITE_RAPIDAPI_KEY,
        'x-rapidapi-host': 'booking-com.p.rapidapi.com',
      },
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
    handleInputChange('location', cityName);
    setShowDropdown(false);
  };

  // Function to handle user profile and generate trip
  const handleUserProfile = async () => {
    if (user) {
      try {
        console.log(user);
        console.log(JSON.stringify(user, null, 2)); // Pretty-print JSON
        setOpenDialog(false);
        await onGenerateTrip();
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    }
  };

  // Function to handle sign-in
  const handleSignIn = () => {
    openSignIn();
    setOpenDialog(false);
  };

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us your travel preferences 🏕️🌴</h2>
      <p className='mt-3 text-gray-500 text-xl'>
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
      </p>

      <div className='mt-20 flex flex-col gap-10'>
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

        <div>
          <h2 className='text-xl my-3 font-medium'>How many days you are planning for your trip?</h2>
          <Input
            placeholder={'Ex.3'}
            type="number"
            value={formData.noOfDays}
            onChange={(e) => handleInputChange('noOfDays', e.target.value)}
          />
        </div>

        {error && (
          <div className='mt-10 text-red-500'>
            <p>Error fetching data: {error.message}</p>
          </div>
        )}
      </div>
      
      <div>
        <h2 className='text-xl my-3 font-medium'>What is your budget?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData.budget === item.title ? 'border-blue-500' : ''}`}
              onClick={() => handleInputChange('budget', item.title)}
            >
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h2 className='text-xl my-3 font-medium'>Who do you plan on travelling with on your next adventure?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectTravelList.map((item, index) => (
            <div
              key={index}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formData.traveler === item.people ? 'border-blue-500' : ''}`}
              onClick={() => handleInputChange('traveler', item.people)}
            >
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>
      
      <div className='my-10 justify-end flex'>
        <Button disabled={loading} onClick={onGenerateTrip}>
        {
          loading?<AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" /> :"Generate Trip"
        }
        </Button>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src='/logo.svg' alt='Logo'/>
              <h2 className='font-bold text-lg mt-7'>Sign In With Google</h2>
              <p>Sign In to the website using Google securely</p>
              <Button onClick={handleSignIn} className="w-full mt-5 flex gap-4 items-center">
                <FcGoogle className='h-7 w-7'/>Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog open={openSignInDialog} onOpenChange={setOpenSignInDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <h2 className='font-bold text-lg mt-7'>You have been signed out</h2>
              <p>Please sign in again to continue.</p>
              <Button onClick={openSignIn} className="w-full mt-5 flex gap-4 items-center">
                <FcGoogle className='h-7 w-7'/>Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
