import { useState, useEffect } from 'react';

function BottomNextGame({ statsValue, bottomNextGameStatus, bottomNextGameData }) {
    const [height, setHeight] = useState('0rem');
    const [bottomNextData, setBottomNextData] = useState({});

    // Function to generate the image path based on player and team
    function generateImageSrc(fullName, team) {
        const names = fullName.split(' ');
        const firstName = names[0];
        const lastName = names[1];

        // Create the image filename by using the first letter of the first name and the full last name
        const imageName = `${firstName[0].toLowerCase()}-${lastName.toLowerCase()}.png`;
        console.log(imageName)
        console.log(team)

        // Construct the path with the team name as a folder
        console.log(`/players/${team.toLowerCase().replace(/\s+/g, '-')}/${imageName}`)
        return `/players/${team.toLowerCase().replace(/\s+/g, '-')}/${imageName}`;
    }

    useEffect(() => {
        if (bottomNextGameStatus === true && statsValue === false) {
            setHeight('9.5rem');
        } else if (bottomNextGameStatus === false && statsValue === true) {
            setHeight('5rem');
        } else if (bottomNextGameStatus === true && statsValue === true) {
            setHeight('14.5rem');
        } else if (bottomNextGameStatus === false && statsValue === false) {
            setHeight('0rem');
        }
    }, [bottomNextGameStatus, statsValue]);

    useEffect(() => {
        setBottomNextData(bottomNextGameData);
    }, [bottomNextGameData]);

    // Get the player image dynamically by passing the player's name and team
    let firstPlayerImage = generateImageSrc(bottomNextGameData.first_player, bottomNextGameData.home_team);
    let secondPlayerImage = generateImageSrc(bottomNextGameData.second_player, bottomNextGameData.away_team);

    const homeTeamName = bottomNextData.home_team ? bottomNextData.home_team.split('-')[1] : '';
    const awayTeamName = bottomNextData.away_team ? bottomNextData.away_team.split('-')[1] : '';;

    return (
        <div style={{
            backgroundColor: '#313131',
            display: 'flex',
            position: 'absolute',
            height: '10rem',
            alignItems: 'flex-end',
            borderTopRightRadius: '1rem',
            bottom: height,
            boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.8)',
            width: '45rem',
            fontFamily: "Sour Gummy, sans-serif",
            textTransform: 'uppercase',
        }}>
            <div className="players" style={{ display: 'flex', position: 'relative', padding: '0 0 0 1rem' }}>
                <img
                    style={{ height: '13rem' }}
                    src={firstPlayerImage}
                    alt={bottomNextGameData.first_player}
                />
                <img
                    style={{ height: '13rem', position: 'absolute', left: '7rem' }}
                    src={secondPlayerImage}
                    alt={bottomNextGameData.second_player}
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
                <p style={{ margin: '0' }}>{bottomNextData.subtitle} - {new Date().getFullYear()}</p>
                <h1 style={{ margin: '0' }}>{homeTeamName} vs {awayTeamName}</h1>
                <p style={{ margin: '0', color: '#fff' }}>Live and Exclusive on Lachy League</p>
            </div>
        </div>
    );
}

export default BottomNextGame;