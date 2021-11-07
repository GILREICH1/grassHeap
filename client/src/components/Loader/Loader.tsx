import { useEffect, useState } from 'react';
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
      <h1>{`Watering${ellipses[i]}`}</h1>
      <img
        className="daisies"
        src="https://uploads-ssl.webflow.com/5ea82bf973106e1765b18a5f/5fd0d4198fecb12496f3bbdb_tumbs-up-4_1.gif"
        alt="swaying daisies"></img>
    </div>
  );
}
export default Loader;
