import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase'; // Adjust the path as necessary

const MentorSearch = () => {
  const [mentors, setMentors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMentors = async () => {
      const querySnapshot = await getDocs(collection(db, 'mentors'));
      const mentorsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMentors(mentorsList);
    };

    fetchMentors();
  }, []);

  const handleMentorClick = (mentor) => {
    navigate(`/mentor-profile/${mentor.id}`, { state: { mentor } });
  };

  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Mentor Search</h1>
        <ul className="space-y-4">
          {mentors.map((mentor) => (
            <li 
              key={mentor.id} 
              onClick={() => handleMentorClick(mentor)} 
              className="p-4 border rounded-lg shadow-lg hover:bg-gray-100 cursor-pointer transition duration-200 ease-in-out transform hover:scale-105"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <img className="h-12 w-12 rounded-full" src={mentor.photoURL || 'https://via.placeholder.com/150'} alt={mentor.name} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{mentor.name}</h2>
                  <p className="text-gray-600">{mentor.expertise}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        />
      </div>
    </div>
  );
};

export default MentorSearch;