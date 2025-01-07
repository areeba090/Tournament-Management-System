import React, { useState } from 'react';
import axios from 'axios';

const MatchDuration = () => {
  const [matchDurationData, setMatchDurationData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch match duration data from the backend API
  const fetchMatchDuration = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/getMatchDuration');
      setMatchDurationData(response.data);
    } catch (err) {
      setError('Error fetching match duration');
    } finally {
      setLoading(false);
    }
  };

  // Handle loading and error states
  if (loading) return <p>Loading match durations...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Match Durations</h2>
      {/* Button to fetch match durations */}
      <button onClick={fetchMatchDuration}>Fetch Match Durations</button>
      
      {matchDurationData.length > 0 && (
        <table border="1">
          <thead>
            <tr>
              <th>Match ID</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Duration (Minutes)</th>
            </tr>
          </thead>
          <tbody>
            {matchDurationData.map((match) => (
              <tr key={match.MatchID}>
                <td>{match.MatchID}</td>
                <td>{new Date(match.StartTime).toLocaleString()}</td>
                <td>{new Date(match.EndTime).toLocaleString()}</td>
                <td>{match.DurationInMinutes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MatchDuration;
