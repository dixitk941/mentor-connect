import React from 'react';

const Hero = () => {
  return (
    <div 
      className="relative bg-cover bg-center h-screen text-white flex items-center justify-center"
      style={{
        backgroundImage: `
          url('https://firebasestorage.googleapis.com/v0/b/mentor-connect-74cc5.appspot.com/o/Hero.png?alt=media&token=aa24b32b-338a-4dc4-8eec-45a00be7fc77')`, // Desktop

        '@media (max-width: 1024px)': {
          backgroundImage: `
          url('https://firebasestorage.googleapis.com/v0/b/mentor-connect-74cc5.appspot.com/o/Hero(tablet).png?alt=media&token=41571eb1-d6c3-42c5-9b3b-13f5f24aa946')`, // Tablet
        },

        '@media (max-width: 768px)': {
          backgroundImage: `
          url('https://firebasestorage.googleapis.com/v0/b/mentor-connect-74cc5.appspot.com/o/Hero(mobile).png?alt=media&token=dcd23918-bb21-4b2c-9d18-e055a2947006')`, // Mobile
        }
      }}
    >
      <div className="relative z-10 text-center">
        <h1 className="text-6xl font-extrabold mb-4 animate-fade-in">Welcome to Mentor Connect</h1>
        <p className="text-2xl mb-8 animate-fade-in delay-1s">Connecting mentors and mentees for a brighter future.</p>
        <button className="bg-white text-blue-500 font-bold py-3 px-6 rounded-full shadow-lg hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out transform hover:scale-105">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Hero;
