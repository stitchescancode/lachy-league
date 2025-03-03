import React, { useEffect, useState } from 'react';
import LachyLeague from '../../logos/secondary-positive-variant/lachy-league-variant.png';

export default function Commentators() {
    return (
        <div style={{
            position: 'absolute',
            width: '100%',
            bottom: '8.6rem',
            display: 'flex',
            justifyContent: 'center',
            fontFamily: "Sour Gummy, sans-serif"
        }}>
            <div style={{
                width: '60rem', // Use the animated width here
                height: '7rem',
                display: 'flex',
                backgroundColor: '#313131',
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'end',
                    alignItems: 'center',
                    width: '12rem',
                    height: '7rem',
                    borderTopRightRadius: '10rem',
                    borderBottomRightRadius: '10rem',
                    backgroundColor: 'black',
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '4rem',
                        width: '4.5rem',
                        backgroundColor: '#313131',
                        marginRight: '1.5rem',
                        borderRadius: '100%',
                        border: '3px solid #03007c',
                        boxShadow: '0 0 10px 9px #03007c',
                    }}>
                        <img src={LachyLeague} alt="Lachy League Logo" style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                        }} />
                    </div>
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    padding: '0 2rem',
                    color: 'white',
                }}>
                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        width: 'max-content',
                    }}>
                        <h1 style={{ margin: 0 }}>Jake Duke</h1>
                        <h1 style={{ margin: 0 }}>Kevin Walters</h1>
                        <h1 style={{ margin: 0 }}>Cooper Cronk</h1>
                        <h1 style={{ margin: 0 }}>Gordon Tallis</h1>
                    </div>
                    <p style={{
                        color: '#fff',
                        margin: 0,
                    }}>Live from the Clive Churchill Studio</p>
                </div>
            </div>
        </div>
    );
}