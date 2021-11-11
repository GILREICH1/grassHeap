import React, { createContext, useEffect, useState } from 'react';
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
import './App.css';
import { useQuery } from 'react-query';

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
  function setPlants() {
    console.log('setting plants');
  }

  function savePlant(plant: Plant): void {
    const newPlant: MyPlant = { name: plant.slug, plantID: parseInt(plant.id) };
    try {
      saveToMyPlants(newPlant);
      // TODO
      // setMyPlants((oldList: MyPlant[]) => [...oldList, newPlant]);
    } catch (err) {
      console.log(err);
    }
  }

  function removePlant(plantID: number): void {
    removeFromMyPlants(plantID);
    // const myPlantsCopy = myPlants.filter((plant) => plant.plantID !== plantID);
    // TODO
    // setMyPlants((oldPlants: MyPlant[]) =>
    // oldPlants.filter((plant: MyPlant) => plant.plantID !== plantID),
    // );
  }

  const { data: plants = [], isSuccess: gotPlants = false } = useQuery<
    any,
    any,
    Plant[]
  >('all-plants', () => getAllPlants());

  const plantsFiltered: Plant[] = plants.filter(
    (plant: Plant) => !!plant.details,
  );

  const { data: myPlants = [], isSuccess: gotMyPlants = false } = useQuery<
    any,
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
