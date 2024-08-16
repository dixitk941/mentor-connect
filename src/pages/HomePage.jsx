import React from 'react';
import Hero from '../components/Hero'; 
import Features from '../components/Features';
import Contact from '../components/Contact';
import Footer from '../components/Footer'


const App = () => {
  return (
    <div>
      <Hero />
      <Features />
      <Contact />
      <Footer />
      {/* Other components */}
    </div>
  );
};

export default App;