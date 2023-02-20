import React, { useContext, useState } from 'react';
import { saveTask } from '../../../services/ServerApiServices';
import { Task } from '../../../common/types';
import { plantsContext } from '../../App/App';
import { userContxt } from '../../Authentication/UserContext';
import { useAuth0 } from '@auth0/auth0-react';
import { v4 as uuid } from 'uuid';
import Input from '@mui/joy/Input';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Button from '@mui/joy/Button';
import CloseRounded from '@mui/icons-material/CloseRounded';
import IconButton from '@mui/joy/IconButton';

interface AddTaskFormProps {
  month: string;
  addNewTask: (task: Task) => void;
}

function AddTaskForm({ month, addNewTask }: AddTaskFormProps): JSX.Element {
  const [crop, setCrop] = useState<string>('');
  const action = React.useRef(null);
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

  return (
    <>
      <h3>Add New Task</h3>
      <label id="task-label">Task</label>
      <Input
        value={task}
        onChange={e => setTask(e.target.value)}
        color="success"
        placeholder="water"
        size="md"
        required
      />
      <label id="crop-input-label">Crop</label>
      <Select
        action={action}
        // @ts-expect-error there is an error here
        onChange={(_e, v) => setCrop(v)}
        color="success"
        placeholder="Choose one..."
        value={crop}
        {...(crop && {
          // display the button and remove select indicator
          // when user has selected a value
          endDecorator: (
            <IconButton
              size="sm"
              variant="plain"
              color="neutral"
              onMouseDown={event => {
                // don't open the popup when clicking on this button
                event.stopPropagation();
              }}
              onClick={() => {
                setCrop('');
              }}>
              <CloseRounded />
            </IconButton>
          ),
          indicator: null,
        })}>
        {plants.map(plant => {
          return (
            <Option key={plant.id} value={plant.name}>
              {plant.name}
            </Option>
          );
        })}
      </Select>
      <Button
        disabled={!(crop && task)}
        color={crop && task ? 'success' : 'danger'}
        variant="solid"
        onClick={submitHandler}>
        Submit
      </Button>
    </>
  );
}

export default AddTaskForm;
