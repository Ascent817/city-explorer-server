const express = require('express');
const cors = require('cors');
const axios = require('axios');
const pos = require('./data/pos.pdf');
require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/weather', (request, response) => {
    if ('searchQuery' in request.query && 'lat' in request.query && 'lon' in request.query) {
        try {
            let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${request.query.lat}&lon=${request.query.lon}&appid=${process.env.WEATHER_API_KEY}`;
            axios.get(url).then((forecast) => {
                response.send(
                    [{
                        date: forecast.data.list[0].dt_txt.split(' ')[0],
                        highTemp: KelvinToFarenheit(forecast.data.list[0].main.temp_max),
                        lowTemp: KelvinToFarenheit(forecast.data.list[0].main.temp_min),
                        rain: forecast.data.list[0].pop,
                        description: forecast.data.list[0].weather[0].description
                    },
                    {
                        date: forecast.data.list[8].dt_txt.split(' ')[0],
                        highTemp: KelvinToFarenheit(forecast.data.list[8].main.temp_max),
                        lowTemp: KelvinToFarenheit(forecast.data.list[8].main.temp_min),
                        rain: forecast.data.list[8].pop,
                        description: forecast.data.list[8].weather[0].description
                    },
                    {
                        date: forecast.data.list[16].dt_txt.split(' ')[0],
                        highTemp: KelvinToFarenheit(forecast.data.list[16].main.temp_max),
                        lowTemp: KelvinToFarenheit(forecast.data.list[16].main.temp_min),
                        rain: forecast.data.list[16].pop,
                        description: forecast.data.list[16].weather[0].description
                    },
                    {
                        date: forecast.data.list[32].dt_txt.split(' ')[0],
                        highTemp: KelvinToFarenheit(forecast.data.list[32].main.temp_max),
                        lowTemp: KelvinToFarenheit(forecast.data.list[32].main.temp_min),
                        rain: forecast.data.list[32].pop,
                        description: forecast.data.list[32].weather[0].description
                    }]
                );
            }).catch((err) => {
                console.log(err);
                response.send({error: err});
            });
        } catch (error) {
            console.log(error);
            response.send({error: error});
        }
    } else {
        response.send('Error: Not all arguments are present');
    }
});

app.get('pos', (request, response) => {
    response.send(pos);
});


function KelvinToFarenheit(K) {
    return 1.8 * (K - 273) + 32;
}

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));