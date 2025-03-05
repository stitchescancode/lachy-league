import { useState, useEffect } from 'react';
import Logo from '../logos/positive-variant/lachy-league.png';

import axios from 'axios';
import StudioUpdate from './graphics/StudioUpdate';

import LogoFunction from './graphics/LogoFunction';
import FoxLeague from './scoreboards/FoxLeague';

import Scorebug from './graphics/Scorebug'
import Stats from './graphics/Stats'
import FixturesTable from './graphics/FixturesTable';
import Commentators from './graphics/Commentators';

import BottomNextGame from './graphics/BottomNextGame'

function Screen() {
  const [matchData, setMatchData] = useState({});
  const [updateStatus, setUpdateStatus] = useState(false);
  const [text, setText] = useState('');
  const [updateLiveStatus, setUpdateLiveStatus] = useState(false);
  const [logoGraphicStatus, setLogoGraphicStatus] = useState(false);
  const [scoreboardGraphicStatus, setScoreboardGraphicStatus] = useState(false);
  const [scores, setScores] = useState({});
  const [statusOfGame, setStatusOfGame] = useState(0);
  const [tackleCount, setTackleCount] = useState(0);
  const [clockSeconds, setClockSeconds] = useState(0);
  const [scorebugStatus, setScorebugStatus] = useState(false);
  const [statsText, setStatsText] = useState(`Welcome to Lachy League on Channel ${import.meta.env.VITE_CHANNEL_NUMBER} `);
  const [statsValue, setStatsValue] = useState('');


  const logoStyle = {
    position: 'absolute',
    height: '8rem',
    right: '1.7rem',
    top: '1.3rem'
  };

  const imgStyle = {
    height: '8rem',
    right: '1.7rem',
    top: '1.3rem'
  };

  const channelDiv = {
    display: 'flex',
    position: "relative",
    bottom: '1rem',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem', // Increased font size for more emphasis
    gap: '.5rem',
    fontFamily: "Barlow Condensed, sans-serif",
    fontWeight: 'bold', // Added boldness to make it pop more
    color: '#fff', // White text for visibility
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)', // Adds subtle shadow for contrast
    height: '2rem'
  };

  const HDDiv = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: `${import.meta.env.VITE_COLOR}`,
    height: '2rem',
    width: 'max-content',
    fontSize: '1.4rem', // Slightly larger HD text for visibility
    padding: '0 1rem', // Adds more padding for emphasis
  };

  const LiveDiv = {
    position: 'relative',
    bottom: '.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `${import.meta.env.VITE_COLOR}`,
    height: '1.4rem',
    width: '75px',
    fontSize: '1.4rem',
    padding: '0.4rem 1rem',
    margin: '0 auto',
    color: '#fff',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
    fontFamily: "Barlow Condensed, sans-serif",
    fontWeight: 'bold' // Added boldness to make it pop more
  };



  useEffect(() => {
    const fetchStatusGraphicStatus = async () => {
      try {
        const response = await axios.get('http://localhost:3000/toggle');
        if (response.data && response.data.update_graphic_status !== undefined) {
          setUpdateStatus(response.data.update_graphic_status);
        } else {
          console.error("Unexpected response format:", response);
        }
      } catch (err) {
        console.error("Error fetching graphic status:", err);
      }
    };
    const fetchLiveGraphicStatus = async () => {
      try {
        const response = await axios.get('http://localhost:3000/toggle');
        if (response.data && response.data.live_graphic_status !== undefined) {
          setUpdateLiveStatus(response.data.live_graphic_status);
        } else {
          console.error("Unexpected response format:", response);
        }
      } catch (err) {
        console.error("Error fetching graphic status:", err);
      }
    };
    const fetchText = async () => {
      try {
        const response = await axios.get('http://localhost:3000/toggle');
        if (response.data && response.data.update_graphic_text !== undefined) {
          setText(response.data.update_graphic_text);
        } else {
          console.error("Unexpected response format:", response);
        }
      } catch (err) {
        console.error("Error fetching graphic status:", err);
      }
    };
    const fetchLogoGraphicStatus = async () => {
      try {
        const response = await axios.get('http://localhost:3000/toggle');
        if (response.data && response.data.logo_graphic_status !== undefined) {
          setLogoGraphicStatus(response.data.logo_graphic_status);
        } else {
          console.error("Unexpected response format:", response);
        }
      } catch (err) {
        console.error("Error fetching graphic status:", err);
      }
    };
    const fetchScoreboardGraphicStatus = async () => {
      try {
        const response = await axios.get('http://localhost:3000/toggle');
        if (response.data && response.data.scoreboard_graphic_status !== undefined) {
          setScoreboardGraphicStatus(response.data.scoreboard_graphic_status);
        } else {
          console.error("Unexpected response format:", response);
        }
      } catch (err) {
        console.error("Error fetching graphic status:", err);
      }
    };
    const fetchMatchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/toggle');
        if (response.data && response.data.selectedMatch !== undefined) {
          setMatchData(response.data.selectedMatch);
        } else {
          console.error("Unexpected response format:", response);
        }
      } catch (err) {
        console.error("Error fetching graphic status:", err);
      }
    };
    const fetchScores = async () => {
      try {
        const response = await axios.get('http://localhost:3000/toggle');
        if (response.data !== undefined) {
          let scoresTable = {
            homeScore: response.data.home_team_score,
            awayScore: response.data.away_team_score
          }
          setScores(scoresTable);
        } else {
          console.error("Unexpected response format:", response);
        }
      } catch (err) {
        console.error("Error fetching graphic status:", err);
      }
    };
    const fetchStatusOfGame = async () => {
      try {
        const response = await axios.get('http://localhost:3000/toggle');
        if (response.data && response.data.statusOfGame !== undefined) {
          setStatusOfGame(response.data.statusOfGame);
        } else {
          console.error("Unexpected response format:", response);
        }
      } catch (err) {
        console.error("Error fetching graphic status:", err);
      }
    };
    const fetchTackleCount = async () => {
      try {
        const response = await axios.get('http://localhost:3000/toggle');
        if (response.data && response.data.tackle_count !== undefined) {
          setTackleCount(response.data.tackle_count);
        } else {
          console.error("Unexpected response format:", response);
        }
      } catch (err) {
        console.error("Error fetching graphic status:", err);
      }
    };
    const fetchClock = async () => {
      try {
        const response = await axios.get('http://localhost:3000/toggle');
        if (response.data && response.data.clockSeconds !== undefined) {
          setClockSeconds(response.data.clockSeconds);
        } else {
          console.error("Unexpected response format:", response);
        }
      } catch (err) {
        console.error("Error fetching graphic status:", err);
      }
    };
    const fetchScorebug = async () => {
      try {
        const response = await axios.get('http://localhost:3000/toggle');
        if (response.data && response.data.scorebug_status !== undefined) {
          setScorebugStatus(response.data.scorebug_status);
        } else {
          console.error("Unexpected response format:", response);
        }
      } catch (err) {
        console.error("Error fetching graphic status:", err);
      }
    };
    const fetchStatsText = async () => {
      try {
        const response = await axios.get('http://localhost:3000/toggle');
        if (response.data && response.data.statsText !== undefined) {
          setStatsText(response.data.statsText);
        } else {
          console.error("Unexpected response format:", response);
        }
      } catch (err) {
        console.error("Error fetching graphic status:", err);
      }
    };
    const fetchStatsStatus = async () => {
      try {
        const response = await axios.get('http://localhost:3000/toggle');
        if (response.data && response.data.statsStatus !== undefined) {
          setStatsValue(response.data.statsStatus);
        } else {
          console.error("Unexpected response format:", response);
        }
      } catch (err) {
        console.error("Error fetching graphic status:", err);
      }
    };

    const intervalId = setInterval(() => {
      fetchStatusGraphicStatus();
      fetchLiveGraphicStatus();
      fetchText();
      fetchLogoGraphicStatus();
      fetchScoreboardGraphicStatus();
      fetchMatchData();
      fetchScores();
      fetchStatusOfGame();
      fetchTackleCount();
      fetchClock();
      fetchScorebug();
      fetchStatsStatus();
      fetchStatsText();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      {/* <BottomNextGame bottomNextGameStatus={updateStatus} statsValue={statsValue} bottomNextGameData={{ 'home_team': 'penrith-panthers', 'away_team': 'parramatta-eels', 'subtitle': 'NRL Round 1', 'first_player': "Nathan Cleary", 'second_player': "Mitchell Moses" }} /> */}
      <LogoFunction updateLiveStatus={updateLiveStatus} logoGraphicStatus={logoGraphicStatus} />
      <StudioUpdate updateStatus={updateStatus} text={text} statsValue={statsValue} />
      <FoxLeague scoreboardStatus={scoreboardGraphicStatus} initialMatchData={matchData} scores={scores} statusOfGame={statusOfGame} fullCompleteValue={tackleCount} clock={clockSeconds} />
      <Scorebug scorebugStatus={scorebugStatus} initialMatchData={matchData} scores={scores} statusOfGame={statusOfGame} />
      <Stats statsText={statsText} statsValue={statsValue} />
      {/* <FixturesTable /> */}
      {/* <Commentators /> */}
    </>
  );
}

export default Screen;