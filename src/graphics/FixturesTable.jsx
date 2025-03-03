import React from "react";
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

const teams = [
    {
        'home_team': 'Wigan Warriors',
        'away_team': 'Warrington Wolves',
        'status_of_game': 0,
        'kickoff': '8:30am'
    },
    {
        'home_team': 'Canberra Raiders',
        'away_team': 'New Zealand Warriors',
        'status_of_game': 0,
        'kickoff': '11am'
    },
    {
        'home_team': 'Australia Jillaroos',
        'away_team': 'England Lionesses',
        'status_of_game': 0,
        'kickoff': '1:30pm'
    },
    {
        'home_team': 'Penrith Panthers',
        'away_team': 'Cronulla Sharks',
        'status_of_game': 0,
        'kickoff': '3:30pm'
    }
];

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

function FixturesTable() {
    return (
        <div style={{
            backgroundColor: '#313131',
            fontFamily: "Sour Gummy, sans-serif",
            width: '30rem',
            color: 'white',
            borderRadius: '.5rem',
            padding: '1rem',
        }} className="container">
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                padding: '1rem 1.5rem'
            }} className="title">
                <h1 style={{
                    margin: '.5rem 0',
                    textTransform: 'uppercase',
                }}>Super Saturday</h1>
                <p style={{
                    margin: '0',
                    textTransform: 'uppercase',
                }}>Fixtures</p>
            </div>

            <div className="fixtures-list">
                {teams.map((match, index) => (
                    <div key={index} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '.15rem 1rem'
                    }} className="fixture">
                        <div style={{
                            width: '5rem',
                            height: '5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'black',
                            borderRadius: '100%',
                            position: 'relative',
                            overflow: 'hidden', // Ensure the image is cut off at the border
                            border: `3px solid var(--home-team-color)`, // Apply the border color dynamically
                            boxShadow: `0 0 10px 9px var(--home-team-darkened-color)`, // Apply the box shadow dynamically
                        }} className="home-team">
                            <img style={{
                                width: `${parseFloat(getImageSize(match.home_team)) + 2}rem`,
                                height: `${parseFloat(getImageSize(match.home_team)) + 2}rem`,
                                objectFit: 'contain', // Ensures the logo fits and doesn't overflow
                                position: 'absolute',
                                right: `${getImageSize(match.home_team)[0]}`,
                                left: `${getImageSize(match.home_team)[1]}`,
                                top: `${getImageSize(match.home_team)[2]}`,
                                bottom: `${getImageSize(match.home_team)[3]}`
                            }} src={getLogo(match.home_team)} alt={match.home_team} />
                        </div>
                        <div className="kickoff-time">
                            <span>{match.kickoff}</span>
                        </div>
                        <div style={{
                            width: '5rem',
                            height: '5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'black',
                            borderRadius: '100%',
                            position: 'relative',
                            overflow: 'hidden', // Ensure the image is cut off at the border
                            border: `3px solid var(--away-team-color)`, // Apply the border color dynamically
                            boxShadow: `0 0 10px 9px var(--away-team-darkened-color)`, // Apply the box shadow dynamically
                        }} className="away-team">
                            <img style={{
                                width: `${parseFloat(getImageSize(match.away_team)) + 2}rem`,
                                height: `${parseFloat(getImageSize(match.away_team)) + 2}rem`,
                                objectFit: 'contain', // Ensures the logo fits and doesn't overflow
                                position: 'absolute',
                                right: 'var(--away_image_pos_right)',
                                left: 'var(--away_image_pos_left)',
                                top: 'var(--away_image_pos_top)',
                                bottom: 'var(--away_image_pos_bottom)'
                            }} src={getLogo(match.away_team)} alt={match.away_team} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FixturesTable;