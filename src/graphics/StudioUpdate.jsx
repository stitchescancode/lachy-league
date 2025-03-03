import { useState, useEffect } from 'react';
import Logo from '../../logos/positive-variant/lachy-league.png';

function StudioUpdate({ updateStatus, text, statsValue }) {
  const [height, setHeight] = useState('0rem'); // Default height set to '0rem'
  const [isVisible, setIsVisible] = useState(updateStatus); // Track visibility of the component

  // Inject keyframes for animations into the document once on mount
  useEffect(() => {
    const style = document.createElement('style'); 23
    style.innerHTML = `
      @keyframes backgroundFadeIn {
        0% {
          background-color: transparent;
          opacity: 0;
        }
        100% {
          background-color: #313131;
          opacity: 1;
        }
      }

      @keyframes textSlideIn {
        0% {
          transform: translateX(50%);
          opacity: 0;
        }
        100% {
          transform: translateX(0);
          opacity: 1;
        }
      }

      @keyframes backgroundFadeOut {
        0% {
          background-color: #313131;
          opacity: 1;
        }
        100% {
          background-color: transparent;
          opacity: 0;
        }
      }

      @keyframes textSlideOut {
        0% {
          transform: translateX(0);
          opacity: 1;
        }
        100% {
          transform: translateX(50%);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);

    // Clean up when the component unmounts
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    if (statsValue === true) {
      setHeight('5rem');
    } else {
      setHeight('0rem');
    }
  }, [statsValue]);

  useEffect(() => {
    if (!updateStatus) {
      setTimeout(() => {
        setIsVisible(false); // Hide the component after the animation duration
      }, 1000); // Wait for the animation (1 second)
    } else {
      setIsVisible(true);
    }
  }, [updateStatus]);

  if (!isVisible) {
    return null; // Return null to remove the component after animation
  }

  const div = {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    bottom: height,
    backgroundColor: '#313131',
    height: '9.8rem',
    width: '100%', // Take up full width now, no animations affecting it
    gap: '2rem',
    fontSize: '1.5rem',
    fontFamily: 'Sour Gummy, sans-serif',
    color: 'white',
    textTransform: 'uppercase',
    animation: updateStatus
      ? 'backgroundFadeIn 1s ease-out forwards'
      : 'backgroundFadeOut 1s ease-in forwards', // Background fade in/out
  };

  const img = {
    height: '7rem',
  };

  const leftDiv = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 1rem',
    height: '9.8rem',
    backgroundColor: '#000000',
    borderTopRightRadius: '10rem',
    borderBottomRightRadius: '10rem',
    // No width change for logo and circle; keep them the same
  };

  const rightDiv = {
    position: 'relative',
    animation: updateStatus ? 'textSlideIn 0.8s ease-out forwards' : 'textSlideOut 0.8s ease-in forwards', // Text sliding in/out
  };

  return (
    <section style={div} className="section_update">
      <div style={leftDiv} className="left">
        <img
          style={img}
          src={Logo}
          alt={`Lachy League on channel ${import.meta.env.VITE_CHANNEL_NUMBER}`}
        />
      </div>
      <div className="right" style={rightDiv}>
        <h1>{text || ''}</h1>
      </div>
    </section>
  );
}

export default StudioUpdate;