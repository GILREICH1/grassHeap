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

interface MonthProps {
  monthNumber: number;
  monthName: string;
}

function MonthsTasksBox({ monthNumber, monthName }: MonthProps): JSX.Element {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [seasonIcon, setSeasonIcon] = useState('');
  const { myPlants } = useContext(plantsContext);

  useEffect(() => {
    if (myPlants) {
      // TODO get user tasks also
      getTasksByMonth(monthName).then((tasks: Task[]) => {
        // filter tasks to those which are relevant to plants saved in myPlants database OR added manually
        const myTasks = tasks.filter((task: Task) =>
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
        tasks={tasks}
      />
    </div>
  );
}

export default MonthsTasksBox;
