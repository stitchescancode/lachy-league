import { useEffect, useState } from 'react';
import Logo2 from '../../logos/lachy-sports.png';
import Logo from '../../logos/positive-variant/lachy-league.png';
import Logo3 from '../../logos/fox-league.svg';
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

import { AnimatePresence, motion } from 'framer-motion'

const logoStyle = (reverseAnimation) => ({
    position: 'absolute',
    height: '8rem',
    right: '1.7rem',
    top: '1.3rem',
    opacity: 0, // Start as invisible
    animation: reverseAnimation ? 'reverseSwirlReveal 1s forwards' : 'swirlReveal 1s forwards', // Animation to reveal or reverse,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
});

const imgStyle = {
    height: '8rem',
    right: '1.7rem',
    top: '1.3rem',
};

const channelDiv = (reverseAnimation) => ({
    display: 'flex',
    position: "relative",
    bottom: '1rem',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem',
    gap: '.5rem',
    fontFamily: "Barlow Condensed, sans-serif",
    fontWeight: 'bold',
    color: '#fff',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
    height: '2rem',
    opacity: 0, // Start as invisible
    animation: reverseAnimation ? 'reverseRevealChannel 1s forwards 0.5s' : 'revealChannel 1s forwards 0.5s', // Animation to reveal or reverse
});

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

const HDDiv = (reverseAnimation) => ({
    display: 'flex',
    alignItems: 'center',
    backgroundColor: `${import.meta.env.VITE_COLOR}`,
    height: '2rem',
    width: 'max-content',
    fontSize: '1.4rem',
    padding: '0 1rem',
    opacity: 0, // Start as invisible
    animation: reverseAnimation ? 'reverseRevealChannel 1s forwards 0.5s' : 'revealChannel 1s forwards 0.5s', // Animation to reveal or reverse
});

const LiveDiv = (reverseAnimation) => ({
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
    fontWeight: 800,
    opacity: 0, // Start as invisible
    animation: reverseAnimation ? 'reverseRevealLive 1s forwards 1s' : 'revealLive 1s forwards 1s', // Animation to reveal or reverse
});

function LogoFunction({ updateLiveStatus, logoGraphicStatus, ultrahd, initialMatchData, upcomingData, upcomingDataStatus }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [reverseAnimation, setReverseAnimation] = useState(false);
    const [lastCheck, setLastCheck] = useState(false); // Track the previous status
    const [ultraHd, setUltraHd] = useState(false); // Track the previous status
    const [matchData, setMatchData] = useState({});
    const [upcomingGame, setUpcomingGame] = useState({})
    const [LogoUpcomingStatus, SetLogoUpcomingStatus] = useState(false)

    useEffect(() => {
        setUltraHd(ultrahd);
        console.log(`Variable ${ultraHd}, Value ${ultrahd}`)
    }, [ultrahd])

    useEffect(() => {
        SetLogoUpcomingStatus(upcomingDataStatus)
    }, [upcomingDataStatus])

    useEffect(() => {
        setMatchData(initialMatchData)
    }, [initialMatchData])

    useEffect(() => {
        setUpcomingGame(upcomingData)
    }, [upcomingData])

    useEffect(() => {
        // Trigger when the component loads
        setIsLoaded(true);

        // Dynamically inject the CSS rules on component mount
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes swirlReveal {
                0% {
                    transform: rotate(0deg) scale(0);
                    opacity: 0;
                }
                100% {
                    transform: rotate(720deg) scale(1);
                    opacity: 1;
                }
            }

            @keyframes reverseSwirlReveal {
                0% {
                    transform: rotate(720deg) scale(1);
                    opacity: 1;
                }
                100% {
                    transform: rotate(0deg) scale(0);
                    opacity: 0;
                }
            }

            @keyframes revealChannel {
                0% {
                    opacity: 0;
                    transform: translateY(20px);
                }
                100% {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            @keyframes reverseRevealChannel {
                0% {
                    opacity: 1;
                    transform: translateY(0);
                }
                100% {
                    opacity: 0;
                    transform: translateY(20px);
                }
            }

            @keyframes revealLive {
                0% {
                    opacity: 0;
                    transform: translateY(20px);
                }
                100% {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            @keyframes reverseRevealLive {
                0% {
                    opacity: 1;
                    transform: translateY(0);
                }
                100% {
                    opacity: 0;
                    transform: translateY(20px);
                }
            }
        `;
        document.head.appendChild(style); // Append the <style> element to the head

        // Cleanup function to trigger reverse animation on dismount
        return () => {
            setReverseAnimation(true);
            document.head.removeChild(style); // Cleanup the dynamically injected style
        };
    }, []);

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

    const getAbbreviation = (teamName) => {
        switch (teamName) {
            case 'Sydney Roosters': return 'SYD';
            case 'Melbourne Storm': return 'MEL';
            case 'Canberra Raiders': return 'CAN';
            case 'Penrith Panthers': return 'PEN';
            case 'Manly Warringah Sea Eagles': return 'MAN';
            case 'Gold Coast Titans': return 'GLD';
            case 'Brisbane Broncos': return 'BRI';
            case 'Canterbury-Bankstown Bulldogs': return 'CAN';
            case 'Cronulla Sharks': return 'CRO';
            case 'Dolphins': return 'DOL';
            case 'New Zealand Warriors': return 'WAR';
            case 'Newcastle Knights': return 'NEW';
            case 'North Queensland Cowboys': return 'NQL';
            case 'Parramatta Eels': return 'PAR';
            case 'South Sydney Rabbitohs': return 'SOU';
            case 'St George Illawarra Dragons': return 'STG';
            case 'Wests Tigers': return 'TIG';
            case 'Wigan Warriors': return 'WIG';
            case 'Warrington Wolves': return 'WAR';
            case 'Australia Jillaroos': return 'AUS';
            case 'England Lionesses': return 'ENG';
            default: return '';
        }
    };

    const logoStyle2 = (reverseAnimation) => ({
        position: 'absolute',
        height: '8rem',
        right: '1.7rem',
        top: '1.3rem',
        opacity: 0, // Start as invisible
        animation: reverseAnimation ? 'reverseSwirlReveal 1s forwards' : 'swirlReveal 1s forwards', // Animation to reveal or reverse
    });

    const imgStyle2 = {
        height: '8rem',
        right: '1.7rem',
        top: '1.3rem',
        marginBottom: '2rem'
    };

    const channelDiv2 = (reverseAnimation) => ({
        display: 'flex',
        position: "relative",
        bottom: '1rem',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2rem',
        gap: '.5rem',
        fontFamily: "Barlow Condensed, sans-serif",
        fontWeight: 'bold',
        color: '#fff',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
        height: '2rem',
        opacity: 0, // Start as invisible
        animation: reverseAnimation ? 'reverseRevealChannel 1s forwards 0.5s' : 'revealChannel 1s forwards 0.5s', // Animation to reveal or reverse,
        flexDirection: 'column'
    });

    const HDDiv2 = (reverseAnimation) => ({
        display: 'flex',
        alignItems: 'center',
        backgroundColor: `${import.meta.env.VITE_COLOR}`,
        height: '2rem',
        width: 'max-content',
        fontSize: '1.4rem',
        padding: '0 1rem',
        opacity: 0, // Start as invisible
        animation: reverseAnimation ? 'reverseRevealChannel 1s forwards 0.5s' : 'revealChannel 1s forwards 0.5s', // Animation to reveal or reverse,
        margin: 0
    });

    const LiveDiv2 = (reverseAnimation) => ({
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
        fontWeight: 'bold',
        opacity: 0, // Start as invisible
        animation: reverseAnimation ? 'reverseRevealLive 1s forwards 1s' : 'revealLive 1s forwards 1s',
        marginTop: '2rem'
    });


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
            case 'Melbourne Storm': return ['0rem', '-1.9rem', '-1.5rem', '0rem', '5.5rem'];
            case 'Canberra Raiders': return ['0rem', '-1.775rem', '-2.9rem', '0rem', '7rem'];
            case 'Penrith Panthers': return ['0rem', '-4.2rem', '-2.7rem', '0rem', '9.5rem']; // Right, left, top, bottom
            case 'Manly Warringah Sea Eagles': return ['0rem', '0rem', '0rem', '0rem', '3.5rem'];
            case 'Gold Coast Titans': return ['0rem', '-0.5rem', '0rem', '0rem', '4.5rem'];
            case 'Brisbane Broncos': return ['0rem', '-1.7rem', '-0.6rem', '0rem', '5rem'];
            case 'Canterbury-Bankstown Bulldogs': return ['0rem', '-1.2rem', '0rem', '0rem', '6rem'];
            case 'Cronulla Sharks': return ['0rem', '-1.7rem', '-1.2rem', '0rem', '5rem'];
            case 'Dolphins': return ['0rem', '0rem', '-1.5rem', '0rem', '10rem']; // Right, left, top, bottom
            case 'New Zealand Warriors': return ['0rem', '-1.05rem', '-1rem', '0rem', '5.5rem'];
            case 'Newcastle Knights': return ['0rem', '-1.4rem', '-1.2rem', '0rem', '5rem'];
            case 'North Queensland Cowboys': ['0rem', '0rem', '0rem', '0rem', '3rem'];
            case 'Parramatta Eels': return ['0rem', '0.4rem', '-1.4rem', '0rem', '6rem'];
            case 'South Sydney Rabbitohs': return ['0rem', '.5rem', '-1.7rem', '0rem', '6rem']
            case 'St George Illawarra Dragons': return ['0rem', '0rem', '-.6rem', '0rem', '5rem'];
            case 'Wests Tigers': return ['0rem', '-1.4rem', '-1.4rem', '0rem', '6.5rem'];
            case 'Wigan Warriors': return ['0rem', '-1.75rem', '-2.2rem', '0rem', '7rem'];
            case 'Warrington Wolves': return ['0rem', '-1.5rem', '-2.2rem', '0rem', '6.5rem'];
            case 'Australia Jillaroos': return ['0rem', '-3.1rem', '-2.5rem', '0rem', '8.5rem']; // Right, left, top, bottom
            case 'England Lionesses': return ['0rem', '-1.8rem', '-.4rem', '0rem', '7rem']; // Right, left, top, bottom
            default: return '';
        }
    };

    useEffect(() => {
        if (logoGraphicStatus !== lastCheck) {
            if (logoGraphicStatus) {
                setReverseAnimation(false); // Show the logo with animation
            } else {
                setReverseAnimation(true); // Hide the logo with reverse animation
                setTimeout(() => {
                    return null;
                }, 500);
            }
            setLastCheck(logoGraphicStatus); // Update lastCheck to the new status
        }
    }, [logoGraphicStatus, lastCheck]);

    return (
        ultraHd === false && (
            <>
                <div style={logoStyle(reverseAnimation)}>
                    <img style={imgStyle} src={Logo} alt={`Lachy League on channel ${import.meta.env.VITE_CHANNEL_NUMBER || 'Unknown'}`} />
                    <div style={channelDiv(reverseAnimation)}>
                        <p>{import.meta.env.VITE_CHANNEL_NUMBER}</p>
                        <div style={HDDiv(reverseAnimation)}>HD</div>
                    </div>
                    {updateLiveStatus && <div style={LiveDiv(reverseAnimation)}>LIVE</div>}
                    <AnimatePresence>
                        {!updateLiveStatus && LogoUpcomingStatus && (
                            <motion.div
                                style={{
                                    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '8.5rem', background: 'linear-gradient(145deg, #1d1d1d, #313131)', padding: '.5rem', gap: '.4rem', fontFamily: 'Sour Gummy, sans-serif', color: 'white', boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.5)', borderRadius: '.25rem', boxShadow: 'inset 0 0 10px #313131', position: 'relative', overflow: 'hidden', height: '10rem', flexShrink: 0
                                }}
                                transition={updateLiveStatus ? { delay: 3, duration: .6, type: 'spring', damping: 10, transformOrigin: 'left' } : { delay: 0, duration: 0.6, type: 'spring' }}
                                initial={{ transform: 'scaleX(0)' }}
                                animate={{ transform: 'scaleX(1)' }}
                                exit={{ transform: 'scaleX(0)' }}>
                                <p style={{
                                    margin: 0,
                                    textTransform: 'uppercase',
                                    fontSize: '1.3rem',
                                    opacity: 0.5,
                                    background: 'linear-gradient(145deg,rgb(218, 218, 218),rgb(207, 207, 207))', // Gradient for text
                                    backgroundClip: 'text', // Clip the background to the text itself
                                    color: 'transparent', // Make the text itself transparent to show the gradient
                                    WebkitBackgroundClip: 'text', // For Safari compatibility
                                }}>
                                    Round 3
                                </p>
                                <p style={{ margin: 0, overflow: 'hidden', position: 'relative' }}>
                                    <AnimatePresence>
                                        <motion.span
                                            style={{
                                                marginRight: '.9rem',
                                                // background: `linear-gradient(180deg,${getColor(matchData.home_team)},rgb(255, 255, 255))`, // Gradient for text
                                                backgroundClip: 'text',
                                                // color: 'white',
                                                WebkitBackgroundClip: 'text',
                                            }}
                                            key={upcomingGame.home_team}> {getAbbreviation(upcomingGame.home_team)}</motion.span>
                                    </AnimatePresence>  v  <AnimatePresence>
                                        <motion.span style={{
                                            marginLeft: '.7rem',
                                            // background: `linear-gradient(180deg,${getColor('Penrith Panthers')},rgb(255, 255, 255))`, // Gradient for text
                                            backgroundClip: 'text',
                                            color: 'white',
                                            WebkitBackgroundClip: 'text'
                                        }}
                                            key={upcomingGame.away_team}>{getAbbreviation(upcomingGame.away_team)}</motion.span>
                                    </AnimatePresence></p>
                                <div style={{ display: 'flex' }} className="logos">
                                    <AnimatePresence>
                                        <motion.div className="home-logo-wrapper"
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: '3.5rem',
                                                height: '3.5rem',
                                                borderRadius: '100%',
                                                marginRight: '.25rem',
                                                overflow: 'hidden',
                                                boxShadow: `inset 0 0 20px #000000, inset 0 0 30px ${getColor(upcomingGame.home_team)}`, // Inner glow
                                            }}
                                            key={upcomingGame.home_team}
                                            initial={{ position: 'absolute', left: '-15rem' }}
                                            animate={{ position: 'relative', left: 0 }}
                                            exit={{ position: 'absolute', left: '-15rem' }}>
                                            <img style={{
                                                width: `${getImageSize(upcomingGame.home_team)[4]}`,
                                                height: `${getImageSize(upcomingGame.home_team)[4]}`,
                                                right: `${getImageSize(upcomingGame.home_team)[0]}`,
                                                bottom: `${getImageSize(upcomingGame.home_team)[3]}`,
                                                top: `${getImageSize(upcomingGame.home_team)[2]}`,
                                                left: `${getImageSize(upcomingGame.home_team)[1]}`,
                                                objectFit: 'contain',
                                                position: 'absolute',
                                            }} className="img home_team_img" src={getLogo(upcomingGame.home_team)} alt={upcomingGame.home_team} />
                                        </motion.div>
                                    </AnimatePresence>
                                    <AnimatePresence>
                                        <motion.div className="away-logo-wrapper"
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: '3.5rem',
                                                height: '3.5rem',
                                                borderRadius: '100%',
                                                marginRight: '.25rem',
                                                overflow: 'hidden',
                                                marginLeft: '.5rem',
                                                boxShadow: `inset 0 0 20px #000000, inset 0 0 30px ${getColor(upcomingGame.away_team)}`, // Inner glow
                                            }}
                                            key={upcomingGame.away_team}
                                            initial={{ position: 'absolute', right: '-15rem' }}
                                            animate={{ position: 'relative', right: 0 }}
                                            exit={{ position: 'absolute', right: '-15rem' }}>
                                            <img style={{
                                                width: `${getImageSize(upcomingGame.away_team)[4]}`,
                                                height: `${getImageSize(upcomingGame.away_team)[4]}`,
                                                right: `${getImageSize(upcomingGame.away_team)[0]}`,
                                                bottom: `${getImageSize(upcomingGame.away_team)[3]}`,
                                                top: `${getImageSize(upcomingGame.away_team)[2]}`,
                                                left: `${getImageSize(upcomingGame.away_team)[1]}`,
                                                objectFit: 'contain',
                                                position: 'absolute',
                                            }} className="img away_team_img" src={getLogo(upcomingGame.away_team)} alt={upcomingGame.away_team} />
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', position: 'relative', overflow: 'hidden', height: '1.2rem', textTransform: 'uppercase' }}>
                                    <AnimatePresence>
                                        <motion.p style={{ textAlign: 'center', margin: 0, opacity: 0.7, position: 'absolute' }}
                                            key={upcomingGame.day + upcomingGame.time}
                                            initial={{ bottom: '5rem' }}
                                            animate={{ top: 0 }}
                                            exit={{ top: '5rem' }}>{upcomingData.day} {upcomingGame.time}</motion.p>
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div >
            </>
        )
    ) || (
            <div style={logoStyle2(reverseAnimation)}>
                <img style={imgStyle2} src={Logo} alt={`Lachy League on channel ${import.meta.env.VITE_CHANNEL_NUMBER || 'Unknown'}`} />
                <div style={channelDiv2(reverseAnimation)}>
                    <h1 style={{ fontSize: '3rem', color: 'white', margin: 0 }}>4K</h1>
                    <div style={HDDiv2(reverseAnimation)}>ULTRA HD</div>
                </div>
                {updateLiveStatus && <div style={LiveDiv2(reverseAnimation)}>LIVE</div>}
            </div>
        );
}

export default LogoFunction;