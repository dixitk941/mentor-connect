import React, { useState, useRef, useEffect } from 'react';
import SimplePeer from 'simple-peer';
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaPhoneSlash } from 'react-icons/fa';
import { db } from './firebase'; // Import Firestore
import { v4 as uuidv4 } from 'uuid'; // Import UUID for generating unique links

const MeetingRoom = () => {
  const [stream, setStream] = useState(null);
  const [peer, setPeer] = useState(null);
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [username, setUsername] = useState('');
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();

  useEffect(() => {
    startVideo();
    const urlParams = new URLSearchParams(window.location.search);
    const link = urlParams.get('link');
    const username = urlParams.get('username');
    setUsername(username);
    if (link) {
      joinRoom(link);
    }
  }, []);

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Error accessing media devices.', err);
    }
  };

  const joinRoom = async (link) => {
    const isMentor = link.endsWith('R');
    const roomId = isMentor ? link.slice(0, -1) : link;

    try {
      const doc = await db.collection('meetings').doc(roomId).get();
      if (doc.exists) {
        const data = doc.data();
        const signal = isMentor ? data.menteeLink : data.mentorLink;
        joinPeer(signal);
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error joining room:', error);
    }
  };

  const createPeer = () => {
    const peer = new SimplePeer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on('signal', data => {
      console.log('SIGNAL', JSON.stringify(data));
    });

    peer.on('stream', stream => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = stream;
      }
    });

    setPeer(peer);
  };

  const joinPeer = (signal) => {
    const peer = new SimplePeer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on('signal', data => {
      console.log('SIGNAL', JSON.stringify(data));
    });

    peer.on('stream', stream => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = stream;
      }
    });

    peer.signal(signal);
    setPeer(peer);
  };

  const toggleMic = () => {
    if (stream) {
      stream.getAudioTracks()[0].enabled = !micOn;
      setMicOn(!micOn);
    }
  };

  const toggleCamera = () => {
    if (stream) {
      stream.getVideoTracks()[0].enabled = !cameraOn;
      setCameraOn(!cameraOn);
    }
  };

  const endCall = () => {
    if (peer) {
      peer.destroy();
      setPeer(null);
    }
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  return (
    <div className="relative w-full h-screen bg-gray-900">
      <video ref={localVideoRef} autoPlay muted className="w-full h-full object-cover" />
      <video ref={remoteVideoRef} autoPlay className="absolute bottom-4 right-4 w-32 h-32 border border-gray-300 rounded-lg" />
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4 bg-gray-800 bg-opacity-75 p-2 rounded-lg">
        <button onClick={toggleMic} className="bg-blue-500 text-white p-2 rounded-full shadow-lg">
          {micOn ? <FaMicrophone size={20} /> : <FaMicrophoneSlash size={20} />}
        </button>
        <button onClick={toggleCamera} className="bg-blue-500 text-white p-2 rounded-full shadow-lg">
          {cameraOn ? <FaVideo size={20} /> : <FaVideoSlash size={20} />}
        </button>
        <button onClick={endCall} className="bg-red-500 text-white p-2 rounded-full shadow-lg">
          <FaPhoneSlash size={20} />
        </button>
      </div>
      <div className="absolute top-4 left-4 text-white">
        <h2 className="text-xl font-bold">Welcome, {username}</h2>
      </div>
    </div>
  );
};

export default MeetingRoom;