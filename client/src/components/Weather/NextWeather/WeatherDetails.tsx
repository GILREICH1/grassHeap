import { WeatherForecast } from '../../../common/types';
import styles from './WeatherDetails.module.scss';

interface Props {
  forecast: WeatherForecast;
}

/**
 * Weather details for a single day.
 */
function WeatherDetails({ forecast: weatherObject }: Props): JSX.Element {
  const dayNumber = new Date(weatherObject.dt * 1000).toLocaleString('en-us', {
    weekday: 'long',
  });

  return (
    <div className={styles['container']}>
      <h3>{dayNumber}</h3>
      <img
        width="auto"
        height="100px"
        src={`https://openweathermap.org/img/wn/${weatherObject.weather[0].icon}@2x.png`}></img>
      <h3>{Math.round(weatherObject.main.temp)} °C</h3>
      <h3>{weatherObject.weather[0].description}</h3>
    </div>
  );
}

export default WeatherDetails;
