import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import Header from '../components/Header'; // Ensure the path to Header is correct
import LoginPrompt from '../components/Login'; // Ensure the path to LoginPrompt is correct

const LoginPage = () => {
  const [showPopup, setShowPopup] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleRedirectToLogin = () => {
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div>
      <Header />
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4">Please Login to Access the Dashboard</h2>
            {/* <LoginPrompt /> */}
            <button
              onClick={handleRedirectToLogin}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Go to Login Page
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
