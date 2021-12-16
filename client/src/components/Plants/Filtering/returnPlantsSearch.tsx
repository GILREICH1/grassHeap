import { Plant, TruthySunRequirements } from '../../../common/types';

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
