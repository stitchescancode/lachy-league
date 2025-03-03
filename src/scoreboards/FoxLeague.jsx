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

import '../css/FoxLeagueScoreboard.css';

function darkenColor(hex, percentage) {
    if (!hex.startsWith('#')) hex = `#${hex}`;
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);

    r = Math.max(0, Math.min(255, Math.round(r - (r * percentage / 100))));
    g = Math.max(0, Math.min(255, Math.round(g - (g * percentage / 100))));
    b = Math.max(0, Math.min(255, Math.round(b - (b * percentage / 100))));

    const darkenedHex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
    return darkenedHex;
}

const width = '15rem';

function FoxLeague({ scoreboardStatus, initialMatchData, fullCompleteValue, statusOfGame, scores, clock }) {
    const [matchData, setMatchData] = useState(initialMatchData || {});
    const [animationTrigger, setAnimationTrigger] = useState(false);
    const [scoreboardAnimationTrigger, setScoreboardAnimationTrigger] = useState(false);
    const [lastActive, setLastActive] = useState(true);
    const [status, setStatus] = useState(0);
    const [middleVisible, setMiddleVisible] = useState(false);
    const [scoreboardWidth, setScoreboardWidth] = useState('30rem');
    const [scoresValue, setScores] = useState({})

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

    const checkStatusChange = () => {
        setInterval(() => {
            if (statusOfGame !== status) {
                console.log("Status changed:", statusOfGame);
                setStatus(statusOfGame);
            }
        }, 500); // Checks every 500ms
    };

    useEffect(() => {
        console.log(clock)
    }, [clock])

    // Start the loop immediately
    useEffect(() => {
        checkStatusChange();
    }, []); // Runs once when the component is mounted

    useEffect(() => {
        if (fullCompleteValue !== 0) {
            setAnimationTrigger(true);
            const timer = setTimeout(() => {
                setAnimationTrigger(false);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [fullCompleteValue]);

    useEffect(() => {
        // Check the initial status and set the middle visibility and scoreboard width accordingly
        if (status === 0) {
            setMiddleVisible(false);
            setScoreboardWidth('30rem');
        } else {
            setMiddleVisible(true);
            setScoreboardWidth('50rem');
        }

        // Optionally, cleanup or reset if the component is about to be unmounted or updated
        return () => {
            // Reset state if necessary, like clearing animations or data
        };
    }, [status]); // Only trigger this effect when `status` changes    

    useEffect(() => {
        const interval = setInterval(() => {
            setLastActive(true);
        }, 500);

        return () => {
            clearInterval(interval);
            setLastActive(false);
        };
    }, []);

    useEffect(() => {
        setScoreboardAnimationTrigger(true);
    }, []);

    useEffect(() => {
        if (!scoreboardStatus && lastActive === true) {
            setLastActive(false);
            setTimeout(() => { }, 500); // Delay animation
        }
    }, [scoreboardStatus, lastActive]);

    if (!scoreboardStatus) {
        return null;
    }

    const getColor = (teamName) => {
        switch (teamName) {
            case 'Sydney Roosters': return '#E82C2E';
            case 'Melbourne Storm': return '#632390';
            case 'Canberra Raiders': return '#C3D941';
            case 'Penrith Panthers': return '#221F20';
            case 'Manly Warringah Sea Eagles': return '#6F0F3B';
            case 'Gold Coast Titans': return '#0072AE';
            case 'Brisbane Broncos': return '#760036';
            case 'Canterbury-Bankstown Bulldogs': return '#0054A4';
            case 'Cronulla Sharks': return '#0088b9';
            case 'Dolphins': return '#f70e15';
            case 'New Zealand Warriors': return '#108048';
            case 'Newcastle Knights': return '#00539F';
            case 'North Queensland Cowboys': return '#FFDD02';
            case 'Parramatta Eels': return '#FFD326';
            case 'South Sydney Rabbitohs': return '#003C1A';
            case 'St George Illawarra Dragons': return '#E2231B';
            case 'Wests Tigers': return '#F68C1A';
            case 'Wigan Warriors': return '#84222f';
            case 'Warrington Wolves': return '#005ba5';
            case 'Australia Jillaroos': return '#00843D';
            case 'England Lionesses': return '#ffffff';
            default: return '';
        }
    };

    const getImageSize = (teamName) => {
        switch (teamName) {
            case 'Sydney Roosters': return ['0rem', '-.6rem', '-1.4rem', '0rem', '6rem'];
            case 'Melbourne Storm': return ['0rem', '-1.9rem', '-1.5rem', '0rem', '5rem'];
            case 'Canberra Raiders': return ['0rem', '-1.975rem', '-1.9rem', '0rem', '7rem'];
            case 'Penrith Panthers': return ['0rem', '-4.2rem', '-2.7rem', '0rem', '9rem']; // Right, left, top, bottom
            case 'Manly Warringah Sea Eagles': return '#6F0F3B';
            case 'Gold Coast Titans': return ['0rem', '-0.5rem', '0rem', '0rem', '4rem'];
            case 'Brisbane Broncos': return ['0rem', '-1.7rem', '-0.6rem', '0rem', '5rem'];
            case 'Canterbury-Bankstown Bulldogs': return ['0rem', '-1.2rem', '0rem', '0rem', '6rem'];
            case 'Cronulla Sharks': return ['0rem', '-1.7rem', '-1.2rem', '0rem', '5rem'];
            case 'Dolphins': return ['0rem', '0rem', '-1.5rem', '0rem', '10rem']; // Right, left, top, bottom
            case 'New Zealand Warriors': return ['0rem', '-1.05rem', '-1rem', '0rem', '5rem'];
            case 'Newcastle Knights': return ['0rem', '-1.4rem', '-1.2rem', '0rem', '5rem'];
            case 'North Queensland Cowboys': ['0rem', '0rem', '0rem', '0rem', '3rem'];
            case 'Parramatta Eels': return ['0rem', '0.4rem', '-1.4rem', '0rem', '6rem'];
            case 'South Sydney Rabbitohs': return ['0rem', '.5rem', '-1.7rem', '0rem', '6rem']
            case 'St George Illawarra Dragons': return ['0rem', '0rem', '-.6rem', '0rem', '5rem'];
            case 'Wests Tigers': return ['0rem', '-1.7rem', '-1.4rem', '0rem', '6.5rem'];
            case 'Wigan Warriors': return ['0rem', '-2rem', '-2.2rem', '0rem', '7rem'];
            case 'Warrington Wolves': return ['0rem', '-1.5rem', '-2.2rem', '0rem', '6rem'];
            case 'Australia Jillaroos': return ['0rem', '-3.1rem', '-2.5rem', '0rem', '8.5rem']; // Right, left, top, bottom
            case 'England Lionesses': return ['0rem', '-1.8rem', '-.4rem', '0rem', '7rem']; // Right, left, top, bottom
            default: return '';
        }
    };

    const home_team_color = getColor(matchData.home_team);
    const away_team_color = getColor(matchData.away_team);
    const home_team_darkened_color = darkenColor(home_team_color, 20);
    const away_team_darkened_color = darkenColor(away_team_color, 20);

    const splitTeamNameAtMiddle = (teamName) => {
        if (!teamName) return ['', ''];

        if (teamName === 'Dolphins') return ['', 'Dolphins'];

        const trimmedName = teamName.trim();
        const middleIndex = Math.floor(trimmedName.length / 2);
        let splitIndex = trimmedName.indexOf(' ', middleIndex);

        if (splitIndex === -1) {
            splitIndex = trimmedName.lastIndexOf(' ', middleIndex);
        }

        if (splitIndex === -1) {
            return [trimmedName, ''];
        }

        const part1 = trimmedName.slice(0, splitIndex);
        const part2 = trimmedName.slice(splitIndex + 1);
        return [part1, part2];
    };

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
            default: return '';
        }
    };

    const homeTeamName = splitTeamNameAtMiddle(matchData.home_team);
    const awayTeamName = splitTeamNameAtMiddle(matchData.away_team);

    let scorebugAnim = lastActive === true ? 'removeWidth' : 'expandWidth';

    const convertSecondsToMMSS = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <div
            className="scoreboard"
            style={{
                '--scoreboard-trigger': scoreboardWidth,
                '--animToPlay': lastActive ? 'expandWidth' : 'removeWidth',
                '--scoreboardStatus': statusOfGame ? '2.3rem' : '2.7rem',
                '--home_image_pos_right': getImageSize(matchData.home_team)[0],
                '--home_image_pos_left': getImageSize(matchData.home_team)[1],
                '--home_image_pos_top': getImageSize(matchData.home_team)[2],
                '--home_image_pos_bottom': getImageSize(matchData.home_team)[3],
                '--home_image_size': getImageSize(matchData.home_team)[4],
                '--away_image_pos_right': getImageSize(matchData.away_team)[0],
                '--away_image_pos_left': getImageSize(matchData.away_team)[1],
                '--away_image_pos_top': getImageSize(matchData.away_team)[2],
                '--away_image_pos_bottom': getImageSize(matchData.away_team)[3],
                '--away_image_size': getImageSize(matchData.away_team)[4],
            }}
        >
            <div className="teams" style={{ '--home-team-color': home_team_color, '--home-team-darkened-color': home_team_darkened_color }}>
                <div className="home-logo-wrapper" style={{ '--home_team_color': home_team_color, '--home_team_darkened_color': home_team_darkened_color }}>
                    <div className="logo">
                        <img className="img home_team_img" src={getLogo(matchData.home_team)} alt={matchData.home_team} />
                    </div>
                </div>
                <div className="names">
                    <p className="no-margin">{homeTeamName[0]}</p>
                    <h1 className="no-margin">{homeTeamName[1]}</h1>
                </div>
            </div>
            <div className="middle" style={{ display: (statusOfGame !== 0 ? 'block' : 'none') }}>
                {statusOfGame !== 0 && (
                    <>
                        <h1>{scoresValue.homeScore} - {scoresValue.awayScore}</h1>
                    </>
                )}
            </div>
            <div className="second-teams-div" style={{ '--away-team-color': away_team_color, '--away-team-darkened-color': away_team_darkened_color }}>
                <div className="away-logo-wrapper" style={{ '--away_team_color': away_team_color, '--away_team_darkened_color': away_team_darkened_color }}>
                    <div className="logo">
                        <img className="img away_team_img" src={getLogo(matchData.away_team)} alt={matchData.away_team} />
                    </div>
                </div>
                <div className="names">
                    <p className="no-margin">{awayTeamName[0]}</p>
                    <h1 className="no-margin">{awayTeamName[1]}</h1>
                </div>
            </div>
            {
                statusOfGame === 0 ? (
                    null
                ) : statusOfGame === 1 ? (
                    // New functionality for status 1
                    <div className="clock">
                        <h2 className="no-margin">H1</h2>
                        <h1 className="no-margin">{convertSecondsToMMSS(clock)}</h1>
                    </div>
                ) : statusOfGame === 2 ? (
                    <div className="clock">
                        <h2 className="no-margin">HALF</h2>
                        <h2 className="no-margin">TIME</h2>
                    </div>
                ) : statusOfGame === 3 ? (
                    // New functionality for status 3
                    <div className="clock">
                        <h2 className="no-margin">H2</h2>
                        <h1 className="no-margin">{convertSecondsToMMSS(clock)}</h1>
                    </div>
                ) : statusOfGame === 4 ? (
                    // New functionality for status 4
                    <div className="clock">
                        <h2 className="no-margin">FULL</h2>
                        <h2 className="no-margin">TIME</h2>
                    </div>
                ) : (
                    // Default case if no recognized status
                    <div className="unknown-status">
                        <h2>Unknown Status</h2>
                    </div>
                )
            }
            {fullCompleteValue !== 0 && (
                <div className="tackle-count" style={{ '--tackle-scale': animationTrigger ? '1.1' : '1' }}>
                    <h1 className="no-margin" key={fullCompleteValue}>
                        {fullCompleteValue === 'zero'
                            ? 'ZERO'
                            : fullCompleteValue === 1
                                ? '1ST'
                                : fullCompleteValue === 2
                                    ? '2ND'
                                    : fullCompleteValue === 3
                                        ? '3RD'
                                        : `${fullCompleteValue}TH`}
                    </h1>
                </div>
            )}
        </div>
    );
}

export default FoxLeague;