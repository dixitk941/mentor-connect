import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header'
const Lobby = () => {
  const [username, setUsername] = useState('');
  const [meetingLink, setMeetingLink] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && meetingLink) {
      history.push(`/meeting-room?username=${username}&link=${meetingLink}`);
    } else {
      alert('Please enter both username and meeting link.');
    }
  };

  return (

    <div>
        <Header />
    
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Join Meeting</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your username"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="meetingLink">
            Meeting Link
          </label>
          <input
            type="text"
            id="meetingLink"
            value={meetingLink}
            onChange={(e) => setMeetingLink(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter the meeting link"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Join Meeting
        </button>
      </form>
    </div>
    </div>
  );
};

export default Lobby;