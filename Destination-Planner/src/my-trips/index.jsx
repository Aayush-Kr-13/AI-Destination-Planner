import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import UserTripCardItem from './components/UserTripCardItem';

function MyTrips() {
  const navigate = useNavigate();
  const { isLoaded, isSignedIn, user } = useUser();
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    if (isLoaded) {
      if (isSignedIn && user) {
        const email = user.primaryEmailAddress?.emailAddress || user.emailAddresses?.[0]?.emailAddress;
        if (email) {
          GetUserTrips(email);
        } else {
          navigate('/');
        }
      } else {
        navigate('/');
      }
    }
  }, [isLoaded, isSignedIn, user, navigate]);

  const GetUserTrips = async (email) => {
    try {
      setUserTrips([]);
      const q = query(collection(db, 'AllTrips'), where('userEmail', '==', email));
      const querySnapshot = await getDocs(q);
      const trips = querySnapshot.docs.map(doc => doc.data());
      setUserTrips(trips);
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
        <h2 className="font-bold text-3xl">My Trips</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-10">
            {userTrips.map((trip, index) => (
                <UserTripCardItem key={trip.id} trip={trip} />
            ))}
        </div>
    </div>
  );
}

export default MyTrips;
