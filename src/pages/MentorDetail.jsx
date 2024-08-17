import React from 'react';
import { useParams } from 'react-router-dom';
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';


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

const MentorDetail = () => {
  const { id } = useParams();
  const mentor = mentors.find((mentor) => mentor.id === parseInt(id));

  if (!mentor) {
    return <div>Mentor not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white shadow-md rounded-lg p-6 m-4 max-w-md mx-auto">
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
      </div>
    </div>
  );
};

export default MentorDetail;