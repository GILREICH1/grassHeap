import { v4 as uuid } from 'uuid';
import { Task } from '../../../../common/types';

export const monthName = 'January';
export const monthNumber = 0;

const task1: Task = {
  _id: uuid(),
  month: monthName,
  task: 'January test task1',
  crop: 'squash',
  userCreated: true,
};

const task2: Task = {
  _id: uuid(),
  month: monthName,
  task: 'October test task2',
  crop: 'squash',
};

const taskList = [task1, task2];
const mocks = {
  taskList,
  monthNumber,
  monthName,
};
export default mocks;
