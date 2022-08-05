const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;
const cache = [];

app.get('/weather', (request, response) => {
    if ('searchQuery' in request.query && 'lat' in request.query && 'lon' in request.query) {
        try {
            let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${request.query.lat}&lon=${request.query.lon}&appid=${process.env.WEATHER_API_KEY}`;

            let lat = request.query.lat;
            let lon = request.query.lon;

            if (`${lat}-${lon}` in cache) {
                if (cache[`${lat}-${lon}`].time === new Date().toDateString()) {
                    console.log('Used cache');
                    response.send(cache[`${lat}-${lon}`].data);
                } else {
                    delete cache[`${lat}-${lon}`];
                }
            } else {
                console.log('Used API')
                axios.get(url).then((forecast) => {
                    let responseData = [{
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
                    cache[`${lat}-${lon}`] = {
                        data: responseData,
                        time: new Date().toDateString()
                    };
                    response.send(responseData);
                }).catch((err) => {
                    console.log(err);
                    response.send({error: err});
                });
            }
        } catch (error) {
            console.log(error);
            response.send({error: error});
        }
    } else {
        response.send('Error: Not all arguments are present');
    }
});

function KelvinToFarenheit(K) {
    return 1.8 * (K - 273) + 32;
}

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));