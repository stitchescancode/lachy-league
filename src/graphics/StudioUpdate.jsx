import { useState, useEffect } from 'react';
import Logo from '../../logos/positive-variant/lachy-league.png';
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

import NRLTonight from '../programming/nrl-tonight.webp'
import MattyJohnsSunday from '../programming/sunday-night-with-matty-johns.webp'
import MattyJohnsLate from '../programming/late-show-with-matty-johns.webp'

import Countdown from './Countdown';

import { animate, AnimatePresence, motion } from 'framer-motion';

function StudioUpdate({ initialMatchData, updateStatus, text, statsValue }) {
  const [height, setHeight] = useState('0rem'); // Default height set to '0rem'
  const [isVisible, setIsVisible] = useState(updateStatus); // Track visibility of the component
  const [data, setData] = useState({});

  useEffect(() => {
    if (!updateStatus) {
      setTimeout(() => {
        setIsVisible(false); // Hide the component after the animation duration
      }, 1000); // Wait for the animation (1 second)
    } else {
      setIsVisible(true);
    }
  }, [updateStatus]);

  useEffect(() => {
    setData(initialMatchData);
  }, [initialMatchData]);

  // Inject keyframes for animations into the document once on mount
  useEffect(() => {
    const style = document.createElement('style');
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

  // if (!isVisible) {
  //   return null; // Return null to remove the component after animation
  // }

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
    fontFamily: '"Poppins", sans-serif',
    color: 'white',
    textTransform: 'uppercase',
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.8)', // Stronger drop shadow,
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
    width: '15rem',
    // No width change for logo and circle; keep them the same
  };

  const leftDivSingle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 1rem',
    height: '9.8rem',
    backgroundColor: '#000000',
    borderTopRightRadius: '10rem',
    borderBottomRightRadius: '10rem',
    width: '9.8rem',
    // No width change for logo and circle; keep them the same
  };

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

  const teamsLogo = true;

  if (teamsLogo === false) {
    return (
      <AnimatePresence>
        updateStatus && (
        <motion.section style={div} className="section_update"
          initial={{ transformOrigin: 'left', transform: 'scaleX(0)' }}
          transition={updateStatus ? { type: 'tween' } : { type: 'tween' }}
          animate={updateStatus ? { transform: 'scaleX(1)', transformOrigin: 'left' } : { transform: 'scaleX(0)', transformOrigin: 'right' }}
          exit={{ transform: 'scaleX(0)', transformOrigin: 'right' }}>
          <div style={leftDiv} className="left">
            <img
              style={img}
              src={Logo}
              alt={`Lachy League on channel ${import.meta.env.VITE_CHANNEL_NUMBER}`}
            />
          </div>
          <AnimatePresence>
            <div className="right" style={{ width: '70%', backgroundColor: 'transparent', height: '2rem', display: 'flex', alignItems: 'center', overflow: 'hidden', position: 'relative' }}>
              <motion.h1
                style={{ position: 'absolute', height: '2rem', margin: 0 }}
                key={text}
                initial={{ top: '-2rem' }}
                animate={{ top: '-.65rem' }}
                exit={{ top: '5rem' }}>{text || ''}
              </motion.h1>
            </div>
          </AnimatePresence>
        </motion.section>
        )
      </AnimatePresence>
    );
  } else if (teamsLogo === true) {
    return (
      <motion.section
        style={div}
        className="section_update"
        initial={{ transformOrigin: 'left', transform: 'scaleX(0)' }}
        transition={{ type: 'tween' }}
        animate={updateStatus ? { transform: 'scaleX(1)' } : { transform: 'scaleX(0)', transformOrigin: 'right' }}
        exit={{ transform: 'scaleX(0)', transformOrigin: 'right' }}
      >
        <div style={leftDiv} className="left">
          <AnimatePresence>
            {getLogo(data.home_team) && getLogo(data.away_team) && (
              <motion.div
                style={{
                  background: 'linear-gradient(-180deg, #4F4F4F, #383838)',
                  width: '13rem',
                  height: '7rem',
                  border: '4px solid rgba(255, 255, 255, 0.3)', // Lighter white with reduced opacity
                  borderRadius: '10rem',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center', // Center content vertically
                  position: 'absolute',
                }}
                className="circle"
                key={data.home_team + data.away_team}
                initial={{ right: '100%' }}
                animate={{ left: '2.5rem' }}
                exit={{ left: '-50%' }}
                transition={{
                  delay: 1,
                  type: 'spring', // Smooth transition with spring
                  stiffness: 300, // Controls the spring tension
                  damping: 30, // Controls the damping of the spring
                }}
              >
                <motion.img
                  transition={{ delay: 1 }} // Slightly delayed rotation
                  initial={{ rotate: -90 }} // Start rotated
                  animate={{ rotate: 0 }} // Animate to normal rotation
                  style={{ height: '3.45rem', marginRight: '1rem', objectFit: 'contain' }}
                  src={getLogo(data.home_team)}
                  alt="Home team logo"
                />
                <motion.img
                  transition={{ delay: 1 }} // Slightly delayed rotation
                  initial={{ rotate: 90 }} // Start rotated
                  animate={{ rotate: 0 }} // Animate to normal rotation
                  style={{ height: '3.45rem', objectFit: 'contain' }}
                  src={getLogo(data.away_team)}
                  alt="Away team logo"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <AnimatePresence>
          <div className="right" style={{ width: '70%', backgroundColor: 'transparent', height: '2rem', display: 'flex', alignItems: 'center', overflow: 'hidden', position: 'relative' }}>
            <motion.h1
              style={{ position: 'absolute', height: '2rem', margin: 0 }}
              key={text}
              initial={{ top: '-2rem' }}
              animate={{ top: '-.65rem' }}
              exit={{ top: '5rem' }}>{text || ''}
            </motion.h1>
          </div>
        </AnimatePresence>
      </motion.section>
    );
  } else if (teamsLogo === 'single-team') {
    return (
      <motion.section style={div} className="section_update"
        initial={{ transformOrigin: 'left', transform: 'scaleX(0)' }}
        transition={updateStatus ? { type: 'tween' } : { type: 'tween' }}
        animate={updateStatus ? { transform: 'scaleX(1)' } : { transform: 'scaleX(0)', transformOrigin: 'right' }}
        exit={{ transform: 'scaleX(0)', transformOrigin: 'right' }}>
        <div style={leftDiv} className="left">
          <div style={{
            background: 'linear-gradient(-180deg, #4F4F4F, #383838)',
            width: '7rem',
            height: '7rem',
            border: '4px solid rgba(255, 255, 255, 0.3)', // Lighter white with reduced opacity
            borderRadius: '10rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center', // Center content vertically
          }}
            className="circle">
            <img style={{ height: '4rem' }} src={getLogo('Dolphins')} alt="" />
          </div>
        </div>
        <AnimatePresence>
          <div className="right" style={{ width: '70%', backgroundColor: 'transparent', height: '2rem', display: 'flex', alignItems: 'center', overflow: 'hidden', position: 'relative' }}>
            <motion.h1
              style={{ position: 'absolute', height: '2rem', margin: 0 }}
              key={text}
              initial={{ top: '-2rem' }}
              animate={{ top: '-.65rem' }}
              exit={{ top: '5rem' }}>{text || ''}
            </motion.h1>
          </div>
        </AnimatePresence>
      </motion.section>
    );
  } else if (teamsLogo === "nrl-tonight") {
    return (
      <motion.section style={div} className="section_update"
        initial={{ transformOrigin: 'left', transform: 'scaleX(0)' }}
        transition={updateStatus ? { type: 'tween' } : { type: 'tween' }}
        animate={updateStatus ? { transform: 'scaleX(1)' } : { transform: 'scaleX(0)', transformOrigin: 'right' }}
        exit={{ transform: 'scaleX(0)', transformOrigin: 'right' }}>
        <div style={leftDiv} className="left">
          <div style={{
            background: 'linear-gradient(-180deg, #4F4F4F, #383838)',
            width: '13rem',
            height: '7rem',
            border: '4px solid rgba(255, 255, 255, 0.3)', // Lighter white with reduced opacity
            borderRadius: '10rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center', // Center content vertically
          }}
            className="circle">
            <img style={{ height: '4rem' }} src={NRLTonight} alt="" />
          </div>
        </div>
        <AnimatePresence>
          <div className="right" style={{ width: '70%', backgroundColor: 'transparent', height: '2rem', display: 'flex', alignItems: 'center', overflow: 'hidden', position: 'relative' }}>
            <motion.h1
              style={{ position: 'absolute', height: '2rem', margin: 0 }}
              key={text}
              initial={{ top: '-2rem' }}
              animate={{ top: '-.65rem' }}
              exit={{ top: '5rem' }}>{text || ''}
            </motion.h1>
          </div>
        </AnimatePresence>
      </motion.section>
    );
  } else if (teamsLogo === "matty-johns-sunday") {
    return (
      <motion.section style={div} className="section_update"
        initial={{ transformOrigin: 'left', transform: 'scaleX(0)' }}
        transition={updateStatus ? { type: 'tween' } : { type: 'tween' }}
        animate={updateStatus ? { transform: 'scaleX(1)' } : { transform: 'scaleX(0)', transformOrigin: 'right' }}
        exit={{ transform: 'scaleX(0)', transformOrigin: 'right' }}>
        <div style={leftDiv} className="left">
          <div style={{
            background: 'linear-gradient(-180deg, #4F4F4F, #383838)',
            width: '13rem',
            height: '7rem',
            border: '4px solid rgba(255, 255, 255, 0.3)', // Lighter white with reduced opacity
            borderRadius: '10rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center', // Center content vertically
          }}
            className="circle">
            <img style={{ height: '6.5rem' }} src={MattyJohnsSunday} alt="" />
          </div>
        </div>
        <AnimatePresence>
          <div className="right" style={{ width: '70%', backgroundColor: 'transparent', height: '2rem', display: 'flex', alignItems: 'center', overflow: 'hidden', position: 'relative' }}>
            <motion.h1
              style={{ position: 'absolute', height: '2rem', margin: 0 }}
              key={text}
              initial={{ top: '-2rem' }}
              animate={{ top: '-.65rem' }}
              exit={{ top: '5rem' }}>{text || ''}
            </motion.h1>
          </div>
        </AnimatePresence>
      </motion.section>
    );
  } else if (teamsLogo === "matty-johns-late") {
    return (
      <AnimatePresence>
        updateStatus && (
        <motion.section style={div} className="section_update"
          initial={{ transformOrigin: 'left', transform: 'scaleX(0)' }}
          transition={updateStatus ? { type: 'tween' } : { type: 'tween' }}
          animate={updateStatus ? { transform: 'scaleX(1)' } : { transform: 'scaleX(0)', transformOrigin: 'right' }}
          exit={{ transform: 'scaleX(0)', transformOrigin: 'right' }}>
          <div style={leftDiv} className="left">
            <div style={{
              background: 'linear-gradient(-180deg, #4F4F4F, #383838)',
              width: '13rem',
              height: '7rem',
              border: '4px solid rgba(255, 255, 255, 0.3)', // Lighter white with reduced opacity
              borderRadius: '10rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center', // Center content vertically
            }}
              className="circle">
              <img style={{ height: '6.5rem' }} src={MattyJohnsLate} alt="" />
            </div>
          </div>
          <AnimatePresence>
            <div className="right" style={{ width: '70%', backgroundColor: 'transparent', height: '2rem', display: 'flex', alignItems: 'center', overflow: 'hidden', position: 'relative' }}>
              <motion.h1
                style={{ position: 'absolute', height: '2rem', margin: 0 }}
                key={text}
                initial={{ top: '-2rem' }}
                animate={{ top: '-.65rem' }}
                exit={{ top: '5rem' }}>{text || ''}
              </motion.h1>
            </div>
          </AnimatePresence>
        </motion.section>
        )
      </AnimatePresence>
    );
  }
}

export default StudioUpdate;