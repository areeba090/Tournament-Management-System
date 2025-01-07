import React, { useState } from 'react';
import axios from 'axios';

const PlayerDetails = () => {
    const [playerName, setPlayerName] = useState('');
    const [playerDetails, setPlayerDetails] = useState(null);
    const [error, setError] = useState('');
    const [isFormVisible, setIsFormVisible] = useState(false);  // State to toggle form visibility

    // Function to fetch player details
    const fetchPlayerDetails = async () => {
        if (!playerName.trim()) {
            setError('Player name is required.');
            return;
        }

        try {
            setError('');
            const response = await axios.post('http://localhost:5000/getPlayerDetails', {
                playerName: playerName.trim(),
            });

            // Set the player details if found
            setPlayerDetails(response.data);
        } catch (err) {
            setError('Player not found or error occurred.');
            setPlayerDetails(null);
        }
    };

    return (
        <div>
            <h2>Player Details</h2>

            {/* Button to toggle form visibility */}
            <button onClick={() => setIsFormVisible(!isFormVisible)}>
                {isFormVisible ? 'Hide Form' : 'Show Form'}
            </button>

            {/* Show form only when isFormVisible is true */}
            {isFormVisible && (
                <div>
                    <div>
                        <label htmlFor="playerName">Enter Player Name:</label>
                        <input
                            type="text"
                            id="playerName"
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                            placeholder="Enter player's name"
                        />
                        <button onClick={fetchPlayerDetails}>Get Player Details</button>
                    </div>

                    {/* Show error message if any */}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
            )}

            {/* Show player details if found */}
            {playerDetails && (
                <div>
                    <h2>Details for {playerDetails[0].PlayerName}</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Team Name</th>
                                <th>Runs</th>
                                <th>Wickets</th>
                                <th>Catches</th>
                            </tr>
                        </thead>
                        <tbody>
                            {playerDetails.map((player) => (
                                <tr key={player.PlayerID}>
                                    <td>{player.TeamName}</td>
                                    <td>{player.Runs}</td>
                                    <td>{player.Wickets}</td>
                                    <td>{player.Catches}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PlayerDetails;
