import { v4 as uuid } from 'uuid';
import { Task } from '../../../../common/types';

const task1: Task = {
  _id: uuid(),
  month: 'January',
  task: 'January test task1',
  crop: 'squash',
  userCreated: true,
};

const task2: Task = {
  _id: uuid(),
  month: 'October',
  task: 'October test task2',
  crop: 'squash',
};

const taskList = [task1, task2];
const mocks = {
  taskList,
};
export default mocks;