// import React, { useState, useRef, useEffect, useContext } from 'react';
// import SimplePeer from 'simple-peer';
// import {
//   FaMicrophone,
//   FaMicrophoneSlash,
//   FaVideo,
//   FaVideoSlash,
//   FaPhoneSlash,
//   FaComments,
//   FaStickyNote,
//   FaExchangeAlt,
// } from 'react-icons/fa';
// import Chat from './Chat'; // Ensure the correct path to Chat component
// import Notes from './Notes'; // Ensure the correct path to Notes component
// import Feedbacks from './Feedbacks'; // Ensure the correct path to Feedbacks component
// import { MenteeContext } from '../context/MenteeContext'; // Ensure the correct path to MenteeContext
// import { db } from './firebase'; // Import Firestore
// import { arrayUnion } from 'firebase/firestore';

// import { v4 as uuidv4 } from 'uuid'; // Import UUID for generating unique links

// const MeetingRoom = () => {
//   const [stream, setStream] = useState(null);
//   const [peer, setPeer] = useState(null);
//   const [micOn, setMicOn] = useState(true);
//   const [cameraOn, setCameraOn] = useState(true);
//   const [username, setUsername] = useState('');
//   const localVideoRef = useRef();
//   const remoteVideoRef = useRef();
//   const [chatVisible, setChatVisible] = useState(false);
//   const [notesVisible, setNotesVisible] = useState(false);
//   const [controlsVisible, setControlsVisible] = useState(true);
//   const [meetingEnded, setMeetingEnded] = useState(false);
//   const [mainVideo, setMainVideo] = useState('local'); // Track which video is in the main view

//   const { menteeId } = useContext(MenteeContext); // Get menteeId from context

//   useEffect(() => {
//     startVideo();
//     const urlParams = new URLSearchParams(window.location.search);
//     const link = urlParams.get('link');
//     const username = urlParams.get('username');
//     setUsername(username);
//     if (link) {
//       joinRoom(link);
//     }

//     const hideControlsTimeout = setTimeout(() => setControlsVisible(false), 3000);

//     return () => {
//       clearTimeout(hideControlsTimeout);
//     };
//   }, []);

//   const startVideo = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//       setStream(stream);
//       if (localVideoRef.current) {
//         localVideoRef.current.srcObject = stream;
//       }
//     } catch (err) {
//       console.error('Error accessing media devices.', err);
//     }
//   };

//   const joinRoom = async (link) => {
//     const isMentor = link.endsWith('R');
//     const roomId = isMentor ? link.slice(0, -1) : link;

//     try {
//       const doc = await db.collection('meetings').doc(roomId).get();
//       if (doc.exists) {
//         const data = doc.data();
//         const signal = isMentor ? data.menteeLink : data.mentorLink;
//         joinPeer(signal);
//       } else {
//         console.log('No such document!');
//       }
//     } catch (error) {
//       console.error('Error joining room:', error);
//     }
//   };

//   const createPeer = () => {
//     const peer = new SimplePeer({
//       initiator: true,
//       trickle: true, // Enable trickling of ICE candidates
//       stream: stream,
//     });

//     peer.on('signal', async (data) => {
//       console.log('SIGNAL', JSON.stringify(data));
//       // Store the signal in the Firestore database
//       const docRef = await db.collection('meetings').add({
//         initiatorSignal: JSON.stringify(data),
//         menteeLink: null,
//         mentorLink: null,
//         iceCandidates: [],
//       });
//     });

//     peer.on('stream', (remoteStream) => {
//       if (remoteVideoRef.current) {
//         remoteVideoRef.current.srcObject = remoteStream;
//       }
//     });

//     peer.on('iceCandidate', async (candidate) => {
//       if (candidate) {
//         console.log('Sending ICE candidate:', candidate);
//         // Update the ICE candidates in the Firestore database
//         const docRef = db.collection('meetings').doc('ROOM_ID'); // Replace with actual room ID
//         await db.collection('meetings').doc(docRef.id).update({
//           iceCandidates: arrayUnion(JSON.stringify(candidate)),
//         });
//       }
//     });

//     setPeer(peer);
//   };

//   const joinPeer = (signal) => {
//     const peer = new SimplePeer({
//       initiator: false,
//       trickle: true, // Enable trickling of ICE candidates
//       stream: stream,
//     });

//     peer.on('signal', (data) => {
//       console.log('SIGNAL', JSON.stringify(data));
//       // Send the answer back to the initiator
//       const docRef = db.collection('meetings').doc('ROOM_ID'); // Replace with actual room ID
//       db.collection('meetings').doc(docRef.id).update({
//         mentorLink: JSON.stringify(data),
//       });
//     });

//     peer.on('stream', (remoteStream) => {
//       if (remoteVideoRef.current) {
//         remoteVideoRef.current.srcObject = remoteStream;
//       }
//     });

//     peer.signal(JSON.parse(signal));

//     peer.on('iceCandidate', async (candidate) => {
//       if (candidate) {
//         console.log('Sending ICE candidate:', candidate);
//         // Update the ICE candidates in the Firestore database
//         const docRef = db.collection('meetings').doc('ROOM_ID'); // Replace with actual room ID
//         await db.collection('meetings').doc(docRef.id).update({
//           iceCandidates: arrayUnion(JSON.stringify(candidate)),
//         });
//       }
//     });

//     setPeer(peer);
//   };

//   const toggleMic = () => {
//     if (stream) {
//       stream.getAudioTracks()[0].enabled = !micOn;
//       setMicOn(!micOn);
//     }
//   };

//   const toggleCamera = () => {
//     if (stream) {
//       stream.getVideoTracks()[0].enabled = !cameraOn;
//       setCameraOn(!cameraOn);
//     }
//   };

//   const endCall = () => {
//     // Add logic to end the call
//     setMeetingEnded(true);
//   };

//   const toggleChat = () => {
//     setChatVisible(!chatVisible);
//   };

//   const toggleNotes = () => {
//     setNotesVisible(!notesVisible);
//   };

//   const showControls = () => {
//     setControlsVisible(true);
//     setTimeout(() => setControlsVisible(false), 3000);
//   };

//   const switchVideo = () => {
//     setMainVideo(mainVideo === 'local' ? 'remote' : 'local');
//   };

//   if (meetingEnded) {
//     return <Feedbacks menteeId={menteeId} />;
//   }

//   return (
//     <div
//       className="relative w-full h-screen bg-gray-900"
//       onMouseMove={showControls}
//     >
//       <div className="w-full h-full">
//         {mainVideo === 'local' ? (
//           <video
//             ref={localVideoRef}
//             autoPlay
//             muted
//             className="w-full h-full object-cover"
//           />
//         ) : (
//           <video
//             ref={remoteVideoRef}
//             autoPlay
//             className="w-full h-full object-cover"
//           />
//         )}
//       </div>
//       <div className="absolute bottom-4 right-4 w-32 h-32">
//         {mainVideo === 'local' ? (
//           <video
//             ref={remoteVideoRef}
//             autoPlay
//             className="w-full h-full border border-gray-300 rounded-lg"
//           />
//         ) : (
//           <video
//             ref={localVideoRef}
//             autoPlay
//             muted
//             className="w-full h-full border border-gray-300 rounded-lg"
//           />
//         )}
//       </div>
//       {controlsVisible && (
//         <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4 bg-gray-800 bg-opacity-75 p-2 rounded-lg transition-opacity duration-300">
//           <button
//             onClick={toggleMic}
//             className="bg-blue-500 text-white p-2 rounded-full shadow-lg"
//           >
//             {micOn ? <FaMicrophone size={20} /> : <FaMicrophoneSlash size={20} />}
//           </button>
//           <button
//             onClick={toggleCamera}
//             className="bg-blue-500 text-white p-2 rounded-full shadow-lg"
//           >
//             {cameraOn ? <FaVideo size={20} /> : <FaVideoSlash size={20} />}
//           </button>
//           <button
//             onClick={endCall}
//             className="bg-red-500 text-white p-2 rounded-full shadow-lg"
//           >
//             <FaPhoneSlash size={20} />
//           </button>
//           <button
//             onClick={toggleChat}
//             className="bg-green-500 text-white p-2 rounded-full shadow-lg"
//           >
//             <FaComments size={20} />
//           </button>
//           <button
//             onClick={toggleNotes}
//             className="bg-yellow-500 text-white p-2 rounded-full shadow-lg"
//           >
//             <FaStickyNote size={20} />
//           </button>
//           <button
//             onClick={switchVideo}
//             className="bg-gray-500 text-white p-2 rounded-full shadow-lg"
//           >
//             <FaExchangeAlt size={20} />
//           </button>
//         </div>
//       )}
//       {chatVisible && <Chat username={username} />}
//       {notesVisible && <Notes />}
//     </div>
//   );
// };

// export default MeetingRoom;
