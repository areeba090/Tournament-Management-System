const express = require('express');
const cors = require('cors'); // Import CORS middleware
const sql = require('mssql');
const app = express();

// Enable CORS
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// SQL Server Configuration
const dbConfig = {
    user: 'database',
    password: 'mnbvc',
    server: 'localhost\\SQLEXPRESS', // SQL Server instance
    database: 'CricketManagementSystem',
    options: {
        encrypt: false,
        trustServerCertificate: true,
    }
};

// Connect to SQL Server
sql.connect(dbConfig, (err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to SQL Server!');
});
//. Fetch Match Details with City and Umpire Name
app.get('/getVenueAndUmpireDetails', async (req, res) => {
    try {
        // Connect to the database
        const pool = await sql.connect(dbConfig);

        // Execute the query
        const result = await pool.request()
            .query(`
                SELECT 
                    m.MatchID,
                    (SELECT City FROM Venue v WHERE v.VenueID = m.VenueID) AS VenueCity,
                    (SELECT Name FROM Umpire u WHERE u.UmpireID = m.UmpireID) AS UmpireName
                FROM Match m;
            `);

        // Return the result
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('Error fetching venue and umpire details:', err);
        res.status(500).json({ message: 'Error fetching venue and umpire details', error: err.message });
    }
});

// API endpoint for inserting player data
app.post('/addPlayer', async (req, res) => {
    const { PlayerID, TeamID, Name, Age } = req.body;
  
    try {
      // Connect to the SQL Server
      const pool = await sql.connect(dbConfig);
  
      // Insert the player data into the Player table
      const result = await pool.request()
        .input('PlayerID', sql.Int, PlayerID)
        .input('TeamID', sql.Int, TeamID)
        .input('Name', sql.VarChar, Name)
        .input('Age', sql.Int, Age)
        .query('INSERT INTO Player (PlayerID, TeamID, Name, Age) VALUES (@PlayerID, @TeamID, @Name, @Age)');
  
      // Send success response
      res.status(200).json({ message: 'Player added successfully!' });
    } catch (err) {
      console.error('Error inserting player data:', err);
      res.status(500).json({ message: 'Error inserting player data', error: err.message });
    }
  });
  // API to get player details by name
app.post('/getPlayerDetails', async (req, res) => {
    const { playerName } = req.body; // Get playerName from the request body

    if (!playerName) {
        return res.status(400).json({ message: 'Player name is required.' });
    }

    try {
        // Connect to the database
        const pool = await sql.connect(dbConfig);

        // Query to get player details
        const result = await pool.request()
            .input('PlayerName', sql.VarChar, playerName)
            .query(`
                SELECT 
                    p.PlayerID,
                    p.Name AS PlayerName,
                    t.Name AS TeamName,
                    ps.Runs,
                    ps.Wickets,
                    ps.Catches
                FROM Player p
                JOIN Team t ON p.TeamID = t.TeamID
                JOIN PlayerStatsDetails ps ON p.PlayerID = ps.PlayerID
                WHERE p.Name = @PlayerName;
            `);

        // Check if player exists
        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Player not found.' });
        }

        // Send the result
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('Error retrieving player details:', err);
        res.status(500).json({ message: 'Error retrieving player details', error: err.message });
    }
});

// API to get average wickets per team
app.get('/getAverageWickets', async (req, res) => {
    try {
        // Connect to the database
        const pool = await sql.connect(dbConfig);

        // Query to get the average wickets per team
        const result = await pool.request()
            .query(`
                SELECT t.Name AS TeamName, AVG(ps.Wickets) AS AverageWickets
                FROM Player p
                JOIN Team t ON p.TeamID = t.TeamID
                JOIN PlayerStatsDetails ps ON p.PlayerID = ps.PlayerID
                GROUP BY t.Name;
            `);

        // Send the results as JSON
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('Error retrieving average wickets per team:', err);
        res.status(500).json({ message: 'Error retrieving average wickets per team', error: err.message });
    }
});


// API to fetch match details with team names, venue, and umpire information
app.get('/getMatchDetails', async (req, res) => {
    try {
        // Connect to the database
        const pool = await sql.connect(dbConfig);

        // Execute the query
        const result = await pool.request()
            .query(`
                SELECT 
                    m.MatchID,
                    t1.Name AS Team1Name,
                    t2.Name AS Team2Name,
                    v.Name AS VenueName,
                    v.City AS VenueCity,
                    u.Name AS UmpireName,
                    u.Experience AS UmpireExperience
                FROM Match m
                JOIN Team t1 ON m.TeamID1 = t1.TeamID
                JOIN Team t2 ON m.TeamID2 = t2.TeamID
                JOIN Venue v ON m.VenueID = v.VenueID
                JOIN Umpire u ON m.UmpireID = u.UmpireID;
            `);

        // Send the result as JSON
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('Error fetching match details:', err);
        res.status(500).json({ message: 'Error fetching match details', error: err.message });
    }
});

// Add this to your Express app
app.post('/getTicketDetailsByIDAndTournament', async (req, res) => {
    const { TicketID, TournamentName } = req.body;

    if (!TicketID || !TournamentName) {
        return res.status(400).json({ message: 'TicketID and TournamentName are required.' });
    }

    try {
        // Connect to the database
        const pool = await sql.connect(dbConfig);

        // Query to fetch ticket details based on TicketID and TournamentName
        const result = await pool.request()
            .input('TicketID', sql.Int, TicketID)
            .input('TournamentName', sql.VarChar, TournamentName)
            .query(`
                SELECT 
                    td.TicketID,
                    td.BuyerName,
                    td.SeatNumber,
                    t.Name AS TournamentName,
                    v.Name AS VenueName
                FROM 
                    TicketDetails td
                JOIN 
                    Match m ON td.MatchID = m.MatchID
                JOIN 
                    Tournament t ON m.VenueID = t.VenueID
                JOIN 
                    Venue v ON m.VenueID = v.VenueID
                WHERE 
                    td.TicketID = @TicketID AND t.Name = @TournamentName;
            `);

        // If no record is found
        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Ticket details not found.' });
        }

        // Send the fetched details
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('Error fetching ticket details:', err);
        res.status(500).json({ message: 'Error fetching ticket details', error: err.message });
    }
});

// API Endpoint for Fetching Match Details
app.get('/getMatchStats', async (req, res) => {
    try {
        // Connect to the database
        const pool = await sql.connect(dbConfig);

        // Execute the SQL query
        const result = await pool.request().query(`
            SELECT 
                m.MatchID,
                t1.Name AS Team1Name,
                SUM(ps1.Runs) AS Team1TotalRuns,
                SUM(ps1.Catches) AS Team1TotalCatches,
                t2.Name AS Team2Name,
                SUM(ps2.Runs) AS Team2TotalRuns,
                SUM(ps2.Catches) AS Team2TotalCatches
            FROM 
                Match m
            JOIN 
                Player p1 ON p1.TeamID = m.TeamID1
            JOIN 
                PlayerStatsDetails ps1 ON p1.PlayerID = ps1.PlayerID
            JOIN 
                Team t1 ON m.TeamID1 = t1.TeamID
            JOIN 
                Player p2 ON p2.TeamID = m.TeamID2
            JOIN 
                PlayerStatsDetails ps2 ON p2.PlayerID = ps2.PlayerID
            JOIN 
                Team t2 ON m.TeamID2 = t2.TeamID
            GROUP BY 
                m.MatchID, t1.Name, t2.Name;
        `);

        // Send the result as JSON
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('Error fetching match stats:', err);
        res.status(500).json({ message: 'Error fetching match stats', error: err.message });
    }
});
// API to fetch venue names, team names, and points where the teams with the maximum points have played
app.get('/getVenuesByMaxPointsTeams', async (req, res) => {
    try {
        // Connect to the database
        const pool = await sql.connect(dbConfig);

        // Execute the SQL query
        const result = await pool.request()
            .query(`
                SELECT DISTINCT
                    v.Name AS VenueName,
                    tsd.Points AS Points,
                    t.Name AS TeamName
                FROM 
                    Venue v
                JOIN 
                    Match m ON v.VenueID = m.VenueID
                JOIN 
                    TeamStatisticsDetails tsd ON tsd.TeamID = m.TeamID1 OR tsd.TeamID = m.TeamID2
                JOIN 
                    Team t ON t.TeamID = tsd.TeamID
                WHERE 
                    (m.TeamID1 = (
                        SELECT TeamID 
                        FROM TeamStatisticsDetails 
                        WHERE Points = (SELECT MAX(Points) FROM TeamStatisticsDetails)
                    ) 
                    OR m.TeamID2 = (
                        SELECT TeamID 
                        FROM TeamStatisticsDetails 
                        WHERE Points = (SELECT MAX(Points) FROM TeamStatisticsDetails)
                    ))
                    AND tsd.Points = (SELECT MAX(Points) FROM TeamStatisticsDetails);
            `);

        // Return the result as a JSON response
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('Error fetching venue details:', err);
        res.status(500).json({ message: 'Error fetching venue details', error: err.message });
    }
});


  // API to fetch average player age per team
app.get('/getAveragePlayerAge', async (req, res) => {
    try {
      // Connect to the database
      const pool = await sql.connect(dbConfig);
  
      // Query to get the average player age per team
      const result = await pool.request()
        .query(`
          SELECT t.Name AS TeamName, AVG(p.Age) AS AveragePlayerAge
          FROM Player p
          JOIN Team t ON p.TeamID = t.TeamID
          GROUP BY t.Name;
        `);
  
      // Send the results as JSON
      res.status(200).json(result.recordset);
    } catch (err) {
      console.error('Error retrieving average player age per team:', err);
      res.status(500).json({ message: 'Error retrieving average player age per team', error: err.message });
    }
  });
  
  // API to fetch teams with coaches having above-average experience
app.get('/getTeamsWithExperiencedCoaches', async (req, res) => {
    try {
        // Connect to the database
        const pool = await sql.connect(dbConfig);

        // Execute the SQL query
        const result = await pool.request()
            .query(`
                SELECT 
                    t.Name AS TeamName,
                    c.Name AS CoachName,
                    c.Experience AS CoachExperience
                FROM 
                    Coach c
                JOIN 
                    Team t ON c.TeamID = t.TeamID
                WHERE 
                    c.Experience > (SELECT AVG(Experience) FROM Coach);
            `);

        // Return the result as a JSON response
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('Error fetching teams with experienced coaches:', err);
        res.status(500).json({ message: 'Error fetching teams with experienced coaches', error: err.message });
    }
});

// API to fetch the team with the highest sponsorship
app.get('/getTeamWithHighestSponsorship', async (req, res) => {
    try {
        // Connect to the database
        const pool = await sql.connect(dbConfig);

        // Execute the query
        const result = await pool.request().query(`
            SELECT 
                T.TeamID,
                T.Name AS TeamName,
                S.TotalSponsorship
            FROM 
                Team T
            INNER JOIN (
                SELECT 
                    TeamID, 
                    SUM(SI.Amount) AS TotalSponsorship
                FROM 
                    Sponsorship S
                INNER JOIN SponsorInformation SI ON S.SponsorID = SI.SponsorID
                GROUP BY 
                    TeamID
            ) AS S ON T.TeamID = S.TeamID
            WHERE 
                S.TotalSponsorship = (
                    SELECT MAX(SumSponsorship)
                    FROM (
                        SELECT 
                            TeamID, 
                            SUM(SI.Amount) AS SumSponsorship
                        FROM 
                            Sponsorship S
                        INNER JOIN SponsorInformation SI ON S.SponsorID = SI.SponsorID
                        GROUP BY 
                            TeamID
                    ) AS InnerQuery
                );
        `);

        // Check if any record is found
        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'No data found.' });
        }

        // Send the result as JSON
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('Error fetching team with highest sponsorship:', err);
        res.status(500).json({ message: 'Error fetching team with highest sponsorship', error: err.message });
    }
});
// API to fetch match duration in minutes
app.get('/getMatchDuration', async (req, res) => {
    try {
        // Connect to the database
        const pool = await sql.connect(dbConfig);

        // Execute the SQL query
        const result = await pool.request()
            .query(`
                SELECT 
                    MatchID,
                    StartTime,
                    EndTime,
                    DATEDIFF(MINUTE, StartTime, EndTime) AS DurationInMinutes
                FROM 
                    MatchTimeDetails;
            `);

        // Send the result as JSON
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error('Error fetching match duration:', err);
        res.status(500).json({ message: 'Error fetching match duration', error: err.message });
    }
});


// Start the server on port 5000
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
