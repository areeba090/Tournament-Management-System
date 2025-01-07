import React, { useState } from 'react';
import axios from 'axios';
import './MatchDetails.css'; // Import the CSS file

const MatchDetails = () => {
  const [matchDetails, setMatchDetails] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // To track loading state
  const [dataFetched, setDataFetched] = useState(false); // Track if data has been fetched

  // Function to fetch match details
  const fetchMatchDetails = () => {
    setLoading(true); // Start loading
    axios.get('http://localhost:5000/getMatchDetails')
      .then(response => {
        setMatchDetails(response.data);
        setDataFetched(true); // Set dataFetched to true once data is fetched
        setLoading(false); // Stop loading
      })
      .catch(err => {
        setError('Error fetching match details');
        setLoading(false); // Stop loading
        console.error(err);
      });
  };

  return (
    <div>
      <h2>Match Details</h2>
      
      {/* Button to fetch match details */}
      <button onClick={fetchMatchDetails}>
        {loading ? 'Loading...' : 'Fetch Match Details'}
      </button>
      
      {error && <p>{error}</p>}
      
      {/* Only show the table once data is fetched */}
      {dataFetched && matchDetails.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Match ID</th>
              <th>Team 1</th>
              <th>Team 2</th>
              <th>Venue </th>
              <th>Venue City</th>
              <th>Umpire</th>
              <th>Umpire Experience</th>
            </tr>
          </thead>
          <tbody>
            {matchDetails.map(match => (
              <tr key={match.MatchID}>
                <td>{match.MatchID}</td>
                <td>{match.Team1Name}</td>
                <td>{match.Team2Name}</td>
                <td>{match.VenueName}</td>
                <td>{match.VenueCity}</td>
                <td>{match.UmpireName}</td>
                <td>{match.UmpireExperience}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MatchDetails;
