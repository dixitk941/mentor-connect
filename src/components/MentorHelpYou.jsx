import React from 'react';
import { FaHandsHelping, FaLightbulb } from 'react-icons/fa';

const MentorHelpYou = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
          <div className="flex items-center justify-center mb-6">
            <FaLightbulb className="text-blue-600 text-4xl mr-2" />
            <h2 className="text-3xl font-extrabold text-center text-blue-600">How Our Program Works</h2>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            Our program is designed to provide comprehensive support and guidance to individuals seeking to enhance their skills and knowledge. We offer a structured approach that includes personalized mentorship, hands-on projects, and continuous feedback to ensure that you achieve your goals.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            The program is divided into several phases, each focusing on different aspects of your development. From foundational skills to advanced techniques, we cover a wide range of topics to help you become proficient in your chosen field. Our mentors are experienced professionals who are dedicated to helping you succeed.
          </p>
        </div>
        <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
          <div className="flex items-center justify-center mb-6">
            <FaHandsHelping className="text-blue-600 text-4xl mr-2" />
            <h2 className="text-3xl font-extrabold text-center text-blue-600">How We Help You</h2>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            We provide personalized mentorship tailored to your specific needs and goals. Our mentors work closely with you to identify your strengths and areas for improvement, creating a customized plan to help you achieve your objectives.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            In addition to mentorship, we offer a variety of resources and tools to support your learning journey. From online courses and tutorials to hands-on projects and real-world applications, we ensure that you have everything you need to succeed. Our community of learners and mentors is always available to provide support, answer questions, and share insights.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MentorHelpYou;