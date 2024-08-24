import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MenteeProvider } from './context/MenteeContext';
import Header from './components/Header';
import Mentor from './pages/Join';
import Home from './pages/HomePage';
import MentorDetail from './pages/MentorDetail';
import Login from './components/Login';
import Registration from './components/Registration';
import AboutMentor from './components/AboutMentor';
import FeaturesPage from './pages/FeaturesPage';
import TeamPage from './pages/TeamPage';
import MentorPage from './pages/MentorPage';
import Dashboard from './pages/mentor/Dashboard';
import MenteeDashboard from './pages/MenteeDashboard';
import MentorProfile from './components/MentorProfile';
import Room from './pages/Room';
import Loby from './pages/Loby';

const App = () => {
  return (
    <MenteeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mentor" element={<Mentor />} />
          <Route path="/mentor/:id" element={<MentorDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/about" element={<AboutMentor />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/mentors" element={<MentorPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mentee-dashboard/:menteeId" element={<MenteeDashboard />} />
          <Route path="/mentor-profile/:id" element={<MentorProfile />} />
          <Route path="/room/:meetingId" element={<Room />} />
          <Route path="/lobby" element={<Loby />} />
          <Route path="/mentor-dashboard/:mentorId" element={<Dashboard />} />
        </Routes>
      </Router>
    </MenteeProvider>
  );
};

export default App;
