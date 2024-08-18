import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header'; // Ensure this path is correct
import Mentor from './pages/Join'; // Ensure this path is correct
import Home from './pages/HomePage'; // Ensure this path is correct
import MentorDetail from './pages/MentorDetail';
import Login from './components/Login';
import Registration from './components/Registration';
// import 'tw-elements-react/dist/css/index.min.css'; // Import the CSS

const App = () => {
  return (
    <Router>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mentor" element={<Mentor />} />
        <Route path="/mentor/:id" element={<MentorDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
      </Routes>
    </Router>
  );
};

export default App;