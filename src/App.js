import React from 'react';
import './App.css';
import WeatherDisplay from './WeatherDisplay';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Санкт-Петербург</h2>
        <WeatherDisplay />
      </header>
    </div>
  );
}

export default App;
