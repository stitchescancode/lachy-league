import LachyLeague from '../../logos/positive-variant/lachy-league.png';
import LachyLeague2 from '../../logos/secondary-positive-variant/lachy-league-variant.png';

function Copyright() {
    return (
        <div style={{
            fontFamily: 'Sour Gummy, sans-serif',
            background: 'linear-gradient(to right, #262626, #3a3a3a)',
            color: '#f1f1f1',
            borderRadius: '1rem',
            position: 'absolute',          // Absolute positioning
            bottom: '5rem',                // Distance from the bottom
            left: '50%',                   // Horizontally center the element
            transform: 'translateX(-50%)', // Correct for the 50% left positioning
            zIndex: '9999',                // Make sure it's on top of other elements
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.4)', // Softer, deeper shadow for a floating effect
            letterSpacing: '0.1rem',       // Increased letter spacing for a cleaner look
            fontWeight: 'bold',            // Make text bolder
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',                 // Slightly increased gap for balance
        }} className="copyright">
            <div
                style={{
                    width: '15rem',
                    backgroundColor: 'black',
                    height: '7rem',
                    borderBottomLeftRadius: '1rem',
                    borderTopLeftRadius: '1rem',
                    borderBottomRightRadius: '10rem',
                    borderTopRightRadius: '10rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.4)', // Light shadow for the logo box
                }}
                className='left'
            >
                <img style={{ height: '5rem', objectFit: 'contain' }} src={LachyLeague} alt="Lachy League Logo" />
            </div>
            <p style={{
                margin: 0,
                fontSize: '1rem',
                lineHeight: '1.5',  // Added line height for readability
                maxWidth: '40rem',  // Max width to prevent the text from stretching too far
                textAlign: 'center', // Ensure text is centered
            }}>
                © {new Date().getFullYear()} Lachy League. All rights reserved. This broadcast includes custom graphics and content created exclusively for this production. The presenters, audio, images, and other related media are the property of Fox League and are used with permission. Unauthorized use or reproduction of any part of this broadcast without prior consent is prohibited.
            </p>
        </div>
    );
}

export default Copyright;