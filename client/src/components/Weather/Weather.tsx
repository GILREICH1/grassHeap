import React from 'react';
import { useEffect, useState } from 'react';
import { getWeather } from '../../services/WeatherApiServices';
import WeatherDetails from './WeatherDetails/WeatherDetails';
import { APIWeather } from '../../common/types';
import styles from './Weather.module.scss';
import WeatherModal from './WeatherModal/WeatherModal';

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

  return modalDisplay ? (
    <WeatherModal changeCity={changeCity} />
  ) : (
    <div className={styles.Weather}>
      {error ? (
        <h1>
          No weather found for {city} :(
          <a onClick={() => setModalDisplay(true)}> try again</a>
        </h1>
      ) : (
        <WeatherDetails setModalDisplay={setModalDisplay} weather={weather} />
      )}
    </div>
  );
}

export default Weather;
