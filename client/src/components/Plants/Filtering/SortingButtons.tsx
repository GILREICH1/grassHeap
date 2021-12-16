import { Plant } from '../../../common/types';
import { sortPlants } from '../helpers';

interface SortingButtonsProps {
  setFilteredPlants: (plants: Plant[]) => void;
  plants: Plant[];
}
function SortingButtons({
  setFilteredPlants,
  plants,
}: SortingButtonsProps): JSX.Element {
  return (
    <div>
      <input
        name="sorting"
        id="popularity"
        type="radio"
        style={{ backgroundColor: 'blue' }}
        onClick={() => sortPlants('p', setFilteredPlants, plants)}></input>
      <label htmlFor="popularity">Sort by Popularity</label>
      <input
        name="sorting"
        id="alphabetic"
        type="radio"
        onClick={() => sortPlants('a', setFilteredPlants, plants)}></input>
      <label htmlFor="alphabetic">Sort Alphabetically</label>
    </div>
  );
}

export default SortingButtons;
