/* eslint-disable no-unused-vars */
import React from 'react';
import { Task } from '../../../common/types';
import styles from './TaskItem.module.scss';

interface TaskItemProps {
  task: Task;
  deleteThisTask: (_id: string) => void;
}

function TaskItem({ task, deleteThisTask }: TaskItemProps): JSX.Element {
  const taskIcon = `https://www.growstuff.org/crops/${task.crop}.svg`;
  const backUpIcon =
    'https://www.growstuff.org/assets/icons/planting-ce51a46e4a6edd740221f4a98f2e630a944e30ca040b9000d25179c8f5bc17e8.svg';

  return (
    <div className={styles.TaskItem}>
      <h3>
        {task.crop}{' '}
        <img
          className={styles.taskItem_crop_icon}
          src={taskIcon}
          onError={e => ((e.target as HTMLImageElement).src = backUpIcon)}
        />
      </h3>
      <p>{task.task}</p>
      {task.userCreated ? (
        <button onClick={() => deleteThisTask(task._id!)}>X</button>
      ) : null}
    </div>
  );
}

export default TaskItem;
