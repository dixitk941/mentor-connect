import React, { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

const BecomeMentor = () => {
  const [formData, setFormData] = useState({
    name: "",
    expertise: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "mentors"), {
        name: formData.name,
        expertise: formData.expertise,
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        type="text"
        name="expertise"
        value={formData.expertise}
        onChange={handleChange}
        placeholder="Expertise"
      />
      <button type="submit">Become a Mentor</button>
    </form>
  );
};

export default BecomeMentor;