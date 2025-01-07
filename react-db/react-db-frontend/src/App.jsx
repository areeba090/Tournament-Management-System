import React from 'react';
import AddPlayer from './Components/AddPlayer';
import MatchDetails from './Components/MatchDetails';
import VenueAndUmpireDetails from './Components/VenueAndUmpireDetails';
import PlayerDetails from './Components/PlayerDetails';
import AverageWickets from './Components/AverageWickets';
import TicketDetails from './Components/TicketDetails';
import MatchStats from './Components/MatchStats';
import AveragePlayerAge from './Components/AveragePlayerAge';
import TeamsWithExperiencedCoaches from './Components/TeamsWithExperiencedCoaches';
import MaxPointsTeams from './Components/MaxPointsTeams';
import HighestSponsorship from './Components/HighestSponsorship';
import MatchDuration from './Components/MatchDuration';

const App = () => {
  return (
    <div>
        <AddPlayer/>
        <MatchDetails/>
        <VenueAndUmpireDetails/>
        <PlayerDetails/>
        <AverageWickets/>
        <TicketDetails/>
        <MatchStats/>
       <MaxPointsTeams/>
        <AveragePlayerAge/>
        <TeamsWithExperiencedCoaches/>
        <HighestSponsorship/>
        <MatchDuration/>
    </div>
  );
};

export default App;
