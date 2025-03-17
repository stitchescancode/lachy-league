import { useEffect, useState } from "react";
import { Weather } from "../../database/Weather";

const getCity = (stadium) => {
    switch (stadium) {
        case 'GIO Stadium': return 'Canberra';
        case 'CommBank Stadium': return 'Parramatta';
        case 'Belmore Sports Ground': return 'Canterbury-Bankstown';
        default: return 'Australia'; // Fallback case
    }
}

function WeatherComponent({ initialMatchData }) {
    const [matchData, setMatchData] = useState({});
    const [weather, setWeather] = useState({});

    // Set matchData when initialMatchData changes
    useEffect(() => {
        if (initialMatchData) {
            setMatchData(initialMatchData);
        }
    }, [initialMatchData]);

    // Fetch weather only when matchData updates
    useEffect(() => {
        if (matchData.stadium) {
            const city = getCity(matchData.stadium);
            const weatherData = Weather(city);
            setWeather(weatherData);
            console.log(weatherData);
        }
    }, []); // Separate effect for weather updates

    return (
        <>
            <div className="title">
                <h1>Weather</h1>
                <p>{matchData.stadium || 'Unknown Stadium'}</p>
            </div>
            <div aria-label="Weather">
                <p>{weather?.current?.temp_c ?? 'Unknown'}</p>
            </div>
        </>
    );
}

export default WeatherComponent;