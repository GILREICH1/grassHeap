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
  const { plants, myPlants } = useContext(plantsContext);

  useEffect(() => {
    setFilteredPlants(plants);
  }, []);

  return (
    <>
      <Filter setFilteredPlants={setFilteredPlants} plants={plants} />
      <div className={styles.PlantList}>
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
