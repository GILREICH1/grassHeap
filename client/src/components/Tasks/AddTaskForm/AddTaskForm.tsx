import React, { useContext, useState } from 'react';
import { saveTask } from '../../../services/ServerApiServices';
import { Task } from '../../../common/types';
import styles from './AddTaskForm.module.scss';
import { userContxt } from '../../Authentication/UserContext';
import { useAuth0 } from '@auth0/auth0-react';

interface AddTaskFormProps {
  month: string;
  addNewTask: (task: Task) => void;
}

function AddTaskForm({ month, addNewTask }: AddTaskFormProps): JSX.Element {
  const [crop, setCrop] = useState<string>('');
  const [task, setTask] = useState<string>('');
  const { getAccessTokenSilently } = useAuth0();

  const { user } = useContext(userContxt);

  const submitHandler = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const token = await getAccessTokenSilently();
    const newTask: Task = { month, crop, task, userCreated: true };
    await saveTask({ task: newTask, user, token });
    addNewTask(newTask);
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
