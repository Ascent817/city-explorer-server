const express = require('express');
const cors = require('cors');
const data = require('./data/weather.json');
const { response, query } = require('express');
require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 8000;

app.get('/weather', (request, response) => {
    if ('searchQuery' in request.query) {
        let cityData = SearchData(request.query.searchQuery);
        if (cityData) {
            response.send(cityData.data.map((day) => {
                return {
                    lowTemp: day.low_temp,
                    highTemp: day.high_temp,
                    date: day.date,
                    windDir: day.wind_cdir_full,
                    clouds: day.clouds
                };
            }));
        }
    } else {
        response.send({error: 'Data not found.'});
    }
});

function SearchData(cityName) {
    let cityData = null;
    data.forEach((val) => {
        if (val.city_name.toLowerCase() === cityName.toLowerCase()) {
            cityData = val;
        }
    });
    return cityData
}

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));