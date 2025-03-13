import { useState, useEffect } from 'react';
import Roosters from '../assets/roosters.webp';
import Raiders from '../assets/raiders-no-text.svg';
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

import NathanCleary from '../players/penrith-panthers/n.cleary.png'
import { AnimatePresence, motion } from 'framer-motion';

const leftDiv = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 1rem',
    height: '8rem',
    backgroundColor: '#000000',
    borderTopRightRadius: '10rem',
    borderBottomRightRadius: '10rem',
    width: '20rem'
    // No width change for logo and circle; keep them the same
};

function BottomNextGame({ bottomNextGameStatus, statsValue, bottomNextGameData, status }) {
    const [height, setHeight] = useState('0rem');
    const [bottomNextData, setBottomNextData] = useState({});
    const [bottomNextStatusValue, setBottomNextStatus] = useState(false);

    useEffect(() => {
        setBottomNextStatus(status);
    }, [status])

    // Function to get the image URL based on player name
    function getImageUrl(name, team) {
        // Construct the filename using first letter of first name and full last name
        const names = name.split(' ');
        const firstName = names[0];
        const lastName = names[1];
        const imageName = `${firstName[0].toLowerCase()}-${lastName.toLowerCase()}`;

        // Use relative path to access the image in the public folder
        return `/players/${team.toLowerCase().replace(/\s+/g, '-')}/${imageName}.png`;
    }

    useEffect(() => {
        if (bottomNextGameStatus === true && statsValue === false) {
            setHeight('9.5rem');
        } else if (bottomNextGameStatus === false && statsValue === true) {
            setHeight('5rem');
        } else if (bottomNextGameStatus === true && statsValue === true) {
            setHeight('14.5rem');
        } else if (bottomNextGameStatus === false && statsValue === false) {
            setHeight('0rem');
        }
    }, [bottomNextGameStatus, statsValue]);

    useEffect(() => {
        setBottomNextData(bottomNextGameData);
    }, [bottomNextGameData]);

    const getLogo = (teamName) => {
        switch (teamName) {
            case 'sydney-roosters': return Roosters;
            case 'melbourne-storm': return Storm;
            case 'canberra-raiders': return Raiders;
            case 'penrith-panthers': return Panthers;
            case 'manly-warringah-sea-eagles': return Manly;
            case 'gold-coast-titans': return Titans;
            case 'brisbane-broncos': return Broncos;
            case 'canterbury-bankstown-bulldogs': return Bulldogs;
            case 'cronulla-sharks': return Sharks;
            case 'dolphins': return Dolphins;
            case 'new-zealand-warriors': return Warriors;
            case 'newcastle-knights': return Knights;
            case 'north-queensland-cowboys': return Cowboys;
            case 'parramatta-eels': return Eels;
            case 'south-sydney-rabbitohs': return Rabbitohs;
            case 'st-george-illawarra-dragons': return Dragons;
            case 'wests-tigers': return Tigers;
            case 'wigan-warriors': return Wigan;
            case 'warrington-wolves': return Warrington;
            case 'australia-jillaroos': return AustraliaWomen;
            case 'england-lionesses': return EnglishWomen;
            default: return '';
        }
    };

    const getSize = (teamName) => {
        switch (teamName) {
            case 'sydney-roosters': return Roosters;
            case 'melbourne-storm': return Storm;
            case 'canberra-raiders': return Raiders;
            case 'penrith-panthers': return Panthers;
            case 'manly-warringah-sea-eagles': return Manly;
            case 'gold-coast-titans': return Titans;
            case 'brisbane-broncos': return Broncos;
            case 'canterbury-bankstown-bulldogs': return Bulldogs;
            case 'cronulla-sharks': return Sharks;
            case 'dolphins': return Dolphins;
            case 'new-zealand-warriors': return Warriors;
            case 'newcastle-knights': return Knights;
            case 'north-queensland-cowboys': return Cowboys;
            case 'parramatta-eels': return Eels;
            case 'south-sydney-rabbitohs': return Rabbitohs;
            case 'st-george-illawarra-dragons': return Dragons;
            case 'wests-tigers': return Tigers;
            case 'wigan-warriors': return Wigan;
            case 'warrington-wolves': return Warrington;
            case 'australia-jillaroos': return AustraliaWomen;
            case 'england-lionesses': return EnglishWomen;
            default: return '';
        }
    };

    const getAbbTeamName = (teamName) => {
        switch (teamName) {
            case 'sydney-roosters': return 'Roosters';
            case 'melbourne-storm': return 'Storm';
            case 'canberra-raiders': return 'Raiders';
            case 'penrith-panthers': return 'Panthers';
            case 'manly-warringah-sea-eagles': return 'Sea Eagles';
            case 'gold-coast-titans': return 'Titans';
            case 'brisbane-broncos': return 'Broncos';
            case 'canterbury-bankstown-bulldogs': return 'Bulldogs';
            case 'cronulla-sharks': return 'Sharks';
            case 'dolphins': return 'Dolphins';
            case 'new-zealand-warriors': return 'Warriors';
            case 'newcastle-knights': return 'Knights';
            case 'north-queensland-cowboys': return 'Cowboys';
            case 'parramatta-eels': return 'Eels';
            case 'south-sydney-rabbitohs': return 'Rabbitohs';
            case 'st-george-illawarra-dragons': return 'Dragons';
            case 'wests-tigers': return 'Tigers';
            case 'wigan-warriors': return 'Wigan Warriors';
            case 'warrington-wolves': return 'Warrington Wolves';
            case 'australia-jillaroos': return 'Jillaroos';
            case 'england-lionesses': return 'Lionesses';
            default: return '';
        }
    };

    const homeTeamName = bottomNextData.home_team ? bottomNextData.home_team.split('-')[1] : '';
    const awayTeamName = bottomNextData.away_team ? bottomNextData.away_team.split('-')[1] : '';

    const display = 'double-team'

    if (display === 'double-team') {
        return (
            <AnimatePresence>
                {bottomNextStatusValue && (
                    <motion.div style={{
                        backgroundColor: '#313131',
                        display: 'flex',
                        position: 'absolute',
                        height: '10rem',
                        borderTopRightRadius: '1rem',
                        bottom: height,
                        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.8)',
                        fontFamily: "Sour Gummy, sans-serif",
                        textTransform: 'uppercase',
                        gap: '2rem',
                        paddingRight: '2rem'
                    }}
                        initial={{ 'width': 0 }}
                        animate={bottomNextStatusValue ? { 'width': 'max-content' } : { 'width': 0 }}
                        transition={{ type: 'tween' }}
                        exit={{ width: 0, opacity: 0 }}>
                        <motion.div style={leftDiv}>
                            <div style={{
                                background: 'linear-gradient(-180deg, #4F4F4F, #383838)',
                                width: '11rem',
                                height: '6rem',
                                border: '4px solid rgba(255, 255, 255, 0.3)', // Lighter white with reduced opacity
                                borderRadius: '10rem',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center', // Center content vertically,
                            }}
                                className="circle"
                                initial={{ 'width': 0 }}
                                animate={{ 'width': '11rem' }}>
                                <motion.img
                                    style={{ height: '3rem', marginRight: '1rem' }}
                                    src={getLogo(bottomNextData.home_team)}
                                    alt=""
                                    initial={{ rotate: -90 }}
                                    animate={{ rotate: 0 }} />
                                <motion.img style={{ height: '3rem' }}
                                    src={getLogo(bottomNextData.away_team)}
                                    alt=""
                                    initial={{ rotate: 90 }}
                                    animate={{ rotate: 0 }} />
                            </div>
                        </motion.div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            color: 'white',
                            zIndex: 3,
                            height: '100%',
                            gap: '.25rem',
                            marginRight: '4rem',
                            paddingRight: '1rem'
                        }} className="info">
                            <p style={{ margin: '0' }}>NRL - {new Date().getFullYear()}</p>
                            <h1 style={{ margin: '0' }}>{getAbbTeamName(bottomNextData.home_team)} vs {getAbbTeamName(bottomNextData.away_team)}</h1>
                            <p style={{ margin: '0', color: '#fff', opacity: 0.4 }}>{bottomNextGameData.kickoff} - LIVE AND EXCLUSIVE ON LACHY LEAGUE</p>
                        </div>
                    </motion.div>
                )
                }
            </AnimatePresence >
        );
    } else if ('single-team') {
        return (
            <div style={{
                backgroundColor: '#313131',
                display: 'flex',
                position: 'absolute',
                height: '10rem',
                borderTopRightRadius: '1rem',
                bottom: height,
                boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.8)',
                fontFamily: "Sour Gummy, sans-serif",
                textTransform: 'uppercase',
                gap: '2rem'
            }}>
                <div style={leftDiv}>
                    <div style={{
                        background: 'linear-gradient(-180deg, #4F4F4F, #383838)',
                        width: '6rem',
                        height: '6rem',
                        border: '4px solid rgba(255, 255, 255, 0.3)', // Lighter white with reduced opacity
                        borderRadius: '10rem',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center', // Center content vertically,
                    }}
                        className="circle">
                        <img style={{ height: '3.5rem' }} src={getLogo(bottomNextData.home_team)} alt="" />
                    </div>
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    color: 'white',
                    zIndex: 3,
                    height: '100%',
                    gap: '.25rem',
                    marginRight: '5rem'
                }} className="info">
                    <p style={{ margin: '0' }}>{bottomNextData.subtitle} - {new Date().getFullYear()}</p>
                    <h1 style={{ margin: '0' }}>{getAbbTeamName(bottomNextData.home_team)} vs {getAbbTeamName(bottomNextData.away_team)}</h1>
                    <p style={{ margin: '0', color: '#fff', opacity: 0.4 }}>TODAY | 4pm</p>
                </div>
            </div>
        );
    }
}

export default BottomNextGame;