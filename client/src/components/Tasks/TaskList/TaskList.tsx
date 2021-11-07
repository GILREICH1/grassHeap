import React from 'react';
import TaskItem from '../TaskItem/TaskItem';
import { Task } from '../../../common/types';

interface TaskListProps {
  tasks: Task[];
  deleteThisTask: (_id: string) => void;
}

function TaskList({ tasks, deleteThisTask }: TaskListProps): JSX.Element {
  const noTasks: JSX.Element = (
    <div className="TaskList_empty">
      <p>No tasks for your plants this month!</p>
    </div>
  );
  const showTasks: JSX.Element[] = tasks.map((task, i) => (
    <React.Fragment key={i}>
      <TaskItem deleteThisTask={deleteThisTask} task={task} />
    </React.Fragment>
  ));

  return (
    <div className="TaskList">{tasks.length === 0 ? noTasks : showTasks}</div>
  );
}

export default TaskList;
