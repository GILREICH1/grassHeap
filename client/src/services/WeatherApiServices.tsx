import { SERVER_URL as base_url } from '../utils/config';
import { APIWeather } from '../common/types';
/* eslint-disable */
export const getWeather = async (city: string): Promise<APIWeather> => {
  const JSONweather = await fetch(`${base_url}/weather`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ city }),
  });
  const weather = await JSONweather.json();
  if (weather.cod !== '200') throw new Error();
  return weather;
};
