import React from 'react';
import { Button } from '../ui/button';
import { useClerk, useUser } from '@clerk/clerk-react';
import { FcGoogle } from 'react-icons/fc';

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
      <div className='flex items-center gap-4'>
        {isSignedIn ? (
          <>
            {/* Display the user's profile picture */}
            {user.imageUrl && (
              <img
                src={user.imageUrl}
                alt="Profile"
                className="w-8 h-8 rounded-full"
              />
            )}
            <Button onClick={handleSignOut} className="bg-red-500 text-white hover:bg-red-700">
              Sign Out
            </Button>
          </>
        ) : (
          <Button onClick={handleSignIn} className="flex gap-2 items-center">
            <FcGoogle className='h-5 w-5' /> Sign In
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
