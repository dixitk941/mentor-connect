import React from "react";

const MenteeSurvey = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Mentee Survey</h2>
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSfN0Rv8OyzOH6HZzQ7XYfB-S6AdPPL6Ep4J_mQ/embed?embedded=true"
          width="100%"
          height="600"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
          className="w-full h-full border-0"
        >
          Loading…
        </iframe>
      </div>
    </div>
  );
};

export default MenteeSurvey;
