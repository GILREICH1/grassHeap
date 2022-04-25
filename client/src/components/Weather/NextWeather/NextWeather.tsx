import { WeatherForecast } from '../../../common/types';
import styles from './NextWeather.module.scss';
import { useWeatherGif } from '../useWeatherGif';

interface Props {
  forecast: WeatherForecast;
}

/**
 * Next Weather details for a single day.
 */
function NextWeather({ forecast }: Props): JSX.Element {
  const gifPath = useWeatherGif(forecast.weather[0].description || '');

  const dayNumber = new Date(forecast.dt).getDate();

  return (
    <div className={styles['container']}>
      <h3>{dayNumber}</h3>
      <img className={styles['gif']} src={gifPath} />
      <h3>{forecast.main.temp} °C</h3>
      <h3>{forecast.main.humidity}%</h3>
    </div>
  );
}

export default NextWeather;
