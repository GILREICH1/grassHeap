const base_url = 'https://api.openweathermap.org/data/2.5';
const api_key = process.env.OPENWEATHER_API_KEY;
const fetch = require('node-fetch');

async function getWeather(req, res) {
  const { city } = req.body;
  try {
    const path = `${base_url}/weather?units=metric&q=${city}&appid=${api_key}`;
    const JSONweather = await fetch(path);
    const weather = await JSONweather.json();
    if (weather.cod !== 200) throw new Error();
    res.status(200).send(weather);
  } catch (err) {
    res.status(400).send(err);
  }
}

async function getFiveDayForecast(req, res) {
  const { city } = req.body;
  try {
    const path = `${base_url}/forecast?units=metric&q=${city}&appid=${api_key}`;
    const JSONweather = await fetch(path);
    const { cod, list } = await JSONweather.json();
    const filteredList = list.filter(weather => {
      return weather.dt_txt.includes('12:00:00');
    });
    const filteredResponse = { cod, list: filteredList };

    res.status(200).send(filteredResponse);
  } catch (err) {
    return res.status(400).send('bad request');
  }
}

module.exports = { getWeather, getFiveDayForecast };
