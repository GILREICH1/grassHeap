/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import TaskList from '../TaskList/TaskList';
import {
  deleteTask,
  getTasksByMonth,
} from '../../../services/ServerApiServices';
import AddTaskForm from '../AddTaskForm/AddTaskForm';
import { getSeason } from './getSeasonFunction';
import { Task } from '../../../common/types';
import styles from './MonthTasksBox.module.scss';
import { plantsContext } from '../../App/App';
import { userContxt } from '../../Authentication/UserContext';
import { useAuth0 } from '@auth0/auth0-react';

const filterUserTasksByMonth = (tasks: Task[], monthName: string) => {
  return tasks.filter(task => task.month === monthName);
};

interface MonthProps {
  monthNumber: number;
  monthName: string;
}

function MonthsTasksBox({ monthNumber, monthName }: MonthProps): JSX.Element {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [seasonIcon, setSeasonIcon] = useState('');
  const { myPlants } = useContext(plantsContext);
  const { user } = useContext(userContxt);

  useEffect(() => {
    if (myPlants) {
      getTasksByMonth(monthName).then((tasks: Task[]) => {
        const usersMonthTasks = filterUserTasksByMonth(
          user.userTasks,
          monthName,
        );
        const withUserTasks = [...tasks, ...usersMonthTasks];
        // filter tasks to those which are relevant to plants saved in myPlants database OR added manually
        const myTasks = withUserTasks.filter((task: Task) =>
          myPlants.some(plant => plant.name === task.crop || task.userCreated),
        );
        setTasks(myTasks);
      });
    }
  }, [monthNumber, monthName, myPlants]);

  useEffect(() => {
    setSeasonIcon(getSeason(monthNumber + 1));
  }, [monthNumber, monthName]);

  function deleteThisTask(_id: string): void {
    setTasks([...tasks].filter(task => task._id !== _id));
    deleteTask(_id);
  }

  return (
    <div className={styles['MonthTaskBox']}>
      <h2>
        {monthName} {seasonIcon}
      </h2>
      <TaskList deleteThisTask={deleteThisTask} tasks={tasks} />
      <AddTaskForm
        addNewTask={(task: Task) => setTasks([...tasks, task])}
        month={monthName}
      />
    </div>
  );
}

export default MonthsTasksBox;
