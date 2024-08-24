import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import { db, storage } from '../firebase'; // Ensure you have the correct path to your firebase config
import { MenteeContext } from '../context/MenteeContext';
import { addDoc, collection, query, where, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const socket = io('http://localhost:5000'); // Replace with your server URL

const Chat = () => {
  const { menteeId } = useContext(MenteeContext);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'chats'), where('menteeId', '==', menteeId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chats = snapshot.docs.map(doc => doc.data());
      setMessages(chats);
    });

    socket.on('message', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      unsubscribe();
      socket.off('message');
    };
  }, [menteeId]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === '' && !file) return;

    let fileUrl = null;
    if (file) {
      const fileRef = ref(storage, `chats/${menteeId}/${uuidv4()}_${file.name}`);
      await uploadBytes(fileRef, file);
      fileUrl = await getDownloadURL(fileRef);
    }

    const newMessage = {
      menteeId,
      message,
      fileUrl,
      timestamp: new Date(),
    };

    await addDoc(collection(db, 'chats'), newMessage);
    socket.emit('message', newMessage);

    setMessage('');
    setFile(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Chat</h1>
      <div className="chat-box bg-gray-100 p-4 rounded-lg mb-4">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <p className="text-gray-800">{msg.message}</p>
            {msg.fileUrl && (
              <a href={msg.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                Download File
              </a>
            )}
            <p className="text-gray-500 text-sm">{new Date(msg.timestamp.seconds * 1000).toLocaleString()}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="flex flex-col space-y-2">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
          placeholder="Type your message..."
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="p-2 border border-gray-300 rounded-md"
        />
        <button type="submit" className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;