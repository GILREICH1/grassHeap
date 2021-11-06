import React, { useState } from 'react';
import { saveTask } from '../../../services/ServerApiServices';
import { Task } from '../../../common/types';
import styles from './AddTaskForm.module.scss';

interface AddTaskFormProps {
  month: string;
  addNewTask: (task: Task) => void;
  tasks: Task[];
}

function AddTaskForm({
  month,
  addNewTask,
  tasks,
}: AddTaskFormProps): JSX.Element {
  const [crop, setCrop] = useState<string>('');
  const [task, setTask] = useState<string>('');

  // const { myPlants } = useContext(plantsContext);

  // const plantList = myPlants.map(plant => plant.name).sort();
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

  async function saveAndAddTask(task: Task) {
    const fullTask = await saveTask(task);
    addNewTask(fullTask);
  }

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: Task = { month, crop, task, userCreated: true };
    if (taskIsNew(newTask, tasks)) {
      saveAndAddTask(newTask);
    }
    setTask('');
    setCrop('');
  };

  return (
    <form className={styles.submitForm} onSubmit={submitHandler}>
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
  );
}

export default AddTaskForm;
