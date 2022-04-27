import React, { createContext, useContext, useEffect, useState } from 'react';
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
  removeFromMyPlants,
  saveToMyPlants,
} from '../../services/ServerApiServices';
import { getAllPlants } from '../../services/GrowStuffApiServices';
import './App.css';
import { userContxt } from '../Authentication/UserContext';
import { useAuth0 } from '@auth0/auth0-react';

interface AppCtxt {
  myPlants: MyPlant[];
  plants: Plant[];
  removePlant: (_plantID: number) => void;
  savePlant: (_plant: Plant) => void;
}

export const plantsContext = createContext<AppCtxt>({
  myPlants: [],
  plants: [],
  removePlant: (_plantID: number) => null,
  savePlant: (_plant: Plant) => null,
});

function App(): JSX.Element {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [myPlants, setMyPlants] = useState<MyPlant[]>([]);
  const [loadStatus, setLoadStatus] = useState<boolean>(false);
  const { user } = useContext(userContxt);
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  async function savePlant(plant: Plant): Promise<void> {
    const newPlant: MyPlant = { name: plant.slug, plantID: parseInt(plant.id) };
    try {
      if (isAuthenticated) {
        const token = await getAccessTokenSilently();
        saveToMyPlants({ plant: newPlant, token, user });
      }
      setMyPlants((oldList: MyPlant[]) => [...oldList, newPlant]);
    } catch (err) {
      console.log(err);
    }
  }

  async function removePlant(plantID: number): Promise<void> {
    if (isAuthenticated) {
      const token = await getAccessTokenSilently();
      removeFromMyPlants({ token, plantID, user });
    }
    setMyPlants((oldPlants: MyPlant[]) =>
      oldPlants.filter((plant: MyPlant) => plant.plantID !== plantID),
    );
  }

  useEffect(() => {
    // make request to GrowStuff API /crops endpoint for all crops
    getAllPlants().then((plants: Plant[]) => {
      setPlants(plants);
    });
  }, []);

  useEffect(() => {
    if (user.userPlants) setMyPlants(user.userPlants);
  }, [user]);

  useEffect(() => {
    if (plants.length) {
      setLoadStatus(true);
    }
  }, [myPlants, plants]);

  return loadStatus ? (
    <div className="App">
      <plantsContext.Provider
        value={{ myPlants, plants, removePlant, savePlant }}>
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
