import React, { useState } from 'react';
import BecomeMentor from './BecomeMentor';
import JoinAsMentee from './JoinAsMentee';

const Join = () => {
  const [role, setRole] = useState('');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">How do you want to join?</h1>
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setRole('mentee')}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Join as Mentee
        </button>
        <button
          onClick={() => setRole('mentor')}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Become a Mentor
        </button>
      </div>

      <div className="w-full max-w-md">
        {role === 'mentee' && (
          <div className="bg-white p-6 rounded shadow-md">
            <JoinAsMentee />
          </div>
        )}
        {role === 'mentor' && (
          <div className="bg-white p-6 rounded shadow-md">
            <BecomeMentor />
          </div>
        )}
      </div>
    </div>
  );
};

export default Join;