import { Plant, TruthySunRequirements } from '../../common/types';
import { SortingString } from './Filtering/SortingButtons';

export function returnPlantsSearch(
  activeFilters: TruthySunRequirements[],
  searchTerm: string,
  plants: Plant[],
): Plant[] {
  const filtersAreActive = activeFilters.length !== 0;
  let newFilteredPlants: Plant[] = [];

  if (searchTerm) {
    const regexSearch = new RegExp(searchTerm, 'i');
    newFilteredPlants = plants.filter(plant => regexSearch.test(plant.name));
  }

  if (!searchTerm && !filtersAreActive) newFilteredPlants = plants;
  else if (!searchTerm && filtersAreActive) {
    newFilteredPlants = plants.filter(plant => {
      const plantSunReqs = plant.details.attributes.sun_requirements;
      return plantSunReqs ? activeFilters.includes(plantSunReqs) : false;
    });
  } else if (searchTerm && filtersAreActive) {
    newFilteredPlants = newFilteredPlants.filter(plant => {
      const plantSunReqs = plant.details.attributes.sun_requirements;
      return plantSunReqs ? activeFilters.includes(plantSunReqs) : false;
    });
  }
  return newFilteredPlants;
}

export function sortPlants(
  method: SortingString,
  setFilteredPlants: (plants: Plant[]) => void,
  plants: Plant[],
): void {
  if (method === 'pop') {
    setFilteredPlants(
      [...plants].sort(({ _score: score1 }, { _score: score2 }) =>
        score1 < score2 ? 1 : -1,
      ),
    );
  } else {
    setFilteredPlants(
      [...plants].sort(({ name: name1 }, { name: name2 }) =>
        name1.toLowerCase() > name2.toLowerCase() ? 1 : -1,
      ),
    );
  }
}
