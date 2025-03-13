import React, { useEffect, useState } from 'react';
import LachyLeague from '../../logos/positive-variant/lachy-league.png';
import LachyLeague2 from '../../logos/secondary-positive-variant/lachy-league-variant.png';

import { motion, AnimatePresence } from 'framer-motion';

export default function Commentators({ status, jsonData }) {
    const [commentatorStatus, setCommentatorStatus] = useState(false);
    const [data, setData] = useState([]);

    const height = 7;
    const heightValue = `${height}rem`;
    const negativeHeightValue = `${height - 2}rem`;

    useEffect(() => {
        // If jsonData is an object, convert it into an array
        setData(Array.isArray(jsonData) ? jsonData : [jsonData]);
    }, [jsonData]);

    useEffect(() => {
        setCommentatorStatus(status);
    }, [status]);

    return (
        <>
            <AnimatePresence>
                {commentatorStatus && (
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <motion.div
                            style={{
                                height: heightValue,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center', // Center content vertically
                                gap: '2rem',
                                fontFamily: 'Sour Gummy, sans-serif',
                                background: 'linear-gradient(-90deg, #313131, #202020)',
                                width: 'max-content',
                                borderRadius: '.5rem',
                                position: 'absolute',
                                bottom: '4.5rem',
                            }}
                            className='commentators'
                            initial={{
                                transform: 'scaleX(0)', // Initial scale (collapsed state)
                                transformOrigin: 'left', // Start scaling from the left
                            }}
                            transition={commentatorStatus ? { type: 'spring', damping: 15 } : { type: 'tween' }}
                            animate={{
                                transform: commentatorStatus ? 'scaleX(1)' : 'scaleX(0)', // Scale from 0 to 1
                                transformOrigin: commentatorStatus ? 'left' : 'right', // Animate from left to right
                            }}
                            exit={{
                                transform: 'scaleX(0)', // Collapse on exit
                                transformOrigin: 'right', // Exit animation starts from the right,
                                transition: {
                                    type: 'tween'
                                }
                            }}
                        >
                            <div
                                style={{
                                    width: '11rem',
                                    backgroundColor: 'black',
                                    height: heightValue,
                                    borderBottomLeftRadius: '1rem',
                                    borderTopLeftRadius: '1rem',
                                    borderBottomRightRadius: '10rem',
                                    borderTopRightRadius: '10rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                className='left'
                            >
                                <img style={{ height: negativeHeightValue }} src={LachyLeague} alt="" />
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    gap: '3rem',
                                    fontSize: '1rem',
                                    color: 'white',
                                    marginRight: '5rem',
                                    textTransform: 'uppercase',
                                    alignItems: 'center', // Center vertically
                                    justifyContent: 'center',
                                }}
                                className="commentators"
                            >
                                {data.length > 0 ? (
                                    data.map((commentator, index) => (
                                        <div key={index}>
                                            <h1 style={{ margin: 0 }}>{commentator.name}</h1>
                                            {commentator.showLabel && (
                                                <p style={{ margin: 0, opacity: 0.4 }}>
                                                    {commentator.title}
                                                </p>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div>No commentators available</div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
