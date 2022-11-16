import { APIWeather } from '../../../common/types';
import styles from './CurrentWeather.module.scss';
import { useWeatherGif } from '../useWeatherGif';

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
      <h2>{'Today'}</h2>
      <img className={styles['gif']} src={gifPath}></img>
      <div className={styles['numericData']}>
        <h3>{weather.main && Math.round(weather.main?.temp)} °C</h3>
        <h3>{weather.weather[0].description}</h3>
      </div>
    </div>
  );
}

export default CurrentWeather;
