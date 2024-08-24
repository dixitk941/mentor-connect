import React, { useState, useEffect, useContext } from 'react';
import { db } from '../firebase'; // Ensure you have the correct path to your firebase config
import { MenteeContext } from '../context/MenteeContext';
import { addDoc, collection, query, where, onSnapshot } from 'firebase/firestore';

const Notes = () => {
  const { menteeId } = useContext(MenteeContext);
  const [note, setNote] = useState('');
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'notes'), where('menteeId', '==', menteeId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedNotes = snapshot.docs.map(doc => doc.data());
      setNotes(fetchedNotes);
    });

    return () => {
      unsubscribe();
    };
  }, [menteeId]);

  const handleSaveNote = async (e) => {
    e.preventDefault();
    if (note.trim() === '') return;

    const newNote = {
      menteeId,
      note,
      timestamp: new Date(),
    };

    await addDoc(collection(db, 'notes'), newNote);
    setNote('');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Notes</h1>
      <div className="notes-box bg-gray-100 p-4 rounded-lg mb-4">
        {notes.map((note, index) => (
          <div key={index} className="mb-2">
            <p className="text-gray-800">{note.note}</p>
            <p className="text-gray-500 text-sm">{new Date(note.timestamp.seconds * 1000).toLocaleString()}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSaveNote} className="flex flex-col space-y-2">
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
          placeholder="Type your note..."
        />
        <button type="submit" className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600">
          Save Note
        </button>
      </form>
    </div>
  );
};

export default Notes;