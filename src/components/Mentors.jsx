import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Mentors = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'mentors'));
        const mentorsList = querySnapshot.docs.map(doc => doc.data());
        setMentors(mentorsList);
        setLoading(false);
      } catch (error) {
        setError('Failed to load mentors. Please try again later.');
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet Our Mentors</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our mentors are industry leaders and experts, dedicated to guiding you on your professional journey. 
            Get to know them and take your next step towards success.
          </p>
        </div>
        <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
          {mentors.map((mentor, index) => (
            <li key={index} className="flex items-center gap-x-6">
              {mentor.photoURL ? (
                <img alt={`${mentor.name}'s profile`} src={mentor.photoURL} className="h-16 w-16 rounded-full" />
              ) : (
                <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
              <div>
                <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{mentor.name}</h3>
                <p className="text-sm font-semibold leading-6 text-indigo-600">{mentor.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Mentors;
