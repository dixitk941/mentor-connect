import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenteeForm from '../components/MenteeForm';
import MentorSearch from '../components/MentorSearch';
import Header from '../components/Header'

const MenteeDashboard = () => {
  const [menteeDetails, setMenteeDetails] = useState(null);
  const navigate = useNavigate();

  const handleMentorSelect = (mentor) => {
    navigate(`/mentor-profile/${mentor.id}`, { state: { mentor } });
  };

  return (
    <div className="p-8 space-y-8">
      <Header />
     
      {!menteeDetails && <MenteeForm setMenteeDetails={setMenteeDetails} />}
      {menteeDetails && <MentorSearch menteeDetails={menteeDetails} onMentorSelect={handleMentorSelect} />}
    </div>
  );
};

export default MenteeDashboard;