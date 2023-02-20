/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import TaskList from '../TaskList/TaskList';
import { deleteTask } from '../../../services/ServerApiServices';
import AddTaskForm from '../AddTaskForm/AddTaskForm';
import { getSeason } from './getSeasonFunction';
import { Task } from '../../../common/types';
import { userContxt } from '../../Authentication/UserContext';
import { useAuth0 } from '@auth0/auth0-react';
import { months } from '../../../utils/months';
import Card from '@mui/joy/Card';

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
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
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
    if (isAuthenticated) {
      const token = await getAccessTokenSilently();
      await deleteTask({ _id, user, token });
    }
    const newTasksList: Task[] = tasks.filter(task => task._id !== _id);
    setTasks(newTasksList);
  }

  return (
    <Card>
      <h2>
        {monthName} {seasonIcon}
      </h2>
      <TaskList deleteThisTask={deleteThisTask} tasks={monthTasks} />
      <AddTaskForm
        addNewTask={(task: Task) => setTasks([...tasks, task])}
        month={monthName}
      />
    </Card>
  );
}

export default MonthTasksBox;
