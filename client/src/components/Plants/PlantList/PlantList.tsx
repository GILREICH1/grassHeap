import React, { useContext, useState, useEffect } from 'react';
import { plantsContext } from '../../App/App';
import PlantItem from '../PlantItem/PlantItem';
import { MyPlant, Plant } from '../../../common/types';
import { PlantGif } from '../../PlantGif/PlantGif';
import styles from './PlantList.module.scss';
import Filter from '../Filtering/Filter';

const isInMyPlants = (myPlants: MyPlant[], plant: Plant): boolean => {
  return myPlants.some(myPlant => myPlant.name === plant.slug);
};

function PlantList(): JSX.Element {
  const [filteredPlants, setFilteredPlants] = useState<Plant[]>([]);
  const { plants, myPlants, setPlants } = useContext(plantsContext);

  useEffect(() => {
    setFilteredPlants(plants);
  }, []);

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

  return (
    <>
      <Filter setFilteredPlants={setFilteredPlants} plants={plants} />
      <div className={styles.PlantList}>
        <div className={styles.PlantList__sort}>
          <button
            style={{ backgroundColor: 'blue' }}
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
        {plants &&
          filteredPlants.map((plant, i) => {
            return (
              <PlantItem
                key={i}
                inMyPlants={isInMyPlants(myPlants, plant)}
                plant={plant}></PlantItem>
            );
          })}
      </div>
      <div className={styles.footer}>
        {filteredPlants.length === 0 ? (
          <h3>No Results!</h3>
        ) : (
          <h3>That&apos;s all!</h3>
        )}
        <PlantGif />
      </div>
    </>
  );
}

export default PlantList;
