import { useState } from 'react';
import styles from './WeatherModal.module.scss';

interface WeatherModalProps {
  changeCity: (city: string) => void;
}

const WeatherModal = ({ changeCity }: WeatherModalProps): JSX.Element => {
  const [city, setCity] = useState('');

  return (
    <form
      className={styles.form}
      onSubmit={e => {
        e.preventDefault();
        changeCity(city);
      }}>
      <input
        placeholder="London"
        type="text"
        className={styles['form__field']}
        required
        autoComplete="address-level1"
        value={city}
        onChange={e => setCity(e.target.value)}
      />
      <input className={styles.submit} type="submit" value="Set Location" />
    </form>
  );
};

export default WeatherModal;
