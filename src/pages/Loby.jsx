import * as React from 'react';
import { useState } from 'react';
import Header from '../components/Header'; // Make sure the path to Header is correct
import './style.css';

export default function Loby() {
  const [meetingLink, setMeetingLink] = useState('');

  const handleJoinMeeting = () => {
    if (meetingLink) {
      window.location.href = meetingLink;
    }
  };

  return (
    <div>
      <Header />
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Join a Meeting</h2>
          <input
            type="text"
            value={meetingLink}
            onChange={(e) => setMeetingLink(e.target.value)}
            placeholder="Paste your meeting link here"
            className="w-full p-2 border border-gray-300 rounded mb-4"
          />
          <button
            onClick={handleJoinMeeting}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Join Meeting
          </button>
        </div>
      </div>
    </div>
  );
}