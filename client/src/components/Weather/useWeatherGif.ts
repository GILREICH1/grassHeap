import { useEffect, useState } from 'react';
import { getGIF } from '../../services/ServerApiServices';

/**
 * Hook to fetch a random weather-related GIF url.
 */
export function useWeatherGif(weatherDescription: string): string {
  const [gifPath, setGifPath] = useState('');

  useEffect(() => {
    getGIF(weatherDescription)
      .then(resultsObj => {
        const randomNumber = Math.floor(Math.random() * resultsObj.length);
        const imageURL = resultsObj[randomNumber].images.fixed_height.url;
        setGifPath(imageURL);
      })
      .catch(() => {
        setGifPath('error');
      });
  }, [weatherDescription]);

  return gifPath;
}
