/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import TaskList from '../TaskList/TaskList';
import { deleteTask } from '../../../services/ServerApiServices';
import AddTaskForm from '../AddTaskForm/AddTaskForm';
import { getSeason } from './getSeasonFunction';
import { Task } from '../../../common/types';
import styles from './MonthTasksBox.module.scss';
import { userContxt } from '../../Authentication/UserContext';
import { useAuth0 } from '@auth0/auth0-react';
import { months } from '../../../utils/months';

const filterUserTasksByMonth = (tasks: Task[], monthName: string) => {
  return tasks.filter(task => task.month === monthName);
};

interface MonthProps {
  monthNumber: number;
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
}

function MonthTasksBox({
  tasks,
  monthNumber,
  setTasks,
}: MonthProps): JSX.Element {
  const [monthTasks, setMonthTasks] = useState<Task[]>([]);
  const [seasonIcon, setSeasonIcon] = useState('');
  const { getAccessTokenSilently } = useAuth0();
  const { user } = useContext(userContxt);
  const monthName = months[monthNumber];

  useEffect(() => {
    setSeasonIcon(getSeason(monthNumber + 1));
  }, [monthNumber]);

  useEffect(() => {
    const monthName = months[monthNumber];
    const filteredTasks = filterUserTasksByMonth(tasks, monthName);
    setMonthTasks(filteredTasks);
  }, [monthNumber, tasks]);

  async function deleteThisTask(_id: string): Promise<void> {
    const token = await getAccessTokenSilently();
    const newTasksList = await deleteTask({ _id, user, token });
    if (newTasksList) setTasks(newTasksList);
  }

  return (
    <div className={styles['MonthTaskBox']}>
      <h2>
        {monthName} {seasonIcon}
      </h2>
      <TaskList deleteThisTask={deleteThisTask} tasks={monthTasks} />
      <AddTaskForm
        addNewTask={(task: Task) => setTasks([...tasks, task])}
        month={monthName}
      />
    </div>
  );
}

export default MonthTasksBox;
