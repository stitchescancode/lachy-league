import React, { useState, useEffect } from 'react';

// TimeUntil component
const TimeUntil = () => {
    const [timeRemaining, setTimeRemaining] = useState('');

    // Hardcoded target time (dd/mm/yy hh:mm AM/PM format)
    const targetTime = '03/08/2025 07:25 PM'; // Example target time

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const target = new Date(targetTime);
            const timeDiff = target - now;

            if (timeDiff <= 0) {
                setTimeRemaining('Event started!');
                clearInterval(interval);
            } else {
                const years = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));
                const months = Math.floor((timeDiff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
                const weeks = Math.floor((timeDiff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24 * 7));
                const days = Math.floor((timeDiff % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

                setTimeRemaining(
                    `${years > 0 ? years + 'y ' : ''}` +
                    `${months > 0 ? months + 'm ' : ''}` +
                    `${weeks > 0 ? weeks + 'w ' : ''}` +
                    `${days > 0 ? days + 'd ' : ''}` +
                    `${hours}h ${minutes}m ${seconds}s`
                );
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [targetTime]);

    return (
        <div style={styles.container}>
            <div style={styles.overlay}>
                <h2 style={styles.header}>Time Until Event:</h2>
                <p style={styles.timeRemaining}>{timeRemaining}</p>
            </div>
        </div>
    );
};

// Styles for the component
const styles = {
    container: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #2c3e50, #34495e)',  // Dynamic gradient background
        fontFamily: 'Roboto, sans-serif',
        color: '#fff',
        overflow: 'hidden',
    },
    overlay: {
        background: 'rgba(0, 0, 0, 0.7)',  // Darker semi-transparent overlay for contrast
        borderRadius: '20px',  // More rounded corners
        padding: '80px', // Increased padding for more spacious layout
        width: '600px', // Wider layout to accommodate larger text
        textAlign: 'center',
        boxShadow: '0 25px 75px rgba(0, 0, 0, 0.5)', // Larger shadow for more depth
        transition: 'transform 0.3s ease-in-out',
    },
    header: {
        fontSize: '60px',  // Much larger font size for the header
        marginBottom: '30px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '5px', // Increased letter spacing for boldness
    },
    timeRemaining: {
        fontSize: '80px',  // Significantly larger font for the time remaining
        fontWeight: '900',  // Heavier font weight
        color: '#ecf0f1',
        marginTop: '30px',
        lineHeight: '1.1',
        letterSpacing: '3px',
    },
};

export default TimeUntil;