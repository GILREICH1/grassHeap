import Typography from '@mui/joy/Typography';
import { useEffect, useState } from 'react';
import { PlantGif } from '../PlantGif/PlantGif';
import './Loader.css';

function Loader(): JSX.Element {
  const [i, seti] = useState(0);
  const ellipses = ['', '.', '..', '...'];

  useEffect(() => {
    let count = 0;
    const id = setInterval(() => {
      seti(count % ellipses.length);
      count++;
    }, 700);
    return () => {
      clearTimeout(id);
    };
  }, []);

  return (
    <div className="App__loading">
      <Typography level="h1">{`Watering${ellipses[i]}`}</Typography>
      <div className="daisies">
        <PlantGif />
      </div>
    </div>
  );
}
export default Loader;
