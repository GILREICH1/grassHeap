import React, { useContext, useEffect, useState } from 'react';
import { Plant } from '../../common/types';
import { plantsContext } from '../App/App';
import PlantItem from '../Plants/PlantItem/PlantItem';
import styles from './MyPlants.module.scss';

function MyPlantsList(): JSX.Element {
  const { plants, myPlants } = useContext(plantsContext);
  const [myPlantsList, setMyPlantsList] = useState<Plant[]>([]);

  useEffect(() => {
    const filteredPlants: Plant[] = plants.filter(plant =>
      myPlants.some(myPlant => myPlant.name === plant.slug),
    );

    setMyPlantsList(filteredPlants);
  }, []);

  return (
    <>
      <div className={styles.PlantList}>
        {myPlantsList.map(plant => {
          <React.Fragment key={plant._id}>
            <PlantItem inMyPlants={true} plant={plant} />
            );
          </React.Fragment>;
        })}
      </div>
    </>
  );
}

interface ScrollButtonProps {
  type: 'forward' | 'back';
  disabled: boolean;
  onClick(): void;
}

const ScrollButton = ({ type, onClick, disabled }: ScrollButtonProps) => {
  const className = 'scroll-btn__' + type;

  return (
    <button
      disabled={disabled}
      className={styles[className]}
      onClick={onClick}
      type="button">
      <p>▶</p>
    </button>
  );
};

export default MyPlantsList;
