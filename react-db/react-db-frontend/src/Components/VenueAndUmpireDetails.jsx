import React, { useState } from 'react';
import axios from 'axios';

const VenueAndUmpireDetails = () => {
    const [matchDetails, setMatchDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchDetails = async () => {
        setLoading(true);
        setError('');
        try {
            // Make API call to fetch match details
            const response = await axios.get('http://localhost:5000/getVenueAndUmpireDetails');
            setMatchDetails(response.data);
        } catch (err) {
            console.error('Error fetching data:', err);
            setError('Failed to fetch match details. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2>Match Venue and Umpire Details</h2>
            <button onClick={fetchDetails} style={{ padding: '10px 20px', cursor: 'pointer' }}>
                Fetch Details
            </button>

            {loading && <p>Loading...</p>}

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {!loading && !error && matchDetails.length > 0 && (
                <table border="1" cellPadding="10" style={{ marginTop: '20px', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th>Match ID</th>
                            <th>Venue City</th>
                            <th>Umpire Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {matchDetails.map((detail) => (
                            <tr key={detail.MatchID}>
                                <td>{detail.MatchID}</td>
                                <td>{detail.VenueCity}</td>
                                <td>{detail.UmpireName}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default VenueAndUmpireDetails;
