import React, { useState } from 'react';
import axios from 'axios';

const AverageWickets = () => {
    const [teams, setTeams] = useState([]);
    const [error, setError] = useState(null);

    // Function to fetch average wickets per team
    const getAverageWickets = async () => {
        try {
            // Make the API request to get average wickets per team
            const response = await axios.get('http://localhost:5000/getAverageWickets');
            
            // Set the fetched data to the teams state
            setTeams(response.data);
        } catch (err) {
            // If an error occurs, set the error state
            setError('Error fetching data');
            console.error(err);
        }
    };

    return (
        <div>
            <h2>Average Wickets by Team</h2>

            {/* Button to trigger API call */}
            <button onClick={getAverageWickets}>Get Average Wickets by Team</button>
            
            {/* Display error if any */}
            {error && <p>{error}</p>}
            
            {/* Display teams' average wickets in a table */}
            {teams.length > 0 && (
                <table border="1">
                    <thead>
                        <tr>
                            <th>Team Name</th>
                            <th>Average Wickets</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teams.map((team, index) => (
                            <tr key={index}>
                                <td>{team.TeamName}</td>
                                <td>{team.AverageWickets}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AverageWickets;
