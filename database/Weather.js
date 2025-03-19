import axios from 'axios';

export function Weather(city) {
    return axios.get(`https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${city}`)
        .then(response => response.data)  // Return the weather data
        .catch(error => {
            console.error(error);
            throw error;  // Optional: You can handle this error further in the component
        });
}