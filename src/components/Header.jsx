import React from 'react';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg">
      <div className="text-2xl font-bold drop-shadow-lg">
        Mentor Connect
      </div>
      <nav>
        <ul className="flex space-x-4">
          <li><a href="#home" className="hover:underline drop-shadow-lg">Home</a></li>
          <li><a href="#about" className="hover:underline drop-shadow-lg">About</a></li>
          <li><a href="#features" className="hover:underline drop-shadow-lg">Features</a></li>
          <li><a href="#contact" className="hover:underline drop-shadow-lg">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;