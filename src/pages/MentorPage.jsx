import React from 'react';
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { TERipple } from 'tw-elements-react';

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
  }
];

const MentorCard = ({ mentor }) => (
  <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 m-4 w-full md:w-1/2 lg:w-1/3">
    <a href="#!">
      <img className="rounded-t-lg w-full h-48 object-cover" src={mentor.image} alt={mentor.name} />
    </a>
    <div className="p-6">
      <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50 text-center">
        {mentor.name}
      </h5>
      <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200 text-center">
        {mentor.title}
      </p>
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
        <TERipple>
          <Link to={`/mentor/${mentor.id}`}>
            <button
              type="button"
              className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
              View Details
            </button>
          </Link>
        </TERipple>
      </div>
    </div>
  </div>
);

const MentorPage = () => (
  <div className="flex flex-wrap justify-center">
    {mentors.map((mentor) => (
      <MentorCard key={mentor.id} mentor={mentor} />
    ))}
  </div>
);

export default MentorPage;