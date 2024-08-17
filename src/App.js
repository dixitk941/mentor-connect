import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header'; // Ensure this path is correct
import Mentor from './pages/Join'; // Ensure this path is correct
import Home from './pages/HomePage'; // Ensure this path is correct
import MentorDetail from './pages/MentorDetail';


const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mentor" element={<Mentor />} />
        <Route path="/mentor/:id" component={MentorDetail} />

      </Routes>
    </Router>
  );
};

export default App;