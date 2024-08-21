import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';

const Lobby = () => {
  const [username, setUsername] = useState('');
  const [meetingLink, setMeetingLink] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && meetingLink) {
      navigate(`/meeting-room?username=${username}&link=${meetingLink}`);
    } else {
      alert('Please enter both username and meeting link.');
    }
  };

  return (
    <div>
      <Hero />
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Join Meeting</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Meeting Link:</label>
            <input
              type="text"
              value={meetingLink}
              onChange={(e) => setMeetingLink(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
          >
            Join Meeting
          </button>
        </form>
      </div>
    </div>
  );
};

export default Lobby;