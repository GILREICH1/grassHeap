import React, { useState, useEffect } from 'react';
import { Plant, TruthySunRequirements } from '../../../common/types';
import styles from './Filter.module.scss';
import FilterCheckBox from './FilterCheckBox';

interface FilterProps {
  setFilteredPlants: (plants: Plant[]) => void;
  plants: Plant[];
}

const Filter = ({ setFilteredPlants, plants }: FilterProps): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeFilters, setActiveFilters] = useState<TruthySunRequirements[]>(
    [],
  );
  const sunRequirements: TruthySunRequirements[] = [
    'Full Sun',
    'Partial Sun',
    'Full Shade',
  ];

  function onSearch(e: React.FormEvent<HTMLFormElement>) {
    const target = e.target as HTMLInputElement;
    setSearchTerm(target.value);
  }

  function toggleCheckbox({ checked, value }: any) {
    if (checked) {
      setActiveFilters(prev => prev.filter(e => e !== value && e));
    } else {
      setActiveFilters(prev => {
        const newF = [...prev, value];
        return newF.filter(e => e);
      });
    }
  }
  console.log(activeFilters);

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
    <>
      <form className={styles.form} onChange={onSearch}>
        <label className={styles.label} htmlFor="plant-search">
          Search Plants
        </label>
        <input id="plant-search" type="text"></input>
      </form>
      <form className={styles.form} onChange={toggleCheckbox}>
        {sunRequirements.map(label => (
          <FilterCheckBox
            onChange={toggleCheckbox}
            value={label}
            key={label}
            label={label}
          />
        ))}
      </form>
    </>
  );
};

export default Filter;
