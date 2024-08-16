// src/App.js
import React from 'react';
import Header from './components/Header';
import HomePage from  './pages/HomePage' // Adjust the path as necessary

import './index.css'; // Ensure Tailwind CSS is imported

function App() {
  return (
    <div className="App">
      <Header />
      <main className="p-4">
        <header className="App-header" />
        <HomePage />
        
      </main>
    </div>
  );
}

export default App;