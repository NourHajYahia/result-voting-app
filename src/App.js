import React, { useState } from 'react';
import io from 'socket.io-client';
import './App.css';


const socket = io('http://localhost:5001'); // Adjust the URL as needed

function App() {
  const [votes, setVotes] = useState({ dogs: 0, cats: 0 });

  useEffect(() => {
    // Listen for the 'animalVoteCountUpdated' event
    socket.on('animalVoteCountUpdated', (updatedDocument) => {
      console.log('Received updated document:', updatedDocument);

      // Update the state with the new count
      setVotes((prevVotes) => ({
        ...prevVotes,
        [updatedDocument.animal]: updatedDocument.count,
      }));
    });

    // Clean up the socket connection when the component unmounts
    return () => socket.off('animalVoteCountUpdated');
  }, []);

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
