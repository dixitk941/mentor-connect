import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MenteeForm from '../components/MenteeForm';
import MentorSearch from '../components/MentorSearch';
import Header from '../components/Header';
import { MenteeContext } from '../context/MenteeContext';
import Modal from '../components/LoginPrompt';

const MenteeDashboard = () => {
  const [menteeDetails, setMenteeDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { menteeId } = useContext(MenteeContext);

  useEffect(() => {
    if (menteeId) {
      // Fetch mentee details or perform other actions
      setLoading(false);
    } else {
      // Show modal if menteeId is not available
      setShowModal(true);
      setLoading(false);
    }
  }, [menteeId]);

  const handleMentorSelect = (mentor) => {
    navigate(`/mentor-profile/${mentor.id}`, { state: { mentor, menteeId } });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    // Optionally navigate to a different page or handle the lack of menteeId
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-8 space-y-8">
      <Header />
      {!menteeDetails ? (
        <MenteeForm setMenteeDetails={setMenteeDetails} />
      ) : (
        <MentorSearch
          menteeDetails={menteeDetails}
          onMentorSelect={handleMentorSelect}
          menteeId={menteeId}
        />
      )}
      {showModal && (
        <Modal
          message="You must be logged in to access this page. Please log in or register."
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default MenteeDashboard;
