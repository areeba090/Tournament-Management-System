import React, { useState } from 'react';

const TeamsWithExperiencedCoaches = () => {
    // State to store the fetched data
    const [teamsWithCoaches, setTeamsWithCoaches] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch data from API when button is clicked
    const fetchTeamsWithCoaches = async () => {
        setIsLoading(true); // Set loading state to true when the button is clicked
        try {
            const response = await fetch('http://localhost:5000/getTeamsWithExperiencedCoaches');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setTeamsWithCoaches(data);
            setError(null); // Reset error if data is fetched successfully
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false); // Set loading state to false after fetch completes
        }
    };

    return (
        <div>
            <h2>Teams with Experienced Coaches</h2>
            <button onClick={fetchTeamsWithCoaches} disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Fetch Teams'}
            </button>

            {error && <div style={{ color: 'red' }}>Error: {error}</div>}

            {/* Render the table only if data is fetched */}
            {teamsWithCoaches.length > 0 && (
                <table border="1" style={{ marginTop: '20px' }}>
                    <thead>
                        <tr>
                            <th>Team Name</th>
                            <th>Coach Name</th>
                            <th>Coach Experience</th>
                        </tr>
                    </thead>
                    <tbody>
                        {teamsWithCoaches.map((team, index) => (
                            <tr key={index}>
                                <td>{team.TeamName}</td>
                                <td>{team.CoachName}</td>
                                <td>{team.CoachExperience}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default TeamsWithExperiencedCoaches;
