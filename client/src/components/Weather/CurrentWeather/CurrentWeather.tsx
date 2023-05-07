import { APIWeather } from '../../../common/types';
import styles from './CurrentWeather.module.scss';

interface Props {
  weather: APIWeather;
}

/**
 * Left side of the weather widget.
 */
function CurrentWeather({ weather }: Props): JSX.Element {
  return (
    <div className={styles['container']}>
      <h2>{'Today'}</h2>
      <img
        className={styles['icon']}
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}></img>
      <div className={styles['numericData']}>
        <h3>{weather.main && Math.round(weather.main?.temp)} °C</h3>
        <h3>{weather.weather[0].description}</h3>
      </div>
    </div>
  );
}

export default CurrentWeather;
