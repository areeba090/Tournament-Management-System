import React, { useState } from 'react';
import axios from 'axios';

const TicketDetails = () => {
    // States to hold user input and response data
    const [ticketID, setTicketID] = useState('');
    const [tournamentName, setTournamentName] = useState('');
    const [ticketDetails, setTicketDetails] = useState(null);
    const [error, setError] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);  // State to toggle form visibility

    // Function to handle form submission and fetch data
    const fetchTicketDetails = async () => {
        if (!ticketID || !tournamentName) {
            setError("Please enter both TicketID and TournamentName.");
            return;
        }

        try {
            // Make POST request to the API with TicketID and TournamentName
            const response = await axios.post('http://localhost:5000/getTicketDetailsByIDAndTournament', {
                TicketID: parseInt(ticketID),
                TournamentName: tournamentName
            });

            // Set the ticket details response to state
            if (response.data && response.data.length > 0) {
                setTicketDetails(response.data[0]); // Assuming data is in an array
                setError(null);  // Reset error state
            } else {
                setError('No ticket details found for the provided TicketID and TournamentName.');
                setTicketDetails(null);
            }
        } catch (err) {
            // Handle error (e.g., no data found)
            setError(err.response?.data?.message || 'Error fetching ticket details');
            setTicketDetails(null);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Get Ticket Details</h2>

            {/* Button to toggle form visibility */}
            <button onClick={() => setIsFormVisible(!isFormVisible)}>
                {isFormVisible ? 'Hide Form' : 'Show Form'}
            </button>

            {/* Show form only when isFormVisible is true */}
            {isFormVisible && (
                <div>
                    {/* Form to input TicketID and TournamentName */}
                    <div>
                        <label>
                            Ticket ID:
                            <input
                                type="number"
                                value={ticketID}
                                onChange={(e) => setTicketID(e.target.value)}
                                placeholder="Enter Ticket ID"
                            />
                        </label>
                    </div>

                    <div>
                        <label>
                            Tournament Name:
                            <input
                                type="text"
                                value={tournamentName}
                                onChange={(e) => setTournamentName(e.target.value)}
                                placeholder="Enter Tournament Name"
                            />
                        </label>
                    </div>

                    {/* Button to fetch data */}
                    <button onClick={fetchTicketDetails}>Get Ticket Details</button>
                </div>
            )}

            {/* Show error message if any */}
            {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}

            {/* Show ticket details */}
            {ticketDetails && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Ticket Details</h3>
                    <p><strong>Ticket ID:</strong> {ticketDetails.TicketID}</p>
                    <p><strong>Buyer Name:</strong> {ticketDetails.BuyerName}</p>
                    <p><strong>Seat Number:</strong> {ticketDetails.SeatNumber}</p>
                    <p><strong>Tournament Name:</strong> {ticketDetails.TournamentName}</p>
                    <p><strong>Venue Name:</strong> {ticketDetails.VenueName}</p>
                </div>
            )}
        </div>
    );
};

export default TicketDetails;
