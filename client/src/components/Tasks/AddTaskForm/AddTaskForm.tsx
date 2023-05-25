import React, { useContext, useState } from 'react';
import { saveTask } from '../../../services/ServerApiServices';
import { Task } from '../../../common/types';
import { plantsContext } from '../../App/App';
import { userContxt } from '../../Authentication/UserContext';
import { useAuth0 } from '@auth0/auth0-react';
import { v4 as uuid } from 'uuid';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import PredictiveInput from './PredictiveInput';

interface AddTaskFormProps {
  month: string;
  addNewTask: (task: Task) => void;
}

function AddTaskForm({ month, addNewTask }: AddTaskFormProps): JSX.Element {
  const [crop, setCrop] = useState<string>('');
  const [task, setTask] = useState<string>('');
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const { plants } = useContext(plantsContext);

  const { user } = useContext(userContxt);

  const submitHandler = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const newTask: Task = {
      month,
      crop,
      task,
      userCreated: true,
      _id: uuid().substring(0, 6),
    };
    if (isAuthenticated) {
      const token = await getAccessTokenSilently();
      await saveTask({ task: newTask, user, token });
    }
    addNewTask(newTask);
    setTask('');
    setCrop('');
  };

  const onChange = (options: string[]) => {
    setCrop(options[0]);
  };

  return (
    <>
      <h3>Add New Task</h3>
      <label id="task-label">Task</label>
      <form>
        <Input
          value={task}
          onChange={e => setTask(e.target.value)}
          color="success"
          placeholder="water"
          size="md"
          required
        />
        <label id="crop-input-label">Crop</label>
        <PredictiveInput
          options={plants.map(p => p.name)}
          onChange={onChange}
        />
        {/* <select
        // @ts-expect-error there is an error here
        onChange={onChange}
        size={10}
        // placeholder="Choose one..."
        value={crop}>
        <option value="" key="placeholder">
          {'choose a crop'}
        </option>
        {plants.map(plant => (
          <option key={plant.id} value={plant.name}>
            {plant.name}
          </option>
        ))}
      </select> */}
        <Button
          disabled={!(crop && task)}
          color={crop && task ? 'success' : 'danger'}
          variant="solid"
          onClick={submitHandler}>
          Submit
        </Button>
      </form>
    </>
  );
}

export default AddTaskForm;
