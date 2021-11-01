import React from 'react';
import Tasks from '../Tasks/Tasks/Tasks';
import Weather from '../Weather/Weather';

function Dashboard(): JSX.Element {
  return (
    <div>
      <Weather />
      <Tasks />
    </div>
  );
}

export default Dashboard;
