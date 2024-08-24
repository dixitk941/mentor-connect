// MentorList.js
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';

const MentorList = () => {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    const fetchMentors = async () => {
      const mentorCollection = collection(db, 'mentors');  // Assuming 'mentors' is the name of the collection
      const mentorSnapshot = await getDocs(mentorCollection);
      const mentorList = mentorSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMentors(mentorList);
    };

    fetchMentors();
  }, []);

  return (
    <div>
      <h2>Mentors</h2>
      <ul>
        {mentors.map(mentor => (
          <li key={mentor.id}>
            <p>Name: {mentor.name}</p>
            <p>Expertise: {mentor.expertise.label}</p> {/* Assuming expertise is an object */}
            {/* Render other mentor details here */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MentorList;
