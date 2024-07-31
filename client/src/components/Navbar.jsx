// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-gradient-to-r from-purple-400 to-blue-500 p-4 flex justify-between items-center">
      <h1 className="text-2xl text-white font-bold">Employee Management</h1>
      <div>
        {!user ? (
          <Link to="/auth" className="text-white px-4 py-2 rounded bg-purple-600 hover:bg-purple-700">
            Login/Register
          </Link>
        ) : (
          <div className="relative">
            <span className="text-white px-4 py-2 rounded bg-purple-600">
              {user.username}
            </span>
            <button
              onClick={handleLogout}
              className="absolute right-0 mt-2 py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
