// App.js
import React from 'react';
import Podcast from './components/Podcast'; 

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Spotify App</h1>
      </header>
      <main>
        <Podcast />
      </main>
    </div>
  );
}

export default App;
