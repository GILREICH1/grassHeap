import React from 'react';
import { useEffect, useState } from 'react';
import { getWeather, getForecast } from '../../services/WeatherApiServices';
import { APIWeather, WeatherForecastResponse } from '../../common/types';
import styles from './Weather.module.scss';
import WeatherModal from './WeatherModal/WeatherModal';
import CurrentWeather from './CurrentWeather/CurrentWeather';
import WeatherDetails from './NextWeather/WeatherDetails';

const initialWeather = {
  weather: [
    {
      icon: 'sun',
      main: 'sun',
    },
  ],
};

function Weather(): JSX.Element {
  const storedCity = window.localStorage.getItem('city');
  const [weather, setWeather] = useState<APIWeather>(initialWeather);
  const [forecasts, setForecasts] = useState<WeatherForecastResponse | null>(
    null,
  );
  const [city, setCity] = useState(storedCity);
  const [error, setError] = useState(true);
  const [modalDisplay, setModalDisplay] = useState(false);

  function changeCity(city: string) {
    localStorage.setItem('city', city);
    setCity(city);
    setModalDisplay(false);
  }

  useEffect(() => {
    storedCity ? setCity(localStorage.getItem('city')) : setModalDisplay(true);
  }, []);

  useEffect(() => {
    if (city) {
      getWeather(city)
        .then(APIweather => {
          setWeather(APIweather);
          setError(false);
        })
        .catch(() => setError(true));
    }
  }, [city]);

  useEffect(() => {
    if (city) {
      getForecast(city).then(response => {
        setForecasts(response);
      });
    }
  }, [city]);

  if (modalDisplay) {
    return <WeatherModal changeCity={changeCity} />;
  }

  if (error) {
    return (
      <h1>
        No weather found for {city} :(
        <a onClick={() => setModalDisplay(true)}> try again</a>
      </h1>
    );
  }

  return (
    <div className={styles['container']}>
      <React.StrictMode>
        <h2 className={styles['header']}>
          <span>Weather for</span>
          <a onClick={() => setModalDisplay(true)}>{weather.name}</a>
        </h2>
        <div className={styles['weather']}>
          <CurrentWeather weather={weather} />
          <div className={styles['divider']}> </div>
          {forecasts && <WeatherDetails forecast={forecasts?.list[0]} />}
          {forecasts && <WeatherDetails forecast={forecasts?.list[1]} />}
          {forecasts && <WeatherDetails forecast={forecasts?.list[2]} />}
        </div>
      </React.StrictMode>
    </div>
  );
}

export default Weather;
