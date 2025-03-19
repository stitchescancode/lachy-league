import { useEffect, useState } from "react";
import { Weather } from "../../database/Weather";

const getCity = (stadium) => {
    switch (stadium) {
        case 'GIO Stadium': return 'Canberra';
        case 'CommBank Stadium': return 'Parramatta';
        case 'Belmore Sports Ground': return 'Canterbury-Bankstown';
        case 'AAMI Park': return 'Melbourne'
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
        const fetchWeather = async () => {
            if (matchData.stadium) {
                const city = getCity(matchData.stadium);
                console.log(city);
                if (city) {
                    try {
                        const weatherData = await Weather(city); // Wait for the weather data
                        setWeather(weatherData); // Update the weather state with the data
                        console.log(weatherData);
                    } catch (error) {
                        console.error("Failed to fetch weather data:", error);
                    }
                }
            }
        };

        fetchWeather();
    }, [matchData]); // Trigger effect when matchData changes

    return (
        <div style={{ display: 'flex', backgroundColor: '#313131', color: 'white', fontFamily: 'Sour Gummy, sans-serif', flexDirection: 'column', width: 'max-content', fontSize: '1.2rem', borderRadius: '.5rem', position: 'absolute', bottom: '2rem', left: '2rem' }}>
            <div style={{ display: 'flex' }}>
                <div style={{ height: '6rem', backgroundColor: 'black', width: '10rem', borderBottomRightRadius: '10rem', borderTopRightRadius: '10rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="left">
                    <img style={{ marginTop: '.5rem', boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.5)', height: '5rem', width: '5rem' }} src={weather?.current?.condition.icon} alt="" />
                </div>
                <div style={{ padding: '1rem' }} className="title">
                    <h1 style={{ margin: 0 }}>Weather</h1>
                    <p style={{ margin: 0 }}>{matchData.stadium || 'Unknown Stadium'}</p>
                </div>
            </div>
            <div aria-label="Weather">
                <p style={{ margin: '0', padding: '0 1rem' }}>Temperature: {Math.round(weather?.current?.temp_c ?? 'Unknown')}°C</p>
                <hr style={{ opacity: 0.4 }} />
                <p style={{ margin: '.75rem 0', padding: '0 1rem' }}>Wind: {Math.round(weather?.current?.wind_kph)}km/h</p>
                <hr style={{ opacity: 0.4 }} />
                <p style={{ margin: '.75rem 0', padding: '0 1rem' }}>Humidity: {weather?.current?.humidity}%</p>
                <hr style={{ opacity: 0.4 }} />
                <p style={{ margin: '.75rem 0', padding: '0 1rem' }}>Precipation: {weather?.current?.precip_mm}%</p>
            </div>
        </div>
    );
}

export default WeatherComponent;