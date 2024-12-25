import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { logout } from '../store';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const hasLoggedOut = useRef(false); // Ref to track logout execution

  useEffect(() => {
    const handleLogout = async () => {
      if (hasLoggedOut.current || !token) return; // Prevent multiple calls

      hasLoggedOut.current = true; // Mark as executed

      try {
        // Log the token for debugging
        console.log('Token:', token);

        // Call the logout API if the token exists
        await axios.post(
          'http://localhost:8000/api/auth/logout',
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Clear the Redux state
        dispatch(logout());
        localStorage.removeItem('token');
        // Redirect to login
        navigate('/login');
      } catch (error) {
        console.error('Logout error:', error.response || error.message);
        alert('An error occurred while logging out. Please try again.');

        // Redirect back to dashboard if logout fails
        navigate('/dashboard');
      }
    };

    handleLogout(); // Trigger the logout process
  }, [token, dispatch, navigate]);

  
  return (
    <div>
      <h2>Logging Out...</h2>
    </div>
  );
};

export default Logout;
