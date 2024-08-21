import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase';
import MenteeForm from './MenteeForm';

const MentorSearch = () => {
  const [mentors, setMentors] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [menteeDetails, setMenteeDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMentors = async () => {
      const querySnapshot = await getDocs(collection(db, 'mentors'));
      const mentorsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMentors(mentorsList);
    };

    fetchMentors();
  }, []);

  useEffect(() => {
    if (menteeDetails.field || menteeDetails.age) {
      const filtered = mentors.filter(mentor => {
        const matchesField = menteeDetails.field ? mentor.field === menteeDetails.field : true;
        const matchesAge = menteeDetails.age ? mentor.age <= menteeDetails.age : true;
        return matchesField && matchesAge;
      });
      setFilteredMentors(filtered);
    } else {
      setFilteredMentors(mentors);
    }
  }, [menteeDetails, mentors]);

  const handleMentorClick = (mentor) => {
    navigate(`/mentor-profile/${mentor.id}`, { state: { mentor } });
  };

  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <MenteeForm setMenteeDetails={setMenteeDetails} />
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Mentors</h1>
      <div className="mt-6 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredMentors.map((mentor) => (
          <div
            key={mentor.id}
            className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow duration-300"
            onClick={() => handleMentorClick(mentor)}
          >
            <div className="flex items-center space-x-4">
              {mentor.photoURL ? (
                <img
                  src={mentor.photoURL}
                  alt={`${mentor.name}'s profile`}
                  className="h-20 w-20 rounded-full object-cover"
                />
              ) : (
                <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{mentor.name}</h3>
                <p className="text-sm text-gray-600">{mentor.role || 'Role not specified'}</p>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="text-md font-semibold text-gray-900">Bio</h4>
              <p className="text-sm text-gray-600">{mentor.bio || 'Bio not provided'}</p>
            </div>
            <div className="mt-4">
              <h4 className="text-md font-semibold text-gray-900">Expertise</h4>
              <p className="text-sm text-gray-600">{mentor.expertise || 'Expertise not specified'}</p>
            </div>
            <div className="mt-4">
              <h4 className="text-md font-semibold text-gray-900">Field</h4>
              <p className="text-sm text-gray-600">{mentor.field || 'Field not specified'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentorSearch;
