import React from 'react';
import { Link } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';

// Tailwind-styled LoginNavigationLink component with box-like hover effect
export const LoginNavigationLink = () => {
  return (
    <div className="flex gap-4">
      <Link to='/login' className="text-white hover:bg-blue-500 hover:text-white px-4 py-2 rounded transition-all duration-300">
        Login
      </Link>
      <Link to='/signup' className="text-white hover:bg-green-500 hover:text-white px-4 py-2 rounded transition-all duration-300">
        Signup
      </Link>
    </div>
  );
};

// Tailwind-styled LogoutNavigationLink component with box-like hover effect
export const LogoutNavigationLink = () => {
  const auth = useAuth();
  return (
    <div className="flex gap-4">
      <Link to='/chat' className="text-white hover:bg-purple-500 hover:text-white px-4 py-2 rounded transition-all duration-300">
        Go To Chat
      </Link>
      <Link to='/' onClick={auth.logout} className="text-white hover:bg-red-500 hover:text-white px-4 py-2 rounded transition-all duration-300">
        Logout
      </Link>
    </div>
  );
};
