import React, { useContext } from 'react';
import { plantsContext } from '../../App/App';
import PlantItem from '../PlantItem/PlantItem';
import { Plant } from '../../../common/types';
import { PlantGif } from '../../PlantGif/PlantGif';
import styles from './PlantList.module.scss';

function PlantList(): JSX.Element {
  const { plants, myPlants, setPlants } = useContext(plantsContext);

  function sortPlants(method = 'a'): void {
    if (method === 'p') {
      setPlants(
        [...plants].sort(({ _score: score1 }, { _score: score2 }) =>
          score1 < score2 ? 1 : -1,
        ),
      );
    } else {
      setPlants(
        [...plants].sort(({ name: name1 }, { name: name2 }) =>
          name1.toLowerCase() > name2.toLowerCase() ? 1 : -1,
        ),
      );
    }
  }

  function displayPlants(plants: Plant[]): JSX.Element {
    const plantListArr = plants.map((plant, i) => {
      const inMyPlants = myPlants.some(myPlant => myPlant.name === plant.slug);
      return (
        <PlantItem key={i} inMyPlants={inMyPlants} plant={plant}></PlantItem>
      );
    });

    return <>{plantListArr}</>;
  }

  return (
    <>
      <div className={styles.PlantList}>
        <div className={styles.PlantList__sort}>
          <button
            className={styles['PlantList__sort--btn']}
            onClick={() => sortPlants('p')}>
            Sort by Popularity
          </button>
          <button
            className={styles['PlantList__sort--btn']}
            onClick={() => sortPlants('a')}>
            Sort Alphabetically
          </button>
        </div>
        {plants && displayPlants(plants)}
      </div>
      <div className={styles.footer}>
        <h3>That&apos;s all!</h3>
        <PlantGif />
      </div>
    </>
  );
}

export default PlantList;
