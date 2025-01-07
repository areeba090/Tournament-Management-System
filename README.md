# Tournament-Management-System
 

This project is a **Tournament Management System** built using a React application with Vite, Node.js as the backend server, and an SQL database for data storage. The app features a user-friendly interface with 12 buttons, each executing a specific SQL query to manage tournament data.  

## Features  

- **React with Vite**: Simple front-end development.  
- **Node.js Backend**: Handles API requests and connects to the SQL database.  
- **SQL Database**: Stores all tournament-related data.  
- **12 Query Buttons**: Perform specific operations like adding, updating, deleting, and retrieving tournament information.  

## Prerequisites  

Before starting, ensure you have the following installed:  
- Node.js  
- npm   
- SQL database (e.g.SSMS, MsSQL)  

# Installation and Setup  

# 1. Clone the Repository  
  
# 2. Install Dependencies
# For Frontend
- cd react-db-frontend
- Axios 
- npm install

# For Backend
- cors
- mssql
- express 

# 3. Configure the Database
Create an SQL database for the project.
Import the provided schema.sql file into your database.
Update the database connection details in the server/config/db.js file.

# 4. Start the Project
Start Backend

node server.js 

Start Frontend

cd react-db-frontend

npm run dev 

The application should now be accessible at http://localhost:5173.

# Application Details
Database Schema

create and insert all 15 tables given


# Query Buttons
Each button triggers a specific SQL query:

# Insert Player Data:
Add a new player to the Player table.
# Fetch Match Details:
View match details with team names, venue, and umpire information.
# Venue and Umpire Info:
Get venue and umpire details for each match.
# Player Details: 
Retrieve stats for a specific player, such as runs, wickets, and catches.
# Team Wicket Averages:
Calculate the average wickets per team.
# Ticket and Tournament Info:
Retrieve buyer name, tournament name, and venue for tickets.
# Match Stats: 
View total runs and catches for both teams in a match.
# Top Team Venues: 
Find venues and points for matches played by the top team.
# Player Age Averages:
Calculate the average age of players for each team.
# Experienced Coaches:
View teams with above-average experienced coaches.
# Top Sponsorships:
Retrieve the team with the highest sponsorship amount.
# Match Duration:
Calculate the duration of each match in minutes.
 
# Technologies Used
Frontend: React (with Vite)
Backend: Node.js, Express.js
Database: SQL (MySQL/PostgreSQL)



