import { SERVER_URL as base_url } from '../utils/config';
import { Plant } from '../common/types';

export const getAllPlants = async (): Promise<Plant[]> => {
  const JSONPlants = await fetch(`${base_url}/plants`);
  const plants = await JSONPlants.json();
  return plants;
};
