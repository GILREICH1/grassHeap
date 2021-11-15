import { useContext, useEffect, useState } from 'react';
import { Plant } from '../../common/types';
import { plantsContext } from '../App/App';
import PlantItem from '../Plants/PlantItem/PlantItem';
import ScrollButton from '../ScrollButton/ScrollButton';
import styles from './MyPlantsList.module.scss';

function MyPlantsList(): JSX.Element {
  const { plants, myPlants } = useContext(plantsContext);
  const [myPlantsList, setMyPlantsList] = useState<Plant[]>([]);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const filteredPlants: Plant[] = plants.filter(plant =>
      myPlants.some(myPlant => myPlant.name === plant.slug),
    );

    setMyPlantsList(filteredPlants);
  }, []);

  return (
    <div className={styles.MyPlantListContainer}>
      <ScrollButton
        type="back"
        onClick={() => setStartIndex(startIndex - 1)}
        disabled={startIndex === 0}
      />
      <div className={styles.MyPlantListItems}>
        {myPlantsList.slice(startIndex, startIndex + 3).map(plant => {
          return (
            <div className={styles.MyPlantListItem} key={plant._id}>
              <PlantItem showButtons={false} inMyPlants={true} plant={plant} />
            </div>
          );
        })}
      </div>
      <ScrollButton
        type="forward"
        onClick={() => setStartIndex(startIndex + 1)}
        disabled={startIndex === myPlantsList.length - 3}
      />
    </div>
  );
}

export default MyPlantsList;
