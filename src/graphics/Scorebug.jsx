import React, { useState, useEffect } from 'react';
import Roosters from '../assets/roosters.webp';
import Raiders from '../assets/raiders.webp';
import Panthers from '../assets/panthers.webp';
import Storm from '../assets/storm.webp';
import Manly from '../assets/manly.svg';
import Titans from '../assets/titans.webp';
import Broncos from '../assets/broncos.webp';
import Bulldogs from '../assets/bulldogs.webp';
import Sharks from '../assets/sharks.webp';
import Dolphins from '../assets/dolphins.svg';
import Warriors from '../assets/warriors.webp';
import Knights from '../assets/knights.webp';
import Cowboys from '../assets/cowboys.webp';
import Eels from '../assets/eels.webp';
import Rabbitohs from '../assets/rabbitohs.svg';
import Dragons from '../assets/dragons.svg';
import Tigers from '../assets/tigers.webp';
import Wigan from '../assets/wigan-warriors.webp';
import Warrington from '../assets/warrington-wolves.svg';
import AustraliaWomen from '../assets/australia-jillaroos.svg';
import EnglishWomen from '../assets/england-lionesses.png';

function Scorebug({ initialMatchData, scores, statusOfGame, scorebugStatus }) {
    const [matchData, setMatchData] = useState(initialMatchData || {});
    const [scoresValue, setScores] = useState({
        homeScore: 0,
        awayScore: 0,
    });
    const [status, setStatus] = useState(0);
    const [scorebugVisibility, setScorebugVisibility] = useState(false); // Local state for visibility based on scorebugStatus

    useEffect(() => {
        if (scorebugStatus) {
            setScorebugVisibility(true);
        } else {
            setScorebugVisibility(false);
        }
    }, [scorebugStatus]);

    useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes ScorebugWidth {
                0% { width: 0; }
                100% { width: 23rem; }
            }
        `;
        document.head.appendChild(style);

        // Cleanup function to remove the added style on component unmount
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    useEffect(() => {
        if (initialMatchData) {
            setMatchData(initialMatchData);
        }
    }, [initialMatchData]);

    useEffect(() => {
        if (scores) {
            setScores(scores);
        }
    }, [scores]);

    useEffect(() => {
        if (statusOfGame !== status) {
            setStatus(statusOfGame);
        }
    }, [statusOfGame, status]);

    const getLogo = (teamName) => {
        switch (teamName) {
            case 'Sydney Roosters': return Roosters;
            case 'Melbourne Storm': return Storm;
            case 'Canberra Raiders': return Raiders;
            case 'Penrith Panthers': return Panthers;
            case 'Manly Warringah Sea Eagles': return Manly;
            case 'Gold Coast Titans': return Titans;
            case 'Brisbane Broncos': return Broncos;
            case 'Canterbury-Bankstown Bulldogs': return Bulldogs;
            case 'Cronulla Sharks': return Sharks;
            case 'Dolphins': return Dolphins;
            case 'New Zealand Warriors': return Warriors;
            case 'Newcastle Knights': return Knights;
            case 'North Queensland Cowboys': return Cowboys;
            case 'Parramatta Eels': return Eels;
            case 'South Sydney Rabbitohs': return Rabbitohs;
            case 'St George Illawarra Dragons': return Dragons;
            case 'Wests Tigers': return Tigers;
            case 'Wigan Warriors': return Wigan;
            case 'Warrington Wolves': return Warrington;
            case 'Australia Jillaroos': return AustraliaWomen;
            case 'England Lionesses': return EnglishWomen;
            default: return ''; // If no logo is found
        }
    };

    const statusFunction = (statusCode) => {
        switch (statusCode) {
            case 0: return 'Pregame';
            case 1: return '1st half';
            case 2: return 'Halftime';
            case 3: return '2nd half';
            case 4: return 'Fulltime';
            default: return 'Unknown';
        }
    };

    if (!scorebugVisibility) {
        return null; // If scorebugVisibility is false, don't render the scorebug
    }

    return (
        <div
            className="scorebug"
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                backgroundColor: '#313131',
                width: '23rem',
                height: '5rem',
                position: 'absolute',
                top: '2.2rem',
                left: '3.6rem',
                textTransform: 'uppercase',
                fontFamily: "Sour Gummy, sans-serif",
                color: 'white',
                animation: scorebugVisibility ? 'ScorebugWidth .3s ease-in-out forwards' : ''
            }}
        >
            <div
                className="left"
                style={{
                    display: 'flex',
                    justifyContent: 'end',
                    alignItems: 'center',
                    height: '5rem',
                    width: '6rem',
                    borderRadius: '.5rem',
                    borderBottomRightRadius: '10rem',
                    borderTopRightRadius: '10rem',
                    backgroundColor: '#000',
                    boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.5)',
                }}
            >
                <div
                    className="img left_circle"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '4rem',
                        height: '4rem',
                        backgroundColor: '#313131',
                        borderRadius: '50rem',
                        marginRight: '.5rem',
                    }}
                >
                    <img src={getLogo(matchData.home_team)} alt={matchData.home_team} style={{ height: '2.2rem' }} />
                </div>
            </div>
            <div
                className="middle"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '5rem',
                }}
            >
                <h2 style={{ margin: 0 }}>
                    {scoresValue.homeScore} - {scoresValue.awayScore}
                </h2>
                <p style={{ margin: 0 }}>{statusFunction(status)}</p>
            </div>
            <div
                className="right"
                style={{
                    display: 'flex',
                    justifyContent: 'start',
                    alignItems: 'center',
                    height: '5rem',
                    width: '6rem',
                    borderRadius: '.5rem',
                    borderBottomLeftRadius: '10rem',
                    borderTopLeftRadius: '10rem',
                    backgroundColor: '#000',
                    boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.5)',
                }}
            >
                <div
                    className="img right_circle"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '4rem',
                        height: '4rem',
                        backgroundColor: '#313131',
                        borderRadius: '50rem',
                        marginLeft: '.5rem',
                    }}
                >
                    <img src={getLogo(matchData.away_team)} alt={matchData.away_team} style={{ height: '2.2rem' }} />
                </div>
            </div>
        </div>
    );
}

export default Scorebug;