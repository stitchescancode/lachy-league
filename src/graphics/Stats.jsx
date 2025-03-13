import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Stats({ statsValue, statsText }) {
    const [isOpen, setIsOpen] = useState(false);
    const [text, setText] = useState('');
    const [lastCheck, setLastCheck] = useState(false);

    // Manage the animation state
    const [shouldRender, setShouldRender] = useState(true);

    // New state for countdown
    const [countdown, setCountdown] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    // Countdown target variable in the format dd:mm:yy hh:mm:ss
    const targetTime = "10:03:2025 17:30:00"; // Example format

    useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
      @keyframes widthAnimationForStatsElement {
        0% {
          width: 0%; // Start from 0 width
        }
        100% {
          width: 100%; // End at 100% width
        }
      }
    `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style); // Clean up when the component unmounts
        };
    }, []);

    useEffect(() => {
        if (statsText) {
            setText(statsText); // Update text on mount
        }
    }, [statsText]);

    useEffect(() => {
        if (statsValue !== lastCheck) {
            if (statsValue) {
                setShouldRender(true); // Ensure the element is rendered when statsValue is true
                resetCountdown(); // Reset countdown when statsValue changes
            } else {
                // Wait for the animation to complete before removing the element
                setIsOpen(false);
                setTimeout(() => {
                    setShouldRender(false); // Remove the element after animation
                }, 1000); // 1 second timeout for the opening animation to finish
            }
        }
        setIsOpen(statsValue);
        setLastCheck(statsValue); // Update last check state
    }, [statsValue, lastCheck]);

    // Countdown timer logic
    const resetCountdown = () => {
        // Parse the targetTime variable (dd:mm:yyyy hh:mm:ss)
        const [datePart, timePart] = targetTime.split(" ");
        const [day, month, year] = datePart.split(":").map(Number);
        const [hours, minutes, seconds] = timePart.split(":").map(Number);

        const targetDate = new Date(year, month - 1, day, hours, minutes, seconds); // Convert to Date object
        const interval = setInterval(() => {
            const now = new Date();
            const timeDiff = targetDate - now; // Difference in milliseconds

            if (timeDiff <= 0) {
                clearInterval(interval); // Stop the interval once the countdown reaches zero
                setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

            setCountdown({ days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(interval); // Cleanup interval on component unmount
    };

    return (
        <AnimatePresence>
            {shouldRender && (
                <motion.div
                    style={styles.stats(isOpen)}
                    transition={{ type: 'tween', duration: 0.5 }}
                    initial={{ transform: 'scaleX(0)' }}
                    animate={isOpen ? { transform: 'scaleX(1)', transformOrigin: 'left' } : { transform: 'scaleX(0)', transformOrigin: 'right' }} >
                    <motion.div
                        style={styles.lachyLeague(isOpen)}
                        transition={{ type: 'tween' }}
                        initial={{ transform: 'scaleX(0)', position: 'absolute' }}
                        animate={isOpen ? { transform: 'scaleX(1)', position: 'unset' } : { transform: 'scaleX(0)', opacity: 0 }}
                    >#LACHYLEAGUE</motion.div>
                    <p style={styles.scheduleText}>{text}</p>
                    {/* {isOpen && (
                        <div style={styles.countdown}>
                            <div>
                                {countdown.days} Days {countdown.hours} Hours {countdown.minutes} Minutes {countdown.seconds} Seconds
                            </div>
                        </div>
                    )} */}
                </motion.div>
            )
            }
        </AnimatePresence >
    );
}

const styles = {
    stats: (isOpen) => ({
        display: 'grid',
        gridTemplateColumns: '20rem 3fr',
        position: 'absolute',
        bottom: '0',
        background: 'linear-gradient(to right, #262626, #3a3a3a)', // Smooth dark gradient
        height: '5.5rem', // Increased height
        boxShadow: '0 -4px 10px rgba(0, 0, 0, 0.6)', // More depth
        gap: '2.5rem',
        fontFamily: '"Sour Gummy", sans-serif',
        fontSize: '1.4rem', // Scaled-up text
        width: '100%'
    }),

    lachyLeague: (isOpen) => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#333', // Dark grey, smooth and professional
        color: 'white',
        fontSize: '1.6rem', // Increased text size
        fontFamily: '"Poppins", sans-serif',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        letterSpacing: '1.8px',
        height: '5.5rem',
        padding: '0 1.5rem',
        width: isOpen ? '20rem' : '0', // Animate width only when open
        boxSizing: 'border-box',
        borderTop: '3px solid #555', // Slightly thicker border,
        width: '20rem'
    }),

    scheduleText: {
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        fontSize: '1.2rem', // Slightly larger text
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        paddingLeft: '1.5rem',
        opacity: 0.95, // A bit less transparent
    },

    countdown: {
        color: 'white',
        fontSize: '1.4rem',
        fontWeight: 'bold',
        paddingLeft: '1.5rem',
        marginTop: '0.5rem',
    }
};

export default Stats;