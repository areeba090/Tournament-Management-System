import React, { useState } from 'react';
import axios from 'axios';

const AveragePlayerAge = () => {
  const [teamAges, setTeamAges] = useState([]); // State to store the fetched team age data
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState(null); // State to store errors

  // Function to fetch average player age data
  const fetchAveragePlayerAge = () => {
    setLoading(true); // Set loading to true when the button is clicked
    setError(null); // Reset any previous errors

    // Fetch data from the backend API
    axios.get('http://localhost:5000/getAveragePlayerAge')
      .then(response => {
        setTeamAges(response.data); // Store the team age data in state
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch(err => {
        setError('Error fetching average player age data'); // Set error message if request fails
        setLoading(false); // Set loading to false on error
      });
  };

  return (
    <div>
      <h2>Average Player Age per Team</h2>
      
      {/* Button to trigger data fetch */}
      <button onClick={fetchAveragePlayerAge} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Average Age'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Show error message if there’s an issue */}

      {teamAges.length > 0 ? (
        <ul>
          {teamAges.map((team, index) => (
            <li key={index}>
              {team.TeamName}: {team.AveragePlayerAge.toFixed(2)} years
            </li> // Display team name and their average player age
          ))}
        </ul>
      ) : (
        !loading && <p></p> // Show no data message if no data is fetched and loading is done
      )}
    </div>
  );
};

export default AveragePlayerAge;
