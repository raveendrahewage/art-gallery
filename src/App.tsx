import React from 'react';
import './App.css';
import Album from './components/album/Album';
import Landing from './components/landing/Landing';

const App = () => {
  return (
    <div className="App">
      <Landing />
      <Album />
    </div>
  );
}

export default App;
