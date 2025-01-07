import React, { useState } from 'react';
import axios from 'axios';

const MaxPointsTeams = () => {
  // State to hold the data from the API
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showTable, setShowTable] = useState(false); // State to toggle visibility of table

  // Function to fetch data from the API
  const fetchData = async () => {
    setLoading(true); // Set loading to true when request starts
    setError(null); // Clear any previous error
    try {
      // Make the API call
      const response = await axios.get('http://localhost:5000/getVenuesByMaxPointsTeams');
      setData(response.data); // Set the data to state
      setLoading(false); // Set loading to false when request finishes
      setShowTable(true); // Show table after data is fetched
    } catch (err) {
      setError(err.message); // Set error message if any
      setLoading(false); // Set loading to false when request finishes
    }
  };

  // Render the component
  return (
    <div>
      <h2>Teams with Maximum Points and Their Venues</h2>
      
      {/* Button to trigger the API call */}
      <button onClick={fetchData}>Fetch Data (Venue Name | Team Name | Points)</button>

      {/* Loading state */}
      {loading && <div>Loading...</div>}

      {/* Error state */}
      {error && <div>Error: {error}</div>}

      {/* Conditional rendering of the table */}
      {showTable && !loading && !error && (
        <table>
          <thead>
            <tr>
              <th>Venue Name</th>
              <th>Team Name</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.VenueName}</td>
                <td>{item.TeamName}</td>
                <td>{item.Points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MaxPointsTeams;
