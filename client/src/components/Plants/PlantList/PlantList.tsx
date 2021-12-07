import React, { useContext } from 'react';
import { plantsContext } from '../../App/App';
import PlantItem from '../PlantItem/PlantItem';
import { Plant } from '../../../common/types';
import { PlantGif } from '../../PlantGif/PlantGif';
import styles from './PlantList.module.scss';

function PlantList(): JSX.Element {
  const { plants, myPlants } = useContext(plantsContext);

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
      <div className={styles.PlantList}>{plants && displayPlants(plants)}</div>
      <div className={styles.footer}>
        <h3>That&apos;s all!</h3>
        <PlantGif />
      </div>
    </>
  );
}

export default PlantList;
