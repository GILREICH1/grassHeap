import { useState } from 'react';
import { Plant } from '../../../common/types';
import { sortPlants } from '../helpers';
import styles from './Filter.module.scss';

export type SortingString = 'alph' | 'pop';

interface SortingButtonsProps {
  setFilteredPlants: (plants: Plant[]) => void;
  plants: Plant[];
}
function SortingButtons({
  setFilteredPlants,
  plants,
}: SortingButtonsProps): JSX.Element {
  const [sorting, setSorting] = useState<SortingString>('pop');

  function onClick(string: SortingString) {
    sortPlants(string, setFilteredPlants, plants);
    setSorting(string);
  }

  return (
    <div className={styles.sortingButtons}>
      <div>
        <input
          checked={sorting === 'pop'}
          name="sorting"
          id="popularity"
          type="radio"
          onChange={() => onClick('pop')}></input>
        <label htmlFor="popularity">Sort by Popularity</label>
      </div>
      <div>
        <input
          checked={sorting === 'alph'}
          name="sorting"
          id="alphabetic"
          type="radio"
          onChange={() => onClick('alph')}></input>
        <label htmlFor="alphabetic">Sort Alphabetically</label>
      </div>
    </div>
  );
}

export default SortingButtons;
