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
            let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${request.query.lat}&lon=${request.query.lon}&appid=a4ea6f97b24fc8c7111a7660c57090e6`;
            axios.get(url).then((forecast) => {
                console.log(forecast);
                response.send("It worked!");
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

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));