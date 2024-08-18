import React from 'react';
import Hero from '../components/Hero'; 
import Features from '../components/Features';
import Contact from '../components/Contact';
// import BecomeMentee from '../components/JoinAsMentee';
import Footer from '../components/Footer'
// import MentorHelpYou from '../components/MentorHelpYou'
import MentorPage from './MentorPage';
import CTA from '../components/CTA'
import Mentors from '../components/Mentors'


const App = () => {
  return (
    <div>
      <Hero />
      <Features />
      <CTA />
      <Contact />
      <Mentors />
      {/* <MentorPage /> */}
      {/* <BecomeMentee /> */}
      {/* <MentorHelpYou /> */}
      <Footer />

      {/* Other components */}
    </div>
  );
};

export default App;