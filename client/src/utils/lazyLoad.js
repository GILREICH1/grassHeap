import { useEffect, useState } from 'react';

https://stackoverflow.com/questions/51607043/how-to-lazy-load-the-background-image-inside-the-inline-style-property-react

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useProgressiveImage = src => {
  const [sourceLoaded, setSourceLoaded] = useState(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setSourceLoaded(src);
  }, [src]);

  return sourceLoaded;
};
export default useProgressiveImage;
