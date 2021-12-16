import { Plant } from '../../../common/types';
import { sortPlants } from '../helpers';
import styles from './Filter.module.scss';

interface SortingButtonsProps {
  setFilteredPlants: (plants: Plant[]) => void;
  plants: Plant[];
}
function SortingButtons({
  setFilteredPlants,
  plants,
}: SortingButtonsProps): JSX.Element {
  return (
    <div className={styles.sortingButtons}>
      <div>
        <input
          name="sorting"
          id="popularity"
          type="radio"
          style={{ backgroundColor: 'blue' }}
          onClick={() => sortPlants('p', setFilteredPlants, plants)}></input>
        <label htmlFor="popularity">Sort by Popularity</label>
      </div>
      <div>
        <input
          name="sorting"
          id="alphabetic"
          type="radio"
          onClick={() => sortPlants('a', setFilteredPlants, plants)}></input>
        <label htmlFor="alphabetic">Sort Alphabetically</label>
      </div>
    </div>
  );
}

export default SortingButtons;
