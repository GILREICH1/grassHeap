import React, { useState } from 'react';
import { saveTask } from '../../../services/ServerApiServices';
import { Task } from '../../../common/types';
import { useQueryClient } from 'react-query';

import styles from './AddTaskForm.module.scss';

interface AddTaskFormProps {
  month: string;
  tasks: Task[];
}

function AddTaskForm({ month }: AddTaskFormProps): JSX.Element {
  const [crop, setCrop] = useState<string>('');
  const [task, setTask] = useState<string>('');
  const queryClient = useQueryClient();

  // legacy
  function taskIsNew(newTask: Task, tasks: Task[]) {
    const exists = Boolean(
      tasks.find((task: Task) => {
        return (
          task.month === newTask.month &&
          task.crop === newTask.crop &&
          task.task === newTask.task
        );
      }),
    );
    return !exists;
  }

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: Task = { month, crop, task, userCreated: true };
    await saveTask(newTask);
    queryClient.refetchQueries();
    setTask('');
    setCrop('');
  };

  return (
    <>
      <form className={styles.submitForm} onSubmit={submitHandler}>
        <h3>Add New Task</h3>
        <div className={styles['form__group']}>
          <input
            className={styles['form__field']}
            required
            value={task}
            onChange={e => setTask(e.target.value)}
          />
          <label className={styles['form__label']}>Task</label>
        </div>
        <div className={`${styles['form__group']}`}>
          <input
            className={styles['form__field']}
            required
            value={crop}
            onChange={e => setCrop(e.target.value.toLowerCase())}
          />
          <label className={styles['form__label']}>Crop</label>
        </div>
        <input className={styles.submit} type="submit" value="Submit" />
      </form>
    </>
  );
}

export default AddTaskForm;
