import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '@/service/firebaseConfig';
import { toast } from '@/components/ui/use-toast';

function Viewtrip() {
  const { tripId } = useParams();

  const GetTripData = useCallback(async () => {
    const docRef = doc(db, 'AllTrips', tripId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document:", docSnap.data());
    } else {
      console.log("No Such Document");
      toast({ title: "No trip found", description: "Please check your trip ID." });
    }
  }, [tripId]);

  useEffect(() => {
    if (tripId) {
      GetTripData();
    }
  }, [tripId, GetTripData]);

  return (
    <div>Viewtrip: {tripId}</div>
  );
}

export default Viewtrip;
