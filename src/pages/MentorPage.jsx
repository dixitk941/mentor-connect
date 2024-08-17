import React from 'react';
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const mentors = [
  {
    id: 1,
    name: 'John Doe',
    title: 'Senior Software Engineer',
    bio: 'John has over 10 years of experience in software development and specializes in full-stack development.',
    linkedin: 'https://linkedin.com/in/johndoe',
    twitter: 'https://twitter.com/johndoe',
    github: 'https://github.com/johndoe',
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 2,
    name: 'Jane Smith',
    title: 'Data Scientist',
    bio: 'Jane is a data scientist with a passion for machine learning and artificial intelligence.',
    linkedin: 'https://linkedin.com/in/janesmith',
    twitter: 'https://twitter.com/janesmith',
    github: 'https://github.com/janesmith',
    image: 'https://via.placeholder.com/150'
  },
  // Add more mentors as needed
];

const MentorCard = ({ mentor }) => (
  <div className="bg-white shadow-md rounded-lg p-6 m-4 w-full md:w-1/2 lg:w-1/3">
    <img className="w-32 h-32 rounded-full mx-auto" src={mentor.image} alt={mentor.name} />
    <h2 className="text-xl font-semibold text-center mt-4">{mentor.name}</h2>
    <p className="text-center text-gray-600">{mentor.title}</p>
    <p className="text-center text-gray-600 mt-2">{mentor.bio}</p>
    <div className="flex justify-center mt-4 space-x-4">
      <a href={mentor.linkedin} target="_blank" rel="noopener noreferrer">
        <FaLinkedin className="text-blue-600" size={24} />
      </a>
      <a href={mentor.twitter} target="_blank" rel="noopener noreferrer">
        <FaTwitter className="text-blue-400" size={24} />
      </a>
      <a href={mentor.github} target="_blank" rel="noopener noreferrer">
        <FaGithub className="text-gray-800" size={24} />
      </a>
    </div>
    <div className="flex justify-center mt-4">
      <Link to={`/mentor/${mentor.id}`} className="text-blue-500 hover:underline">
        View Details
      </Link>
    </div>
  </div>
);

const MentorPage = () => (
  <div className="min-h-screen bg-gray-100 p-8">
    <h1 className="text-3xl font-bold text-center mb-8">Our Mentors</h1>
    <div className="flex flex-wrap justify-center">
      {mentors.map((mentor, index) => (
        <MentorCard key={index} mentor={mentor} />
      ))}
    </div>
  </div>
);

export default MentorPage;