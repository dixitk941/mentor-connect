import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, updateDoc, doc, onSnapshot, query, where, getDocs, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase'; // Adjust the path as necessary
import Header from '../components/Header'

const Lobby = () => {
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const peerConnection = useRef(null);
  const roomRef = useRef(null);
  const localStream = useRef(null);
  const remoteStream = useRef(null);

  useEffect(() => {
    // Get user media
    const getMedia = async () => {
      try {
        localStream.current = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        remoteStream.current = new MediaStream();

        // Display local stream
        const localVideo = document.getElementById('localVideo');
        if (localVideo) localVideo.srcObject = localStream.current;

        // Display remote stream
        const remoteVideo = document.getElementById('remoteVideo');
        if (remoteVideo) remoteVideo.srcObject = remoteStream.current;
      } catch (error) {
        console.error('Error accessing media devices.', error);
      }
    };

    getMedia();
  }, []);

  const joinRoom = async () => {
    setLoading(true);
    let meetingId = link.split('/').pop();

    // Check if the meeting link ends with 'R' and remove it
    if (meetingId.endsWith('R')) {
      meetingId = meetingId.slice(0, -1);
    }

    try {
      // Check if the room already exists
      const q = query(collection(db, 'rooms'), where('meetingId', '==', meetingId));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log('Creating a new room');
        // Create a new room in Firebase
        roomRef.current = await addDoc(collection(db, 'rooms'), {
          meetingId: meetingId,
          offers: [],
          answers: [],
          iceCandidates: []
        });

        // Initialize WebRTC peer connection
        peerConnection.current = new RTCPeerConnection();

        // Add local stream tracks to peer connection
        localStream.current.getTracks().forEach(track => {
          peerConnection.current.addTrack(track, localStream.current);
        });

        // Create an offer
        const offer = await peerConnection.current.createOffer();
        await peerConnection.current.setLocalDescription(offer);

        // Store the offer in Firebase
        await updateDoc(roomRef.current, {
          offers: [{ type: offer.type, sdp: offer.sdp }]
        });

        // Listen for remote answer and ICE candidates
        const unsubscribe = onSnapshot(roomRef.current, (snapshot) => {
          const data = snapshot.data();
          console.log('Snapshot data:', data);
          if (data?.answers?.length > 0 && peerConnection.current.signalingState === 'have-local-offer') {
            const answer = new RTCSessionDescription(data.answers[0]);
            peerConnection.current.setRemoteDescription(answer).catch(console.error);
          }
          if (data?.iceCandidates?.length > 0) {
            data.iceCandidates.forEach(candidate => {
              peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate)).catch(console.error);
            });
          }
        });

        // Handle ICE candidates
        peerConnection.current.onicecandidate = (event) => {
          if (event.candidate) {
            console.log('New ICE candidate:', event.candidate);
            updateDoc(roomRef.current, {
              iceCandidates: arrayUnion(event.candidate.toJSON())
            });
          }
        };

        // Handle remote stream
        peerConnection.current.ontrack = (event) => {
          event.streams[0].getTracks().forEach(track => {
            remoteStream.current.addTrack(track);
          });
        };
      } else {
        console.log('Joining an existing room');
        // Join the existing room
        roomRef.current = querySnapshot.docs[0].ref;

        // Initialize WebRTC peer connection
        peerConnection.current = new RTCPeerConnection();

        // Add local stream tracks to peer connection
        localStream.current.getTracks().forEach(track => {
          peerConnection.current.addTrack(track, localStream.current);
        });

        // Listen for remote offer and ICE candidates
        const unsubscribe = onSnapshot(roomRef.current, async (snapshot) => {
          const data = snapshot.data();
          console.log('Snapshot data:', data);
          if (data?.offers?.length > 0 && peerConnection.current.signalingState === 'stable') {
            const offer = new RTCSessionDescription(data.offers[0]);
            await peerConnection.current.setRemoteDescription(offer);

            // Create an answer
            const answer = await peerConnection.current.createAnswer();
            await peerConnection.current.setLocalDescription(answer);

            // Store the answer in Firebase
            await updateDoc(roomRef.current, {
              answers: [{ type: answer.type, sdp: answer.sdp }]
            });
          }
          if (data?.iceCandidates?.length > 0) {
            data.iceCandidates.forEach(candidate => {
              peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate)).catch(console.error);
            });
          }
        });

        // Handle ICE candidates
        peerConnection.current.onicecandidate = (event) => {
          if (event.candidate) {
            console.log('New ICE candidate:', event.candidate);
            updateDoc(roomRef.current, {
              iceCandidates: arrayUnion(event.candidate.toJSON())
            });
          }
        };

        // Handle remote stream
        peerConnection.current.ontrack = (event) => {
          event.streams[0].getTracks().forEach(track => {
            remoteStream.current.addTrack(track);
          });
        };
      }

      setLoading(false);
      // Redirect to the room with the meeting ID
      navigate(`/room/${roomRef.current.id}`);
    } catch (error) {
      console.error('Error creating/joining room: ', error);
      setLoading(false);
    }
  };

  return (

    <div>
      <Header />
      <br />
      <br />
      <br />
      <br />
      <br />
      <main>
          <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-900 text-white p-6">
   
      <div className="w-full max-w-md space-y-4 bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">Join a Meeting Room</h2>
        <input
          type="text"
          placeholder="Enter Room Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="border-2 border-gray-700 bg-gray-700 p-3 w-full rounded-lg text-white focus:outline-none focus:border-green-500 transition-colors"
        />
        <button
          onClick={joinRoom}
          className={`w-full px-4 py-2 rounded-lg shadow-md transition-all ${loading || !link ? 'bg-green-600 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'} text-white`}
          disabled={loading || !link}
        >
          {loading ? 'Joining Room...' : 'Join Room'}
        </button>
        <div className="flex flex-col items-center space-y-2 mt-4">
          <video id="localVideo" autoPlay playsInline muted className="w-full rounded-lg bg-black"></video>
          <video id="remoteVideo" autoPlay playsInline className="w-full rounded-lg bg-black"></video>
        </div>
      </div>
    </div>
    </main>
    </div>
  );
};

export default Lobby;
