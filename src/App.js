import React, { useState, useEffect } from 'react';
import Game from './components/Game';
import './App.css';

const App = () => {
  const [start] = useState(true);
  return <div className="App">{start && <Game />}</div>;
};

export default App;
