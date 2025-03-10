import { useEffect, useState, useRef } from "react"
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
import Wigan from '../assets/wigan-warriors.webp';
import Warrington from '../assets/warrington-wolves.svg';
import AustraliaWomen from '../assets/australia-jillaroos.svg';
import EnglishWomen from '../assets/england-lionesses.png';

import { calculateWinVis, calculatePossessionRates } from '../../options'

import { motion, AnimatePresence } from "framer-motion";

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


const getImageSize = (teamName) => {
    switch (teamName) {
        case 'Sydney Roosters': return ['0rem', '-.6rem', '-1.4rem', '0rem', '7rem'];
        case 'Melbourne Storm': return ['0rem', '-1.9rem', '-1.5rem', '0rem', '6rem'];
        case 'Canberra Raiders': return ['0rem', '-1.975rem', '-2.9rem', '0rem', '8rem'];
        case 'Penrith Panthers': return ['0rem', '-8.2rem', '-1.4rem', '0rem', '8rem']; // Right, left, top, bottom
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

function MatchStats({ initialMatchData, status, stats, statusOfElement }) {
    const [data, setData] = useState({})
    const [statusOfGame, setStatusOfGame] = useState(0)
    const [statsData, setStats] = useState({})
    const [statsTableStatus, setStatsTableStatus] = useState(false);

    useEffect(() => {
        setData(initialMatchData)
    }, [initialMatchData])

    useEffect(() => {
        setStatsTableStatus(statusOfElement)
    }, [statusOfElement])

    useEffect(() => {
        setStatusOfGame(status)
    }, [status])

    useEffect(() => {
        setStats(stats);
        console.log(stats)
    }, [stats])

    return (
        <AnimatePresence>
            {statsTableStatus && (
                <motion.div
                    style={{ backgroundColor: '#313131', fontFamily: 'Sour Gummy, sans-serif', width: '25rem', padding: '1rem', position: 'absolute', left: '2rem', bottom: '2rem', filter: 'scale(0.6)', overflow: 'hidden' }}
                    className="match-stats"
                    initial={{ width: '0' }}
                    animate={statsTableStatus ? { width: '25rem' } : { width: '0' }}
                    transition={{ width: statsTableStatus ? { type: 'spring' } : { type: 'tween' } }}
                    exit={{ width: '0', display: 'none', overflow: 'hidden' }}>
                    <motion.div style={{ display: 'flex', alignItems: 'center', width: '25rem', color: '#fff', textTransform: 'uppercase', justifyContent: 'space-between' }} className="title">
                        <motion.div className="home-logo-wrapper"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '4rem',
                                height: '4rem',
                                borderRadius: '100%',
                                marginRight: '0',
                                overflow: 'hidden',
                                border: `3px solid ${getColor(data.home_team)}`,
                                boxShadow: `0 0 10px 9px ${darkenColor(getColor(data.home_team))}`,
                                position: 'relative'
                            }}
                            initial={{ rotate: -90 }}
                            animate={{ rotate: 0 }}
                            transition={{ type: 'spring' }}
                            exit={{ width: 0 }}>
                            <motion.div className="logo">
                                <img style={{
                                    height: `${getImageSize(data.home_team)[4]}`,
                                    right: `${getImageSize(data.home_team)[0]}`,
                                    bottom: `${getImageSize(data.home_team)[3]}`,
                                    top: `${getImageSize(data.home_team)[2]}`,
                                    left: `${getImageSize(data.home_team)[1]}`,
                                    objectFit: 'contain',
                                    position: 'absolute'
                                }} className="img home_team_img" src={getLogo(data.home_team)} alt={data.home_team} />
                            </motion.div>
                        </motion.div>
                        <motion.div>
                            <h1>Match Stats</h1>
                        </motion.div>
                        <motion.div
                            className="away-logo-wrapper"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '4rem',
                                height: '4rem',
                                borderRadius: '100%',
                                overflow: 'hidden',
                                marginRight: 0,
                                border: `3px solid ${getColor(data.away_team)}`,
                                boxShadow: `0 0 10px 9px ${darkenColor(getColor(data.away_team))}`,
                                position: 'relative',
                            }}
                            initial={{ rotate: 90 }}
                            animate={{ rotate: 0 }}
                            transition={{ type: 'spring' }}
                        >
                            <div className="logo">
                                <img
                                    className="img away_team_img"
                                    src={getLogo(data.away_team)}
                                    alt={data.away_team}
                                    style={{
                                        width: `${getImageSize(data.away_team)[4]}`,
                                        height: `${getImageSize(data.away_team)[4]}`,
                                        right: `${getImageSize(data.away_team)[0]}`,
                                        bottom: `${getImageSize(data.away_team)[3]}`,
                                        top: `${getImageSize(data.away_team)[2]}`,
                                        left: `${getImageSize(data.away_team)[1]}`,
                                        objectFit: 'contain',
                                        position: 'absolute'
                                    }}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                    <hr />
                    <motion.div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'white' }} className="possession">
                        <h2 style={{ color: 'white', opacity: '0.8' }}>{calculatePossessionRates(stats.team_a_total_sets, stats.team_b_total_sets, (stats.team_a_total_sets + stats.team_b_total_sets)).teamA}%</h2>
                        <h2>POSSESSION</h2>
                        <h2 style={{ color: 'white', opacity: '0.8' }}>{calculatePossessionRates(stats.team_a_total_sets, stats.team_b_total_sets, (stats.team_a_total_sets + stats.team_b_total_sets)).teamB}%</h2>
                    </motion.div>
                    <hr />
                    <motion.div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'white' }} className="penalties">
                        <h2 style={{ color: 'white', opacity: '0.8' }}>{stats.team_b_penalties}</h2>
                        <h2>PENALTIES CONCEDED</h2>
                        <h2 style={{ color: 'white', opacity: '0.8' }}>{stats.team_a_penalties}</h2>
                    </motion.div>
                    <hr />
                    <motion.div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'white' }} className="errors">
                        <h2 style={{ color: 'white', opacity: '0.8' }}>{stats.team_a_errors}</h2>
                        <h2>ERRORS</h2>
                        <h2 style={{ color: 'white', opacity: '0.8' }}>{stats.team_b_errors}</h2>
                    </motion.div>
                    <hr />
                    <motion.div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'white' }} className="completed-sets">
                        <h2 style={{ color: 'white', opacity: '0.8' }}>{stats.team_a_completions}/{stats.team_a_total_sets}</h2>
                        <h2>COMPLETED SETS</h2>
                        <h2 style={{ color: 'white', opacity: '0.8' }}>{stats.team_b_completions}/{stats.team_b_total_sets}</h2>
                    </motion.div>
                    {/* {statusOfGame !== 0 && statusOfGame !== 4 && (
                            <>
                                <hr />
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'white' }} className="winvis">
                                    <h2 style={{ color: 'white', opacity: '0.8' }}>{calculateWinVis((stats.team_a_total_sets + stats.team_b_total_sets), stats.team_a_total_sets, stats.team_b_total_sets, initialMatchData.home_team_score, initialMatchData.away_team_score, stats.team_a_completions, stats.team_b_completions)?.teamA}%</h2>
                                    <h2>WINVIS</h2>
                                    <h2 style={{ color: 'white', opacity: '0.8' }}>{calculateWinVis((stats.team_a_total_sets + stats.team_b_total_sets), stats.team_a_total_sets, stats.team_b_total_sets, initialMatchData.home_team_score, initialMatchData.away_team_score, stats.team_a_completions, stats.team_b_completions)?.teamB}%</h2>
                                </div>
                            </>
                        )} */}
                </motion.div>
            )
            }
        </AnimatePresence >
    )
}

export default MatchStats