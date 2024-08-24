import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase'; // Ensure you have the correct path to your firebase config
import { addDoc, collection } from 'firebase/firestore';
import { FaStar } from 'react-icons/fa';

const Feedbacks = ({ menteeId }) => {
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (feedback.trim() === '' || rating === 0) return;

    const newFeedback = {
      menteeId,
      feedback,
      rating,
      timestamp: new Date(),
    };

    await addDoc(collection(db, 'feedbacks'), newFeedback);
    setFeedback('');
    setRating(0);
    navigate('/'); // Redirect to home page
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">We value your feedback!</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="feedback">
            Your Feedback
          </label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            rows="4"
            placeholder="Write your feedback here..."
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Your Rating
          </label>
          <div className="flex">
            {[...Array(5)].map((star, index) => {
              const ratingValue = index + 1;
              return (
                <label key={index}>
                  <input
                    type="radio"
                    name="rating"
                    value={ratingValue}
                    onClick={() => setRating(ratingValue)}
                    className="hidden"
                  />
                  <FaStar
                    size={30}
                    className="cursor-pointer"
                    color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(null)}
                  />
                </label>
              );
            })}
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default Feedbacks;