import React, { useEffect, useState } from 'react';
import { getGIF } from '../../../services/ServerApiServices';
import { APIWeather } from '../../../common/types';
import styles from './WeatherDetails.module.scss';

interface WeatherDetailsProps {
  weather: APIWeather;
  setModalDisplay: (arg: boolean) => void;
}

function WeatherDetails({
  weather,
  setModalDisplay,
}: WeatherDetailsProps): JSX.Element {
  const [gifPath, setGifPath] = useState('');

  useEffect(() => {
    let isMounted = true;
    const query = weather.weather[0].main;
    getGIF(query).then(resultsObj => {
      const randomNumber = Math.floor(Math.random() * resultsObj.length);
      const imageURL = resultsObj[randomNumber].images.fixed_height.url;
      if (isMounted) setGifPath(imageURL);
    });
    return () => {
      isMounted = false;
    };
  }, [weather]);

  return (
    <div className={styles.WeatherDetails}>
      <div className={styles['WeatherDetails__text desktop']}>
        <h1>
          Weather in <a onClick={() => setModalDisplay(true)}>{weather.name}</a>{' '}
          today: {weather.weather[0]?.description}
        </h1>
      </div>
      <div className={styles['WeatherDetails__Container']}>
        <a
          href={`https://www.bbc.co.uk/weather/${weather.id}`}
          rel="noreferrer"
          target="_blank">
          <img className={styles['Weather__icon']} src={gifPath}></img>
        </a>
        <p>click the gif for more detailed weather</p>
      </div>
    </div>
  );
}

export default WeatherDetails;
