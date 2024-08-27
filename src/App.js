import React, { useState } from 'react';
import './App.css';

function App() {
  const [votes, setVotes] = useState({ dogs: 20, cats: 80 });


  return (
    <div className="App">
      <div className="Dogs" style={{flex: votes.dogs}}>
        <h1>Dogs</h1>
        <h2>{votes.dogs}%</h2>
      </div>
      <div className="Cats" style={{flex: votes.cats}}>
        <h1>Cats</h1>
        <h2>{votes.cats}%</h2>
      </div>
    </div>
  );
}

export default App;
