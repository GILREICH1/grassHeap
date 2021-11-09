import React from 'react';
import MyPlantsList from '../MyPlants/MyPlantsList';
import Tasks from '../Tasks/Tasks/Tasks';
import Weather from '../Weather/Weather';

function Dashboard(): JSX.Element {
  return (
    <div>
      <Weather />
      <Tasks />
      <MyPlantsList />
    </div>
  );
}

export default Dashboard;
