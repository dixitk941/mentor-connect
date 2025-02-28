import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';
import emailjs from 'emailjs-com';
import { MenteeContext } from '../context/MenteeContext';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

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
  const [roomID, setRoomID] = useState('');

  const { menteeId } = useContext(MenteeContext);

  const generateMeetingLink = () => {
    const appID = 1748192658;
    const serverSecret = "d6408c4eaa4e991d1416039e57c49e10";
    const generatedRoomID = roomID || Math.random().toString(36).substring(2, 7);
    const userID = Math.random().toString(36).substring(2, 7);
    const userName = "userName" + userID;
    const generatedKitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, generatedRoomID, userID, userName);

    setRoomID(generatedRoomID);
    return `https://mcmeetingroom.vercel.app/?roomID=${generatedRoomID}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const meetingLink = generateMeetingLink();
      setMenteeLink(meetingLink);
  
      await addDoc(collection(db, 'appointments'), {
        fullName,
        email,
        mobileNumber,
        date,
        time,
        message,
        mentorId: mentor.id,
        menteeId,
        roomID,
        menteeLink: meetingLink,
      });
  
      // Notice about email service unavailability
      setError('Notice: service is temporarily not available.');
  
      setFullName('');
      setEmail('');
      setMobileNumber('');
      setDate('');
      setTime('');
      setMessage('');
    } catch (e) {
      setError('Error adding document: ' + e.message);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold text-center mb-8">Mentor Profile</h2>
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">Mentor Details</h3>
          <p className="text-gray-700"><strong>Name:</strong> {mentor.name}</p>
          <p className="text-gray-700"><strong>Email:</strong> {mentor.email}</p>
          <p className="text-gray-700"><strong>Expertise:</strong> {mentor.expertise}</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-gray-700 font-bold">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full mt-2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full mt-2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold">Mobile Number</label>
              <input
                type="text"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
                className="w-full mt-2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full mt-2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold">Time</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                className="w-full mt-2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full mt-2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            className="w-full mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300 ease-in-out"
          >
            Submit
          </button>
        </form>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        {menteeLink && (
          <p className="text-center mt-8">
            Meeting Link:{' '}
            <a href={menteeLink} className="text-blue-500 underline">
              {menteeLink}
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default MentorProfile;
