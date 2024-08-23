import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';
import { v4 as uuidv4 } from 'uuid';
import emailjs from 'emailjs-com';
import { MenteeContext } from '../context/MenteeContext';

const MentorProfile = () => {
  const { state } = useLocation();
  const { mentor } = state;
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [menteeLink, setMenteeLink] = useState('');

  const { menteeId } = useContext(MenteeContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const roomId = uuidv4();
    const meetingBaseUrl = 'https://yourapp.com/meeting-room?link=';
    const generatedMenteeLink = `${meetingBaseUrl}${roomId}`;
    const mentorLink = `${meetingBaseUrl}${roomId}R`;

    try {
      const menteeEmail = email;
      const mentorEmail = mentor.email;

      await addDoc(collection(db, 'meetings'), {
        mentee: {
          id: menteeId,
          fullName,
          email,
          mobileNumber,
          date,
          time,
          meetingLink: generatedMenteeLink,
          mentorProfile: mentor,
        },
        mentor: {
          email: mentorEmail,
          meetingLink: mentorLink,
          menteeDetails: {
            fullName,
            email,
            mobileNumber,
            date,
            time,
          },
        },
      });

      setMenteeLink(generatedMenteeLink);

      const emailParams = {
        mentee_email: menteeEmail,
        mentor_email: mentorEmail,
        mentee_link: generatedMenteeLink,
        mentor_link: mentorLink,
      };

      await emailjs.send('service_1spo0b8', 'template_cmzswxc', emailParams, '2mradEnYwVyRRLCbt');

      setMessage('Meeting scheduled successfully.');
      setError('');
      console.log('Meeting created and emails sent successfully');
    } catch (error) {
      console.error('Error scheduling meeting:', error);
      if (error.response && error.response.data) {
        setError('Error scheduling meeting: ' + error.response.data.message);
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
      setMessage('');
    }
  };

  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <Header />
      <div className="max-w-lg mx-auto mt-8 p-6 bg-white border border-gray-200 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Schedule Meeting</h2>
        <div className="space-y-2 mb-6">
          <p className="text-lg"><span className="font-semibold text-gray-700">Name:</span> {mentor.name}</p>
          <p className="text-lg"><span className="font-semibold text-gray-700">Expertise:</span> {mentor.expertise}</p>
          <p className="text-lg"><span className="font-semibold text-gray-700">Bio:</span> {mentor.bio}</p>
          {menteeLink && (
            <p className="text-lg"><span className="font-semibold text-gray-700">Meeting Link:</span> <a href={menteeLink} target="_blank" rel="noopener noreferrer" className="text-blue-500">{menteeLink}</a></p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name:</label>
            <input 
              type="text" 
              value={fullName} 
              onChange={(e) => setFullName(e.target.value)} 
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Mobile Number:</label>
            <input 
              type="tel" 
              value={mobileNumber} 
              onChange={(e) => setMobileNumber(e.target.value)} 
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Date:</label>
            <input 
              type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Time:</label>
            <input 
              type="time" 
              value={time} 
              onChange={(e) => setTime(e.target.value)} 
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
          >
            Schedule Meeting
          </button>
        </form>
        {message && <p className="mt-4 text-green-500">{message}</p>}
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default MentorProfile;
