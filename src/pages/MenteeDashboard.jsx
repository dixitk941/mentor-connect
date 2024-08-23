import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import MenteeForm from '../components/MenteeForm';
import MentorSearch from '../components/MentorSearch';
import Header from '../components/Header';
import { MenteeContext } from '../context/MenteeContext';

const MenteeDashboard = () => {
  const [menteeDetails, setMenteeDetails] = useState(null);
  const navigate = useNavigate();
  const { menteeId } = useContext(MenteeContext);

  const handleMentorSelect = (mentor) => {
    navigate(`/mentor-profile/${mentor.id}`, { state: { mentor, menteeId } });
  };

  return (
    <div className="p-8 space-y-8">
      <Header />

      {!menteeDetails && <MenteeForm setMenteeDetails={setMenteeDetails} />}
      {menteeDetails && (
        <MentorSearch
          menteeDetails={menteeDetails}
          onMentorSelect={handleMentorSelect}
          menteeId={menteeId}
        />
      )}
    </div>
  );
};

export default MenteeDashboard;