import { SERVER_URL as base_url } from '../utils/config';
import { APIWeather, WeatherForecastResponse } from '../common/types';

export const getWeather = async (city: string): Promise<APIWeather> => {
  const JSONweather = await fetch(`${base_url}/weather`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ city }),
  });
  const weather: APIWeather = await JSONweather.json();
  if (weather.cod != 200) throw new Error();
  return weather;
};

export const getForecast = async (
  city: string,
): Promise<WeatherForecastResponse> => {
  const JSONweather = await fetch(`${base_url}/forecast`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ city }),
  });
  const forecast = await JSONweather.json();
  if (forecast.cod != 200) throw new Error();
  return forecast;
};
