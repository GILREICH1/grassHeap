import { useState, useEffect } from 'react';
import TaskList from '../TaskList/TaskList';
import {
  deleteTask,
  getMyPlants,
  getTasksByMonth,
} from '../../../services/ServerApiServices';
import AddTaskForm from '../AddTaskForm/AddTaskForm';
import { getSeason } from './getSeasonFunction';
import { MyPlant, Task } from '../../../common/types';
import { useQuery, useQueryClient } from 'react-query';
import styles from './MonthTasksBox.module.scss';

interface MonthProps {
  monthNumber: number;
  monthName: string;
}

function MonthsTasksBox({ monthNumber, monthName }: MonthProps): JSX.Element {
  const [seasonIcon, setSeasonIcon] = useState('');
  const queryClient = useQueryClient();

  const { data: tasks } = useQuery<Task[]>(`tasks-for-${monthName}`, () =>
    getTasksByMonth(monthName),
  );
  const { data: myPlants = [] } = useQuery<MyPlant[]>('my-plants', () =>
    getMyPlants(),
  );

  const myTasks = tasks
    ? tasks.filter((task: Task) =>
        myPlants.some(plant => plant.name === task.crop || task.userCreated),
      )
    : [];

  useEffect(() => {
    setSeasonIcon(getSeason(monthNumber + 1));
  }, [monthNumber, monthName]);

  async function deleteThisTask(_id: string): Promise<void> {
    await deleteTask(_id);
    queryClient.refetchQueries();
  }

  return (
    <div className={styles['MonthTaskBox']}>
      <h2>
        {monthName} {seasonIcon}
      </h2>
      {tasks ? (
        <>
          <TaskList deleteThisTask={deleteThisTask} tasks={myTasks} />
          <AddTaskForm month={monthName} tasks={myTasks} />
        </>
      ) : null}
    </div>
  );
}

export default MonthsTasksBox;
