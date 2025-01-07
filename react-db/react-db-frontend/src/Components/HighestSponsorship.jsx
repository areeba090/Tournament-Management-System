import React, { useState } from 'react';
import axios from 'axios';

const HighestSponsorship = () => {
    const [team, setTeam] = useState(null);
    const [error, setError] = useState('');

    const fetchTeamWithHighestSponsorship = async () => {
        try {
            const response = await axios.get('http://localhost:5000/getTeamWithHighestSponsorship');
            setTeam(response.data[0]); // Assuming only one record will be returned
            setError('');
        } catch (err) {
            setTeam(null);
            setError(err.response?.data?.message || 'An error occurred.');
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2>Team with the Highest Sponsorship</h2>

            {/* Green Fetch Team button */}
            <button 
                onClick={fetchTeamWithHighestSponsorship} 
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    backgroundColor: '#28A745',  // Green color
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    marginBottom: '20px'
                }}
            >
                Fetch Team
            </button>

            {/* Error message */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Display the fetched team information in a table */}
            {team && (
                <table border="1" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                    <thead>
                        <tr>
                            <th>Team ID</th>
                            <th>Team Name</th>
                            <th>Total Sponsorship</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{team.TeamID}</td>
                            <td>{team.TeamName}</td>
                            <td>${team.TotalSponsorship}</td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default HighestSponsorship;
