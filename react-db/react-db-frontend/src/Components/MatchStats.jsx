import React, { useState } from 'react';
import axios from 'axios';

const MatchStats = () => {
  const [matchStats, setMatchStats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch match statistics from the API
  const fetchMatchStats = async () => {
    setLoading(true); // Show loading spinner
    setError(null); // Reset error state
    try {
      const response = await axios.get('http://localhost:5000/getMatchStats');
      setMatchStats(response.data);
    } catch (err) {
      setError('Failed to fetch match statistics.');
      console.error(err);
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Match Statistics</h2>
      <button 
        onClick={fetchMatchStats} 
        style={{
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          borderRadius: '5px',
          marginBottom: '20px'
        }}
      >
        Fetch Match Stats
      </button>
      {loading && <div>Loading match statistics...</div>}
      {error && <div>{error}</div>}
      {matchStats.length > 0 && !loading && !error && (
        <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Match ID</th>
              <th>Team 1 Name</th>
              <th>Team 1 Total Runs</th>
              <th>Team 1 Total Catches</th>
              <th>Team 2 Name</th>
              <th>Team 2 Total Runs</th>
              <th>Team 2 Total Catches</th>
            </tr>
          </thead>
          <tbody>
            {matchStats.map((match) => (
              <tr key={match.MatchID}>
                <td>{match.MatchID}</td>
                <td>{match.Team1Name}</td>
                <td>{match.Team1TotalRuns}</td>
                <td>{match.Team1TotalCatches}</td>
                <td>{match.Team2Name}</td>
                <td>{match.Team2TotalRuns}</td>
                <td>{match.Team2TotalCatches}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {matchStats.length === 0 && !loading && !error && (
        <div></div>
      )}
    </div>
  );
};

export default MatchStats;
