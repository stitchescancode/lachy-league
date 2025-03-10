import { useEffect, useState } from 'react';
import Logo2 from '../../logos/lachy-sports.png';
import Logo from '../../logos/positive-variant/lachy-league.png';

const logoStyle = (reverseAnimation) => ({
    position: 'absolute',
    height: '8rem',
    right: '1.7rem',
    top: '1.3rem',
    opacity: 0, // Start as invisible
    animation: reverseAnimation ? 'reverseSwirlReveal 1s forwards' : 'swirlReveal 1s forwards', // Animation to reveal or reverse
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
    fontWeight: 'bold',
    opacity: 0, // Start as invisible
    animation: reverseAnimation ? 'reverseRevealLive 1s forwards 1s' : 'revealLive 1s forwards 1s', // Animation to reveal or reverse
});

function LogoFunction({ updateLiveStatus, logoGraphicStatus, ultrahd }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [reverseAnimation, setReverseAnimation] = useState(false);
    const [lastCheck, setLastCheck] = useState(false); // Track the previous status
    const [ultraHd, setUltraHd] = useState(false); // Track the previous status

    useEffect(() => {
        setUltraHd(ultrahd);
        console.log(`Variable ${ultraHd}, Value ${ultrahd}`)
    }, [ultrahd])

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
            <div style={logoStyle(reverseAnimation)}>
                <img style={imgStyle} src={Logo} alt={`Lachy League on channel ${import.meta.env.VITE_CHANNEL_NUMBER || 'Unknown'}`} />
                <div style={channelDiv(reverseAnimation)}>
                    <p>{import.meta.env.VITE_CHANNEL_NUMBER}</p>
                    <div style={HDDiv(reverseAnimation)}>HD</div>
                </div>
                {updateLiveStatus && <div style={LiveDiv(reverseAnimation)}>LIVE</div>}
            </div>
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