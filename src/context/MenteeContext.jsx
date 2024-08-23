import React, { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const MenteeContext = createContext();

export const MenteeProvider = ({ children }) => {
  const [menteeId, setMenteeId] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setMenteeId(user.uid); // Use Firebase user ID as mentee ID
      } else {
        setMenteeId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <MenteeContext.Provider value={{ menteeId }}>
      {children}
    </MenteeContext.Provider>
  );
};
