import { useState, useEffect } from 'react';
import { Plant } from '../../../common/types';
import styles from './Filter.module.scss';

interface FilterProps {
  setFilteredPlants: (plants: Plant[]) => void;
  plants: Plant[];
}

const Filter = ({ setFilteredPlants, plants }: FilterProps): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  function onChange(e: React.FormEvent<HTMLFormElement>) {
    const target = e.target as HTMLInputElement;
    setSearchTerm(target.value);
  }

  useEffect(() => {
    if (!searchTerm) setFilteredPlants(plants);
    else {
      const regexSearch = new RegExp(searchTerm, 'i');
      const newFilteredPlants = plants.filter(plant =>
        regexSearch.test(plant.name),
      );
      setFilteredPlants(newFilteredPlants);
    }
  }, [searchTerm]);

  return (
    <form className={styles.form} onChange={onChange}>
      <label className={styles.label} htmlFor="plant-search">
        Search Plants
      </label>
      <input id="plant-search" type="text"></input>
    </form>
  );
};

export default Filter;
