import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="text-sm text-gray-400">
            &copy; 2024 Mentor Connect. All rights reserved.
          </p>
        </div>
        <div className="text-center md:text-right">
          <p className="text-sm text-gray-400">
            Created by <a href="https://neocodenex.teach" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-600 transition duration-300">NeoCodeNex</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;