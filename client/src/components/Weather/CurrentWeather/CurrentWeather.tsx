import { APIWeather } from '../../../common/types';
import styles from './CurrentWeather.module.scss';
import { useWeatherGif } from '../useWeatherGif';

const BBC_URL = 'https://www.bbc.co.uk/weather';

interface Props {
  weather: APIWeather;
}

/**
 * Left side of the weather widget.
 */
function CurrentWeather({ weather }: Props): JSX.Element {
  const gifPath = useWeatherGif(weather.weather[0]?.description || '');

  return (
    <div className={styles['container']}>
      <div className={styles['firstRow']}>
        <a href={`${BBC_URL}/${weather.id}`} rel="noreferrer" target="_blank">
          <img className={styles['gif']} src={gifPath}></img>
        </a>
        <div className={styles['numericData']}>
          <h1>{weather.main?.temp} °C</h1>
          <h3>{weather.main?.humidity}%</h3>
        </div>
      </div>
      <h2>{weather.weather[0].description}</h2>
    </div>
  );
}

export default CurrentWeather;
