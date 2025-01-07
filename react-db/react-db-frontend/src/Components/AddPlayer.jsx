import React, { useState } from 'react';
import axios from 'axios';
import './AddPlayer.css';

const AddPlayer = () => {
  // State variables for storing player data
  const [playerID, setPlayerID] = useState('');
  const [teamID, setTeamID] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  // State for showing success or error messages
  const [message, setMessage] = useState('');

  // State for controlling form visibility
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Creating the player data object
    const playerData = {
      PlayerID: playerID,
      TeamID: teamID,
      Name: name,
      Age: age,
    };

    try {
      // Send POST request to backend API
      const response = await axios.post('http://localhost:5000/addPlayer', playerData);
      setMessage(response.data.message); // Show success message
    } catch (error) {
      setMessage('Error adding player: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  return (
    <div>
      <h2>Add Player</h2>

      {/* Button to toggle form visibility */}
      <button onClick={() => setIsFormVisible(!isFormVisible)}>
        {isFormVisible ? 'Hide Form' : 'Show Form'}
      </button>

      {/* Show form only when isFormVisible is true */}
      {isFormVisible && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Player ID</label>
            <input
              type="number"
              value={playerID}
              onChange={(e) => setPlayerID(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Team ID</label>
            <input
              type="number"
              value={teamID}
              onChange={(e) => setTeamID(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Age</label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          <button type="submit">Add Player</button>
        </form>
      )}

      {/* Display success or error message */}
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddPlayer;
