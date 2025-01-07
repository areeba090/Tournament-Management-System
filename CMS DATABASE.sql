create database CricketManagementSystem
use CricketManagementSystem
go
CREATE TABLE Umpire (
    UmpireID INT PRIMARY KEY,
    Name VARCHAR(50),
    Experience INT
);

INSERT INTO Umpire VALUES
(1, 'Nitin Menon', 12),
(2, 'Kumar Dharmasena', 15),
(3, 'Aleem Dar', 18),
(4, 'Marais Erasmus', 15),
(5, 'Abubakar', 13);

CREATE TABLE Team (
    TeamID INT PRIMARY KEY,
    Name VARCHAR(50),
    CoachID INT
);
CREATE TABLE Venue (
    VenueID INT PRIMARY KEY,
    Name VARCHAR(50),
    City VARCHAR(50),
    Capacity INT
);

INSERT INTO Venue (VenueID, Name, City, Capacity) VALUES
(1, 'Eden Gardens', 'Kolkata', 60000),
(2, 'MCG', 'Melbourne', 55000),
(3, 'Lord''s', 'London', 30000),
(4, 'MCG', 'Mumbai', 25000),
(5, 'The Oval', 'London', 25000);


INSERT INTO Team VALUES
(1, 'India', 1),
(2, 'Australia', 2),
(3, 'England', 3),
(4, 'Pakistan', 4),
(5, 'New Zealand', 5);

CREATE TABLE Coach (
    CoachID INT PRIMARY KEY,
    TeamID INT,
    Name VARCHAR(50),
    Experience INT,
    FOREIGN KEY (TeamID) REFERENCES Team(TeamID)
);

INSERT INTO Coach VALUES
(1, 1, 'Ricky Ponting', 10),
(2, 2, 'Shane Warne', 12),
(3, 4, 'Waseem Akram', 12),
(4, 4, 'Gary Kirsten', 8),
(5, 5, 'Justin Langer', 7);

-- Step 2: Create tables with direct dependencies
CREATE TABLE Match (
    MatchID INT PRIMARY KEY,
    TeamID1 INT,
    TeamID2 INT,
    VenueID INT,
    UmpireID INT,
    FOREIGN KEY (TeamID1) REFERENCES Team(TeamID),
    FOREIGN KEY (TeamID2) REFERENCES Team(TeamID),
    FOREIGN KEY (UmpireID) REFERENCES Umpire(UmpireID)
);

INSERT INTO Match VALUES

(2, 2, 3, 2, 2),
(3, 3, 1, 3, 4),45s b  
(4, 4, 5, 5, 4),
(1, 1, 2, 1, 1),
(5, 5, 4, 5, 5);

CREATE TABLE Tournament (
    TournamentID INT PRIMARY KEY,
    Name VARCHAR(50),
    StartDate DATE,
    EndDate DATE,
    VenueID INT
);

INSERT INTO Tournament VALUES
(1, 'ICC World Cup', '2024-03-01', '2024-04-01', 1),
(2, 'IPL 2024', '2024-05-01', '2024-06-30', 1),
(3, 'IPL 2024 (Phase 2)', '2024-04-15', '2024-06-30', 3),
(4, 'T20 World Cup', '2024-04-15', '2024-09-01', 4),
(5, 'Champions Trophy', '2024-10-01', '2024-10-31', 5);

-- Step 3: Create tables with player details
CREATE TABLE Player (
    PlayerID INT PRIMARY KEY,
    TeamID INT,
    Name VARCHAR(50),
    Age INT,
    FOREIGN KEY (TeamID) REFERENCES Team(TeamID)
);


INSERT INTO Player VALUES
(1, 1, 'Virat Kohli', 34),
(2, 3, 'Steve Smith', 35),
(3, 3, 'Babar Azam', 33),
(4, 4, 'Waseem akram', 37),
(5, 5, 'Kane Williamson', 33);

CREATE TABLE PlayerStats (
    PlayerStatsID INT PRIMARY KEY,
    PlayerID INT,
    FOREIGN KEY (PlayerID) REFERENCES Player(PlayerID)
);

INSERT INTO PlayerStats VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

CREATE TABLE PlayerStatsDetails (
    PlayerID INT PRIMARY KEY,
    Runs INT,
    Wickets INT,
    Catches INT,
    FOREIGN KEY (PlayerID) REFERENCES Player(PlayerID)
);

INSERT INTO PlayerStatsDetails VALUES
(1, 500, 20, 15),
(2, 600, 30, 18),
(3, 500, 25, 10),
(4, 700, 30, 20),
(5, 550, 28, 18);

-- Step 4: Create tables with team statistics
CREATE TABLE TeamStats (
    TeamStatsID INT PRIMARY KEY,
    TeamID INT,
    FOREIGN KEY (TeamID) REFERENCES Team(TeamID)
);

INSERT INTO TeamStats VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

CREATE TABLE TeamStatisticsDetails (
    TeamID INT PRIMARY KEY,
    Wins INT,
    MatchesPlayed INT,
    Losses INT,
    Points INT,
    FOREIGN KEY (TeamID) REFERENCES Team(TeamID)
);

INSERT INTO TeamStatisticsDetails VALUES
(1, 10, 15, 5, 20),
(2, 12, 16, 4, 24),
(3, 8, 14, 5, 16),
(4, 8, 14, 6, 16),
(5, 14, 18, 4, 28);

-- Step 5: Create sponsorship tables
CREATE TABLE Sponsorship (
    SponsorID INT,
    TeamID INT,
    MatchID INT,
    FOREIGN KEY (TeamID) REFERENCES Team(TeamID),
    FOREIGN KEY (MatchID) REFERENCES Match(MatchID),
    PRIMARY KEY (SponsorID, TeamID, MatchID)
);

INSERT INTO Sponsorship VALUES
(1, 1, 1),
(2, 2, 1),
(3, 2, 3),
(4, 3, 4),
(5, 4, 5);

CREATE TABLE SponsorInformation (
    SponsorID INT PRIMARY KEY,
    Name VARCHAR(50),
    Amount INT
);

INSERT INTO SponsorInformation VALUES
(1, 'Pepsi', 5000000),
(2, 'Adidas', 4000000),
(3, 'Nike', 3500000),
(4, 'Puma', 3000000);

-- Step 6: Create ticket details
CREATE TABLE TicketDetails (
    TicketID INT PRIMARY KEY,
    MatchID INT,
    SeatNumber VARCHAR(10),
    BuyerName VARCHAR(50),
    FOREIGN KEY (MatchID) REFERENCES Match(MatchID)
);

INSERT INTO TicketDetails VALUES
(1, 1, 'A1', 'John Doe'),
(2, 1, 'A2', 'Alice Smith'),
(3, 2, 'B1', 'Emma Watson'),
(4, 4, 'A5', 'Emma Watson'),
(5, 3, 'C1', 'Robert Downey');

-- Step 7: Create match time details
CREATE TABLE MatchTimeDetails (
    MatchID INT PRIMARY KEY,
    StartTime TIME,
    EndTime TIME,
    FOREIGN KEY (MatchID) REFERENCES Match(MatchID)
);

INSERT INTO MatchTimeDetails VALUES
(1, '10:00:00', '13:00:00'),
(2, '11:00:00', '14:00:00'),
(3, '10:00:00', '16:00:00'),
(4, '14:00:00', '17:00:00'),
(5, '15:00:00', '17:00:00');
INSERT INTO Player (PlayerID, TeamID, Name, Age)
VALUES (6, 2, 'David Warner', 37);
select *from Player






--QUERIES
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


SELECT 
    m.MatchID,
    (SELECT City FROM Venue v WHERE v.VenueID = m.VenueID) AS VenueCity,
    (SELECT Name FROM Umpire u WHERE u.UmpireID = m.UmpireID) AS UmpireName
FROM Match m;



SELECT 
    p.PlayerID,
    p.Name AS PlayerName,
    t.Name AS TeamName,
    ps.Runs,
    ps.Wickets,
    ps.Catches
FROM Player p
JOIN Team t ON p.TeamID = t.TeamID
JOIN PlayerStatsDetails ps ON p.PlayerID = ps.PlayerID;



SELECT t.Name AS TeamName, AVG(ps.Wickets) AS AverageWickets
FROM Player p
JOIN Team t ON p.TeamID = t.TeamID
JOIN PlayerStatsDetails ps ON p.PlayerID = ps.PlayerID
GROUP BY t.Name;



SELECT 
    td.TicketID,
    m.MatchID,
    m.TeamID1 AS Team1ID,
    t1.Name AS Team1Name,
    m.TeamID2 AS Team2ID,
    t2.Name AS Team2Name,
    v.Name AS VenueName,
    td.SeatNumber,
    td.BuyerName
FROM 
    TicketDetails td
JOIN 
    Match m ON td.MatchID = m.MatchID
JOIN 
    Team t1 ON m.TeamID1 = t1.TeamID
JOIN 
    Team t2 ON m.TeamID2 = t2.TeamID
JOIN 
    Venue v ON m.VenueID = v.VenueID;



SELECT 
    td.TicketID,
    td.BuyerName,
    td.SeatNumber,  -- Added SeatNumber
    t.Name AS TournamentName,
    v.Name AS VenueName
FROM 
    TicketDetails td
JOIN 
    Match m ON td.MatchID = m.MatchID
JOIN 
    Tournament t ON m.VenueID = t.VenueID
JOIN 
    Venue v ON m.VenueID = v.VenueID where TicketID=1 



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



	SELECT 
    p1.PlayerID, p1.Name AS Player1Name, ps1.Runs, ps1.Catches
FROM Player p1
JOIN PlayerStatsDetails ps1 ON p1.PlayerID = ps1.PlayerID
WHERE p1.TeamID = (SELECT TeamID1 FROM Match WHERE MatchID = 1);

SELECT 
    p2.PlayerID, p2.Name AS Player2Name, ps2.Runs, ps2.Catches
FROM Player p2
JOIN PlayerStatsDetails ps2 ON p2.PlayerID = ps2.PlayerID
WHERE p2.TeamID = (SELECT TeamID2 FROM Match WHERE MatchID = 1);


SELECT Name 
FROM Venue 
WHERE VenueID IN (
    SELECT VenueID 
    FROM Match 
    WHERE TeamID1 = (
        SELECT TeamID 
        FROM TeamStatisticsDetails 
        WHERE Points = (SELECT MAX(Points) FROM TeamStatisticsDetails)
    ) OR TeamID2 = (
        SELECT TeamID 
        FROM TeamStatisticsDetails 
        WHERE Points = (SELECT MAX(Points) FROM TeamStatisticsDetails)
    )
);



SELECT 
    t.Name AS TeamName,
    AVG(p.Age) AS AveragePlayerAge
FROM 
    Player p
JOIN 
    Team t ON p.TeamID = t.TeamID
GROUP BY 
    t.Name
ORDER BY 
    AveragePlayerAge DESC;

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



	SELECT 
    MatchID,
    StartTime,
    EndTime,
    DATEDIFF(MINUTE, StartTime, EndTime) AS DurationInMinutes
FROM 
    MatchTimeDetails;
