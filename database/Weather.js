import axios from 'axios'

export function Weather(city) {
    axios.get(`https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${city}`)
        .then(response => console.log(response.data))
        .catch(error => console.error(error))
}