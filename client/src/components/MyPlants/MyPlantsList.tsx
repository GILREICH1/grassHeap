import { useContext, useEffect, useState } from 'react';
import { Plant } from '../../common/types';
import { plantsContext } from '../App/App';
import PlantItem from '../Plants/PlantItem/PlantItem';
import styles from './MyPlantsList.module.scss';

function MyPlantsList(): JSX.Element {
  const { plants, myPlants } = useContext(plantsContext);
  const [myPlantsList, setMyPlantsList] = useState<Plant[]>([]);
  const [myPlantsListSlice, setMyPlantsListSlice] = useState<Plant[]>([]);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const filteredPlants: Plant[] = plants.filter(plant =>
      myPlants.some(myPlant => myPlant.name === plant.slug),
    );

    setMyPlantsList(filteredPlants);
  }, []);

  return (
    <>
      <div className={styles.PlantList}>
        <ScrollButton
          type="back"
          onClick={() => setStartIndex(startIndex - 1)}
          disabled={startIndex === 0}
        />
        {myPlantsList.slice(startIndex, startIndex + 5).map(plant => {
          return (
            <div className={styles.PlantList} key={plant._id}>
              <PlantItem inMyPlants={true} plant={plant} />
              );
            </div>
          );
        })}
        <ScrollButton
          type="forward"
          onClick={() => setStartIndex(startIndex + 1)}
          disabled={startIndex === myPlantsList.length - 5}
        />
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
