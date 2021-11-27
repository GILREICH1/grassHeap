import React, { createContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import Navbar from '../NavBar/NavBar';
import PlantList from '../Plants/PlantList/PlantList';
import PlantDetails from '../Plants/PlantDetails/PlantDetails';
import Loader from '../Loader/Loader';
import { MyPlant, Plant } from '../../common/types';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

import {
  getMyPlants,
  removeFromMyPlants,
  saveToMyPlants,
} from '../../services/ServerApiServices';
import { getAllPlants } from '../../services/GrowStuffApiServices';
import { useQuery, useQueryClient } from 'react-query';
import './App.css';

interface AppCtxt {
  myPlants: MyPlant[];
  plants: Plant[];
  removePlant: (_plantID: number) => void;
  savePlant: (_plant: Plant) => void;
  setPlants: React.Dispatch<React.SetStateAction<Plant[]>>;
}

export const plantsContext = createContext<AppCtxt>({
  myPlants: [],
  plants: [],
  removePlant: (_plantID: number) => null,
  savePlant: (_plant: Plant) => null,
  setPlants: () => null,
});

function App(): JSX.Element {
  const queryClient = useQueryClient();

  function setPlants() {
    console.log('setting plants');
  }

  function savePlant(plant: Plant): void {
    const newPlant: MyPlant = { name: plant.slug, plantID: parseInt(plant.id) };
    try {
      saveToMyPlants(newPlant).then(() => {
        console.log('refetching from save');
        queryClient.refetchQueries();
      });
    } catch (err) {
      console.log(err);
    }
  }

  function removePlant(plantID: number): void {
    removeFromMyPlants(plantID).then(() => {
      console.log('refetching from remove');
      queryClient.refetchQueries();
    });
  }

  const { data: plants = [], isSuccess: gotPlants = false } = useQuery<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    Plant[]
  >('all-plants', () => getAllPlants());

  const plantsFiltered: Plant[] = plants.filter(
    (plant: Plant) => !!plant.details,
  );

  const { data: myPlants = [] } = useQuery<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    MyPlant[]
  >('my-plants', () => getMyPlants());

  return gotPlants ? (
    <div className="App">
      <plantsContext.Provider
        value={{
          myPlants,
          plants: plantsFiltered,
          removePlant,
          savePlant,
          setPlants,
        }}>
        <Router>
          <Navbar />
          <div className="content">
            <Switch>
              <Route path="/plants/:name" component={PlantDetails} />
              <Route exact path="/plants" component={PlantList} />
              <Route exact path="/" component={Dashboard} />
            </Switch>
          </div>
        </Router>
      </plantsContext.Provider>
    </div>
  ) : (
    <Loader />
  );
}

export default App;
