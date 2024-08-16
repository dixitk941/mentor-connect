import React from 'react';

const Hero = () => {
  return (
    <div 
      className="relative bg-cover bg-center h-screen text-white flex items-center justify-center" 
      style={{ backgroundImage: `url('../assets/Hero.png')` }} // Directly using the path to the image
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
