import React from 'react';
import { Button } from '../ui/button';
import { useClerk } from '@clerk/clerk-react';
import { FcGoogle } from 'react-icons/fc';
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';
import { IoMdLogOut } from 'react-icons/io';
import { Link } from 'react-router-dom';

const Header = () => {
  const { user, openSignIn, signOut } = useClerk();
  const isSignedIn = !!user;

  const handleSignIn = () => {
    openSignIn();
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5 ml-5'>
      <img src="/logo.svg" alt="Logo" />
      <a href={'/'}>
      <img 
        src="/Adventura2.png" 
        alt="Adventura" 
        style={{ width: '150px', height: '50px', marginLeft: '15px' }} // Add margin here
      />
      </a>
      <div className='flex items-center gap-4 ml-auto'>
        {isSignedIn && (
          <div className='flex items-center gap-4'>
            <a href='/create-trip'>
            <Button className="bg-white text-orange-600 border border-orange-600 hover:bg-orange-600 hover:text-white hover:shadow-lg hover:shadow-orange-500/50 font-bold transition-all duration-300">
              Create Trip
            </Button>
            </a>
            <a href='/my-trips'>
            <Button className="bg-white text-orange-600 border border-orange-600 hover:bg-orange-600 hover:text-white hover:shadow-lg hover:shadow-orange-500/50 font-bold transition-all duration-300">
              My Trips
            </Button>
            </a>
            <Popover>
              <PopoverTrigger asChild>
                <Button className="p-0 border-none bg-transparent flex items-center">
                  {user.imageUrl ? (
                    <img
                      src={user.imageUrl}
                      alt="Profile"
                      className="w-10 h-10 rounded-full"
                      style={{ backgroundColor: 'transparent' }}
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200" />
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-4 bg-white border border-gray-300 rounded-lg shadow-md">
                <Button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 text-white hover:bg-red-600"
                >
                  <IoMdLogOut className="h-5 w-5 text-red-500" /> {/* Icon in red */}
                  <span className="text-white">Sign Out</span> {/* Text in white */}
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        )}
        {!isSignedIn && (
          <Button onClick={handleSignIn} className="flex gap-2 items-center">
            <FcGoogle className='h-5 w-5' /> Sign In
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
