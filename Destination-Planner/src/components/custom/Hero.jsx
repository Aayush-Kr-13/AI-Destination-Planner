import React from 'react';
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles
import Footer from '@/view-trip/components/Footer';

function Hero() {
  return (
    <div className="relative flex flex-col items-center gap-9 z-10">
      {/* Background video */}
      <video autoPlay loop muted className="absolute inset-0 w-full h-[65vh] object-cover z-0">
        <source src="Hero_Video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay to darken the video for better readability of text */}
      <div className="absolute inset-0 h-[65vh] bg-black opacity-60 z-10"></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center gap-9 h-[65vh]">
        <h1 className='font-extrabold text-4xl md:text-[60px] text-center mt-16 leading-tight transition-transform transform hover:scale-105 text-white'>
          <span className='text-orange-500'>Discover Your Next Adventure with AI:</span> 
          <span className="block">Personalized Itineraries at Your Fingertips</span>
        </h1>
        <p className='text-lg md:text-xl text-gray-300 text-center mt-4 transition-opacity duration-300 hover:opacity-90'>
          Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
        </p>
        <Link to={'/create-trip'}>
          <Button className="mt-6 bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white py-4 px-7 rounded-full shadow-lg transform transition-transform hover:scale-110">
            Get Started, It's Free
          </Button>
        </Link>
      </div>

      {/* Carousel */}
      <div className="relative z-20 w-full">
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          showIndicators={false}
          className="carousel"
        >
          <div className="carousel-grid">
            <img src="/b1.avif" alt="Image 1" className="carousel-img" />
            <img src="/b2.avif" alt="Image 2" className="carousel-img" />
            <img src="/b3.avif" alt="Image 3" className="carousel-img" />
          </div>
          <div className="carousel-grid">
            <img src="/b4.avif" alt="Image 4" className="carousel-img" />
            <img src="/b5.avif" alt="Image 5" className="carousel-img" />
            <img src="/b6.avif" alt="Image 6" className="carousel-img" />
          </div>
        </Carousel>
      </div>
      <Footer/>
    </div>
  );
}

export default Hero;
