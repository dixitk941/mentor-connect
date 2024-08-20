import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';

const MentorDetail = ({ mentor }) => {
  const [date, setDate] = useState(null);
  const [menteeName, setMenteeName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [meetingLink, setMeetingLink] = useState('');

  const handleBooking = async () => {
    try {
      const eventDetails = {
        event: {
          start_time: date.toISOString(),
          end_time: new Date(date.getTime() + 30 * 60000).toISOString(),
          invitees: [{ name: menteeName, email }],
          location: { type: 'phone', value: mobile },
        },
      };

      const response = await axios.post(
        'https://api.calendly.com/scheduled_events',
        eventDetails,
        {
          headers: {
            Authorization: `Bearer eyJraWQiOiIxY2UxZTEzNjE3ZGNmNzY2YjNjZWJjY2Y4ZGM1YmFmYThhNjVlNjg0MDIzZjdjMzJiZTgzNDliMjM4MDEzNWI0IiwidHlwIjoiUEFUIiwiYWxnIjoiRVMyNTYifQ.eyJpc3MiOiJodHRwczovL2F1dGguY2FsZW5kbHkuY29tIiwiaWF0IjoxNzI0MTUxMDYyLCJqdGkiOiJkZmNhNjYxNi05NGI5LTRjMjQtYjRjMC0wODU2NTI4ZGNiNzciLCJ1c2VyX3V1aWQiOiI3OTlmYjI0NS0xYzhjLTRlODYtODIxMC05Njc5ODBkMzc1YTcifQ.nMlVXx9HxJ8BZP0EnMaCgMjqOE6jNngf4KKJYU-Whq95uKDvWeT6l41xJ8LgD-8tLpSkAFYRHR98JF1tpW_6RA`,
            'Content-Type': 'application/json',
          },
        }
      );

      const eventUri = response.data.resource.uri;
      setMeetingLink(`https://calendly.com/${mentor.details.username}/${eventUri}`);
    } catch (error) {
      console.error('Error scheduling meeting:', error);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl">{mentor.details.name}</h2>
      <p>{mentor.details.bio}</p>

      <div className="space-y-4">
        <DatePicker selected={date} onChange={(d) => setDate(d)} showTimeSelect dateFormat="Pp" />
        <input type="text" value={menteeName} onChange={(e) => setMenteeName(e.target.value)} placeholder="Name" />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Mobile Number" />
        <button onClick={handleBooking} className="mt-4 p-2 bg-green-500 text-white">Book Meeting</button>
      </div>

      {meetingLink && (
        <div className="mt-4 p-4 bg-gray-200">
          <p>Meeting Scheduled! Here is your meeting link:</p>
          <a href={meetingLink} target="_blank" rel="noopener noreferrer">{meetingLink}</a>
        </div>
      )}
    </div>
  );
};

export default MentorDetail;
