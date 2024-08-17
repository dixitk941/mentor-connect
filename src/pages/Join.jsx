import React from 'react';
import Hero from '../components/Hero'; 
import Footer from '../components/Footer';
import MentorHelpYou from '../components/MentorHelpYou';
import HowWeCanHelp from '../components/HCWA';
import Join from '../components/Join';

const App = () => {
  return (
    <div>
      <Hero />
      <Join />
      <MentorHelpYou />
        <HowWeCanHelp />
      <Footer />
    </div>
  );
};

export default App;