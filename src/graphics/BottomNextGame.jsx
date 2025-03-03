import { useState, useEffect } from 'react';

import Will from '../players/cronulla-sharks/w.kennedy.png';
import Dyl from '../players/penrith-panthers/d.edwards.png';

function BottomNextGame({ statsValue, updateStatus }) {
    const [height, setHeight] = useState('0rem');  // Default height set to '0rem'

    useEffect(() => {
        if (statsValue === true) {
            setHeight('5rem');
        } else {
            setHeight('0rem');
        }
    }, [statsValue]);  // Runs when statsValue changes
    return (
        <div style={{
            backgroundColor: '#313131',
            display: 'flex',
            position: 'absolute',
            height: '10rem',
            alignItems: 'flex-end', // Use flex-end to align at the bottom of the container
            borderTopRightRadius: '1rem',
            bottom: height,
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.6)', // Added drop shadow to the container
            width: '45rem',
            fontFamily: "Sour Gummy, sans-serif",
            textTransform: 'uppercase',
        }}>
            <div className="players" style={{ display: 'flex', position: 'relative' }}>
                <img
                    style={{
                        height: '13rem',
                    }}
                    src={Dyl}
                    alt="Dyl Edwards"
                />
                <img
                    style={{
                        height: '13rem',
                        position: 'absolute',
                        left: '7rem', // Adjust this to control how much overlap there is
                    }}
                    src={Will}
                    alt="Will Kennedy"
                />
            </div>
            <div style={{
                position: 'relative',
                left: '9rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                color: 'white',
                zIndex: 3,
                height: '100%',
                gap: '.25rem'
            }} className="info">
                <p style={{ margin: '0' }}>NRL Las Vegas - 2025</p>
                <h1 style={{ margin: '0' }}>Panthers vs Sharks</h1>
                <p style={{ margin: '0', color: '#fff' }}>Live and Exclusive on Lachy League</p>
            </div>
        </div>
    );
}

export default BottomNextGame;