import Tasks from '../Tasks/Tasks/Tasks';
import Weather from '../Weather/Weather';
import './Dashboard.css';

function Dashboard(): JSX.Element {
  return (
    <div>
      <Weather />
      <Tasks />
    </div>
  );
}

export default Dashboard;