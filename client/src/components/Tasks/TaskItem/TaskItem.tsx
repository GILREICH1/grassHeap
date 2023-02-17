import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';

import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

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
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        p: '8px',
        outline: 'solid var(--joy-palette-success-200); border-radius: 0.5rem;',
      }}
      spacing={2}>
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start">
        <Typography level="h6">
          {task.crop}{' '}
          <Chip variant="plain">
            <img
              className={styles.taskItem_crop_icon}
              src={taskIcon}
              onError={e => ((e.target as HTMLImageElement).src = backUpIcon)}
            />
          </Chip>
        </Typography>
        <Typography level="body1">{task.task}</Typography>
      </Stack>
      {task.userCreated && (
        <Button
          size="sm"
          color="danger"
          onClick={() => deleteThisTask(task._id)}>
          X
        </Button>
      )}
    </Stack>
  );
}

export default TaskItem;
