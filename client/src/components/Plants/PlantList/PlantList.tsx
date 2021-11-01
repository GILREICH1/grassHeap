import React, { useContext, useEffect } from 'react';
import { plantsContext } from '../../App/App';
import PlantItem from '../PlantItem/PlantItem';
import { Plant } from '../../../common/types';
import { PlantGif } from '../../PlantGif/PlantGif';
import styles from './PlantList.module.scss';

function PlantList(): JSX.Element {
  const { plants, myPlants, setPlants } = useContext(plantsContext);
  useEffect(() => {
    displayPlants(plants);
  }, [plants]);

  function sortPlants(method = 'a'): void {
    if (method === 'p') {
      setPlants(prev => {
        const sortedArray = [...prev].sort((plant1, plant2) => {
          return plant1._score < plant2._score ? 1 : -1;
        });
        return sortedArray;
      });
    } else {
      setPlants(prev => {
        const sortedArray = [...prev].sort((plant1, plant2) => {
          return plant1.name.toLowerCase() > plant2.name.toLowerCase() ? 1 : -1;
        });
        return sortedArray;
      });
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
        <p>That&apos;s all!</p>
        <PlantGif />
      </div>
    </>
  );
}

export default PlantList;
