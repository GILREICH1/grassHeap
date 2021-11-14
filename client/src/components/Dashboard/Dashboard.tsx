import React from 'react';
import MyPlantsList from '../MyPlants/MyPlantsList';
import Tasks from '../Tasks/Tasks/Tasks';
import Weather from '../Weather/Weather';
import styles from './Dashboard.module.scss';

function Dashboard(): JSX.Element {
  return (
    <div className={styles.dashboard}>
      <Weather />
      <Tasks />
      <MyPlantsList />
    </div>
  );
}

export default Dashboard;
