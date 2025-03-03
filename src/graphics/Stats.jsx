import React, { useState, useEffect } from 'react';

function Stats({ statsValue, statsText }) {
    const [isOpen, setIsOpen] = useState(false);
    const [text, setText] = useState('');
    const [lastCheck, setLastCheck] = useState(false);

    // Manage the animation state
    const [shouldRender, setShouldRender] = useState(true);

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

    // Only render the component if `shouldRender` is true
    if (!shouldRender) {
        return null;
    }

    return (
        <div style={styles.stats(isOpen)}>
            <div style={styles.lachyLeague(isOpen)}>#LACHYLEAGUE</div>
            <p style={styles.scheduleText}>{text}</p>
        </div>
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
        opacity: isOpen ? 1 : 0, // Add conditional styling if needed
        width: isOpen ? '100%' : '0%', // Set width based on isOpen state
        animation: isOpen
            ? 'widthAnimationForStatsElement 1s ease-in-out forwards'
            : 'none', // No closing animation, just immediately hide
        animationFillMode: 'forwards', // Keep the final state of the animation after it ends
    }),

    lachyLeague: (isOpen) => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#333', // Dark grey, smooth and professional
        color: 'white',
        fontSize: '1.6rem', // Increased text size
        fontFamily: '"Sour Gummy", sans-serif',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        letterSpacing: '1.8px',
        height: '5.5rem',
        padding: '0 1.5rem',
        width: isOpen ? '20rem' : '0', // Animate width only when open
        boxSizing: 'border-box',
        borderTop: '3px solid #555', // Slightly thicker border
        boxShadow: 'inset 0 0 10px rgba(255, 255, 255, 0.1), 0 0 8px rgba(0, 0, 0, 0.4)',
        animation: isOpen
            ? 'widthAnimationForStatsElement 1s ease-in-out forwards'
            : 'none', // No closing animation, just immediately hide
        animationFillMode: 'forwards', // Keep the final state of the animation after it ends
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
};

export default Stats;