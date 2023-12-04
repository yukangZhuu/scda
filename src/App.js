// App.js
import React from 'react';
import NavBar from './components/NavBar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import './style/App.css'; // Import your CSS file here

function App() {
  return (
    <div>
      <NavBar />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;