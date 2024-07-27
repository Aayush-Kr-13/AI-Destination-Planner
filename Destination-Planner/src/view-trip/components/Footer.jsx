import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS

function Footer() {
  return (
    <footer className="bg-gray-200 py-6 shadow-lg mt-8 w-full border-t border-gray-300">
      <div className="container mx-auto text-center">
        <h2 className="text-orange-600 text-xl font-bold mb-4">
          🚀 Created By
        </h2>
        <div className="flex justify-center items-center space-x-6">
          <a 
            href="https://www.linkedin.com/in/avinav-kashyap-826422249/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center text-gray-800 hover:text-orange-600 transition-colors duration-300"
          >
            <i className="fab fa-linkedin fa-2x mr-2"></i>
            <span className="text-lg font-semibold">Avinav</span>
          </a>
          <a 
            href="https://www.linkedin.com/in/aayush-kumar-904967218/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center text-gray-800 hover:text-orange-600 transition-colors duration-300"
          >
            <i className="fab fa-linkedin fa-2x mr-2"></i>
            <span className="text-lg font-semibold">Aayush</span>
          </a>
        </div>
        <p className="text-gray-700 mt-4">
          @AI Trip Planner App
        </p>
      </div>
    </footer>
  );
}

export default Footer;
