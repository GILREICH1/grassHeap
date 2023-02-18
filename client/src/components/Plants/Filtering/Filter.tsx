import React, { useState, useEffect } from 'react';
import { Plant, TruthySunRequirements } from '../../../common/types';
import styles from './Filter.module.scss';
import FilterCheckBox from './FilterCheckBox';
import { returnPlantsSearch } from '../helpers';
import SortingButtons from './SortingButtons';

interface FilterProps {
  setFilteredPlants: (plants: Plant[]) => void;
  plants: Plant[];
}

const Filter = ({ setFilteredPlants, plants }: FilterProps): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sunFilters, setSunFilters] = useState<TruthySunRequirements[]>([]);
  const sunRequirements: TruthySunRequirements[] = [
    'Full Sun',
    'Partial Sun',
    'Full Shade',
  ];

  function onSearch(e: React.FormEvent<HTMLFormElement>) {
    const target = e.target as HTMLInputElement;
    setSearchTerm(target.value);
  }

  function toggleCheckbox({
    checked,
    value,
  }: {
    checked: boolean;
    value: TruthySunRequirements;
  }) {
    if (checked) {
      setSunFilters(prev => prev.filter(e => e !== value && e));
    } else {
      setSunFilters(prev => {
        const newF = [...prev, value];
        return newF.filter(e => e);
      });
    }
  }

  useEffect(() => {
    const newFilteredPlants: Plant[] = returnPlantsSearch(
      sunFilters,
      searchTerm,
      plants,
    );

    setFilteredPlants(newFilteredPlants);
  }, [searchTerm, sunFilters]);

  return (
    <div className={styles.filters}>
      {/* TODO Make modular text input form */}
      <form
        className={styles.searchForm}
        onChange={onSearch}
        onSubmit={e => e.preventDefault()}>
        <input
          className={styles['form__field']}
          placeholder="tomato"
          id="plant-search"
          type="text"></input>
        <input className={styles.submit} type="submit" value="Search" />
      </form>
      <form className={styles.checkBoxes}>
        {sunRequirements.map(label => (
          <FilterCheckBox
            onChange={toggleCheckbox}
            value={label}
            key={label}
            label={label}
          />
        ))}
      </form>
      {!searchTerm && sunFilters.length === 0 && (
        <SortingButtons setFilteredPlants={setFilteredPlants} plants={plants} />
      )}
    </div>
  );
};

export default Filter;
