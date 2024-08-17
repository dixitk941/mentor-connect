import React from "react";

const WhatWeProvide = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h2 className="text-3xl font-bold text-center mb-8">What We Provide</h2>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">Mentorship</h3>
          <p>
            Access to experienced mentors in your field of interest. Receive personalized guidance
            and advice.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">Resources</h3>
          <p>
            A wealth of resources including articles, tutorials, and tools to help you on your
            journey.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">Networking</h3>
          <p>
            Opportunities to connect with peers and industry professionals. Build your network and
            grow your career.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">Career Growth</h3>
          <p>
            Guidance on career advancement, job search strategies, and skill development.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhatWeProvide;
