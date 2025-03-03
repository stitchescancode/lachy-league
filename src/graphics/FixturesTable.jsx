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
    ,
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

function FixturesTable() {
    return (
        <div style={{ backgroundColor: '#313131', fontFamily: "Sour Gummy, sans-serif", width: '30rem', color: 'white', borderRadius: '.5rem' }} className="container">
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: '1rem 1.5rem' }} className="title">
                <h1 style={{ margin: '.5rem 0', textTransform: 'uppercase' }}>Super Saturday</h1>
                <p style={{ margin: '0', textTransform: 'uppercase' }}>Fixtures</p>
            </div>

            <div className="fixtures-list">
                {teams.map((match, index) => (
                    <div key={index} className="fixture">
                        <div className="home-team">
                            <img src={getLogo(match.home_team)} alt={match.home_team} style={{ width: '50px', height: 'auto' }} />
                        </div>
                        <div className="kickoff-time">
                            <span>{match.kickoff}</span>
                        </div>
                        <div className="away-team">
                            <img src={getLogo(match.away_team)} alt={match.away_team} style={{ width: '50px', height: 'auto' }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FixturesTable;