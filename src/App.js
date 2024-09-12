import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';


const socket = io('http://localhost:4000'); // Adjust the URL as needed


function App() {

  const apiUrl = 'http://localhost:4000/api/vote-results';
  console.log("apiUrl: ", apiUrl);

  const [votes, setVotes] = useState({ dog: 0, cat: 0 });

  const [error, setError] = useState(null);


  useEffect(() => {

    const fetchVoteResults = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("data: ", data);
        
        // Initialize votes with fetched data
        const initialVotes = data.reduce((acc, item) => {
          acc[item.animal.toLowerCase()] = item.count;
          return acc;
        }, { dog: 0, cat: 0 });

        setVotes(initialVotes);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchVoteResults();


    // Listen for the 'voteCountUpdated' event
    socket.on('voteCountUpdated', (updatedDocument) => {
      console.log('Received updated document:', updatedDocument);
      console.log("animal: ", updatedDocument.animal)
      console.log("count: ", updatedDocument.count)
      
      // Update the state with the new count
      setVotes((prevVotes) => ({
        ...prevVotes,
        [updatedDocument.animal.toLowerCase()]: updatedDocument.count,
      }));
    });

    // Clean up the socket connection when the component unmounts
    return () => socket.off('voteCountUpdated');
  }, []);

  return (
    <div className="App">
      <div className="Dogs" style={{flex: votes.dog}}>
        <h1>Dogs</h1>
        <h2>{votes.dog}%</h2>
      </div>
      <div className="Cats" style={{flex: votes.cat}}>
        <h1>Cats</h1>
        <h2>{votes.cat}%</h2>
      </div>
    </div>
  );
}

export default App;
