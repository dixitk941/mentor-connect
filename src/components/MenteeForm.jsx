import React, { useState } from 'react';

const MenteeForm = ({ setMenteeDetails }) => {
  const [field, setField] = useState('');
  const [expertise, setExpertise] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setMenteeDetails({ field, expertise, experienceLevel });
  };

  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
        <div>
          <label className="block text-sm font-medium text-gray-700">Field of Mentorship:</label>
          <select 
            value={field} 
            onChange={(e) => setField(e.target.value)} 
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select</option>
            <option value="IT">IT</option>
            <option value="NEET">NEET</option>
            <option value="Career">Career</option>
            <option value="Business">Business</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Expertise:</label>
          <input 
            type="text" 
            value={expertise} 
            onChange={(e) => setExpertise(e.target.value)} 
            placeholder="e.g., Web Development, Data Science"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Experience Level:</label>
          <select 
            value={experienceLevel} 
            onChange={(e) => setExperienceLevel(e.target.value)} 
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <button 
          type="submit" 
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
        >
          Find Mentors
        </button>
      </form>
    </div>
  );
};

export default MenteeForm;
