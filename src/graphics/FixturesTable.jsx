import React, { useEffect, useState } from "react";
import Roosters from '../assets/roosters.webp';
import Raiders from '../assets/raiders.svg';
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
import Wigan from '../assets/wigan.webp';
import Warrington from '../assets/warrington-wolves.svg';
import AustraliaWomen from '../assets/australia-jillaroos.svg';
import EnglishWomen from '../assets/england-lionesses.png';

import { motion, AnimatePresence } from "framer-motion";

const teams = [
    {
        'home_team': 'Sydney Roosters',
        'away_team': 'Brisbane Broncos',
        'status_of_game': 4,
        'kickoff': '8pm',
        'stadium': 'Allianz Stadium',
        'subtitle': 'fulltime',
        'home_score': 14,
        'away_score': 50
    }
];

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
        case 'Sydney Roosters': return ['0rem', '-.6rem', '-1.4rem', '0rem', '7rem'];
        case 'Melbourne Storm': return ['0rem', '-1.9rem', '-1.5rem', '0rem', '6rem'];
        case 'Canberra Raiders': return ['0rem', '-1.975rem', '-2.9rem', '0rem', '8rem'];
        case 'Penrith Panthers': return ['0rem', '-4.2rem', '-2.7rem', '0rem', '10rem']; // Right, left, top, bottom
        case 'Manly Warringah Sea Eagles': return ['0rem', '0rem', '0rem', '0rem', '4rem'];
        case 'Gold Coast Titans': return ['0rem', '-0.5rem', '0rem', '0rem', '5rem'];
        case 'Brisbane Broncos': return ['0rem', '-1.7rem', '-0.6rem', '0rem', '6rem'];
        case 'Canterbury-Bankstown Bulldogs': return ['0rem', '-1.2rem', '0rem', '0rem', '7rem'];
        case 'Cronulla Sharks': return ['0rem', '-1.7rem', '-1.2rem', '0rem', '6rem'];
        case 'Dolphins': return ['0rem', '0rem', '-1.5rem', '0rem', '11rem']; // Right, left, top, bottom
        case 'New Zealand Warriors': return ['0rem', '-1.05rem', '-1rem', '0rem', '6rem'];
        case 'Newcastle Knights': return ['0rem', '-1.4rem', '-1.2rem', '0rem', '6rem'];
        case 'North Queensland Cowboys': ['0rem', '0rem', '0rem', '0rem', '4rem'];
        case 'Parramatta Eels': return ['0rem', '0.4rem', '-1.4rem', '0rem', '7rem'];
        case 'South Sydney Rabbitohs': return ['0rem', '.5rem', '-1.7rem', '0rem', '7rem']
        case 'St George Illawarra Dragons': return ['0rem', '0rem', '-.6rem', '0rem', '6rem'];
        case 'Wests Tigers': return ['0rem', '-1.7rem', '-1.4rem', '0rem', '7.5rem'];
        case 'Wigan Warriors': return ['0rem', '-2rem', '-2.2rem', '0rem', '8rem'];
        case 'Warrington Wolves': return ['0rem', '-1.5rem', '-2.2rem', '0rem', '7rem'];
        case 'Australia Jillaroos': return ['0rem', '-3.1rem', '-2.5rem', '0rem', '9.5rem']; // Right, left, top, bottom
        case 'England Lionesses': return ['0rem', '-1.8rem', '-.4rem', '0rem', '8rem']; // Right, left, top, bottom
        default: return '';
    }
};

function FixturesTable({ fixturesTable, status }) {
    const [fixturesTableData, setFixturesTable] = useState([])
    const [statusValue, setStatus] = useState(false)

    useEffect(() => {
        if (fixturesTable.length > 0) {
            setFixturesTable(fixturesTable);
        }
    }, [fixturesTable]); // Depend on fixturesTable

    useEffect(() => {
        setStatus(status);
    }, [status]); // Depend on fixturesTable

    if (fixturesTableData.length === 0) {
        return null;
    }

    return (
        <AnimatePresence>
            {statusValue && (
                <motion.div
                    style={{
                        backgroundColor: '#313131',
                        fontFamily: "Poppins, sans-serif",
                        width: '21rem',
                        color: 'white',
                        padding: '0.75rem 1rem',
                        fontSize: '.85rem',
                        position: 'absolute',
                        bottom: '2rem',
                        left: '4.4rem',
                        width: 'max-content'
                    }}
                    className="container"
                    initial={{ transform: 'scaleX(0)', transformOrigin: 'left' }}
                    animate={statusValue ? { transform: 'scaleX(1)' } : { transform: 'scaleX(0)', transformOrigin: 'right' }}
                    transition={statusValue ? { type: 'spring' } : { type: 'tween' }}
                    exit={{ transform: 'scaleX(0)', transformOrigin: 'right', transition: { type: 'tween' } }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        padding: '.5rem'
                    }} className="title">
                        <h1 style={{
                            margin: '0',
                            textTransform: 'uppercase',
                        }}>Upcoming Fixtures</h1>
                        <p style={{
                            margin: '0',
                            textTransform: 'uppercase',
                        }}>Lachy League</p>
                    </div>

                    <div className="fixtures-list">
                        {fixturesTableData.map((match, index) => (
                            <>
                                <hr style={{ opacity: 0.1 }} />
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} key={index} >
                                    <motion.div
                                        className="home-logo-wrapper"
                                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '4rem', height: '4rem', borderRadius: '100%', marginRight: '0', overflow: 'hidden', border: `3px solid ${getColor(match.home_team)}`, boxShadow: `0 0 10px 9px ${darkenColor(getColor(match.home_team))}`, position: 'relative' }}
                                        initial={{ rotate: -90 }}
                                        animate={{ rotate: 0 }}
                                        transition={{ type: 'spring', delay: 0.25 }}
                                        exit={{ display: 'none', opacity: 0 }}>
                                        <motion.div className="logo">
                                            <img style={{
                                                width: `${getImageSize(match.home_team)[4]}`,
                                                height: `${getImageSize(match.home_team)[4]}`,
                                                right: `${getImageSize(match.home_team)[0]}`,
                                                bottom: `${getImageSize(match.home_team)[3]}`,
                                                top: `${getImageSize(match.home_team)[2]}`,
                                                left: `${getImageSize(match.home_team)[1]}`,
                                                objectFit: 'contain',
                                                position: 'absolute',
                                            }} className="img home_team_img" src={getLogo(match.home_team)} alt={match.home_team} />
                                        </motion.div>
                                    </motion.div>
                                    <div className="center">
                                        {match.status_of_game != 0 ? (
                                            <>
                                                <h2 style={{ margin: 0, textAlign: 'center' }}>{match.home_team_score} - {match.away_team_score}</h2>
                                                <p style={{ margin: 0, textAlign: 'center' }}>{match.stadium}</p>
                                            </>
                                        ) : match.status_of_game === 0 ? ( // Fixed the parenthesis here
                                            <>
                                                <h2 style={{ margin: 0, textAlign: 'center' }}>v</h2>
                                                <p style={{ margin: 0, textAlign: 'center' }}>{match.stadium}</p>
                                            </>
                                        ) : null}
                                    </div>
                                    <motion.div
                                        className="away-logo-wrapper"
                                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '4rem', height: '4rem', borderRadius: '100%', marginRight: '0', overflow: 'hidden', border: `3px solid ${getColor(match.away_team)}`, boxShadow: `0 0 10px 9px ${darkenColor(getColor(match.away_team))}`, position: 'relative' }}
                                        initial={{ rotate: 90 }}
                                        animate={{ rotate: 0 }}
                                        transition={{ type: 'spring', delay: 0.25 }}>
                                        <motion.div className="logo">
                                            <img style={{
                                                width: `${getImageSize(match.away_team)[4]}`,
                                                height: `${getImageSize(match.away_team)[4]}`,
                                                right: `${getImageSize(match.away_team)[0]}`,
                                                bottom: `${getImageSize(match.away_team)[3]}`,
                                                top: `${getImageSize(match.away_team)[2]}`,
                                                left: `${getImageSize(match.away_team)[1]}`,
                                                objectFit: 'contain',
                                                position: 'absolute'
                                            }} className="img home_team_img" src={getLogo(match.away_team)} alt={match.away_team} />
                                        </motion.div>
                                    </motion.div>
                                </div >
                                <p style={{ margin: '.5rem 0', textAlign: 'center', opacity: 0.5, textTransform: 'uppercase', fontSize: '.8rem' }}>
                                    {match.status}
                                </p>

                            </>
                        ))}
                    </div>
                </motion.div >
            )
            }
        </AnimatePresence >
    );
}

export default FixturesTable;