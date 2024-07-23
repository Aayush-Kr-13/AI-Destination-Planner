import React from 'react';
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="relative flex flex-col items-center mx-8 md:mx-56 gap-9 z-10">
      <h1 className='font-extrabold text-4xl md:text-[60px] text-center mt-16 leading-tight transition-transform transform hover:scale-105'>
        <span className='text-[#f56551]'>Discover Your Next Adventure with AI:</span> 
        <span className="block">Personalized Itineraries at Your Fingertips</span>
      </h1>
      <p className='text-lg md:text-xl text-gray-500 text-center mt-4 transition-opacity duration-300 hover:opacity-90'>
        Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
      </p>
      <Link to={'/create-trip'}>
        <Button className="mt-6 bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white py-3 px-6 rounded-full shadow-lg transform transition-transform hover:scale-110">
          Get Started, It's Free
        </Button>
      </Link>
    </div>
  );
}

export default Hero;
