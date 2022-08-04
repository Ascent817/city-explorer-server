const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 8000;

app.get('/weather', (request, response) => {
    if ('searchQuery' in request.query && 'lat' in request.query && 'lon' in request.query) {
        try {
            let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${request.query.lat}&lon=${request.query.lon}&appid=${process.env.WEATHER_API_KEY}`;
            axios.get(url).then((forecast) => {
                response.send(
                    [{
                        date: forecast[0].dt_text.split(' ')[0],
                        highTemp: KelvinToFarenheit(forecast[0].main.temp_max),
                        lowTemp: KelvinToFarenheit(forecast[0].main.temp_min),
                        rain: forecast[0].pop(),
                        description: forecast[0].weather[0].description
                    },
                    {
                        date: forecast[8].dt_text.split(' ')[0],
                        highTemp: KelvinToFarenheit(forecast[8].main.temp_max),
                        lowTemp: KelvinToFarenheit(forecast[8].main.temp_min),
                        rain: forecast[8].pop(),
                        description: forecast[8].weather[0].description
                    },
                    {
                        date: forecast[16].dt_text.split(' ')[0],
                        highTemp: KelvinToFarenheit(forecast[16].main.temp_max),
                        lowTemp: KelvinToFarenheit(forecast[16].main.temp_min),
                        rain: forecast[16].pop(),
                        description: forecast[16].weather[0].description
                    },
                    {
                        date: forecast[32].dt_text.split(' ')[0],
                        highTemp: KelvinToFarenheit(forecast[32].main.temp_max),
                        lowTemp: KelvinToFarenheit(forecast[32].main.temp_min),
                        rain: forecast[32].pop(),
                        description: forecast[32].weather[0].description
                    }]
                );
            }).catch((err) => {
                response.send(err);
            });
        } catch (error) {
            response.send(error);
        }
    } else {
        response.send(null);
    }
});

function KelvinToFarenheit(K) {
    return 1.8 * (K - 273) + 32;
}

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));