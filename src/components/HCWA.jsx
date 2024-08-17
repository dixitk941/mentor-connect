import React from "react";

const HowWeCanHelp = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h2 className="text-3xl font-bold text-center mb-8">How We Can Help You</h2>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">For Mentors</h3>
          <p>
            Share your knowledge and guide mentees towards success. Help them grow in their careers
            and achieve their goals.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">For Mentees</h3>
          <p>
            Connect with experienced mentors who can provide guidance, support, and insights into
            your desired field.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowWeCanHelp;
