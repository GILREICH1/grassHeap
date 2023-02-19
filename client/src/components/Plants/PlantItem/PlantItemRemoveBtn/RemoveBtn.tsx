import { Favorite } from '@mui/icons-material';
import IconButton from '@mui/joy/IconButton';

interface RemoveBtnProps {
  removePlant: () => void;
}

function RemoveBtn({ removePlant }: RemoveBtnProps): JSX.Element {
  return (
    <IconButton
      className="btn PlantItem__btn"
      sx={{ position: 'absolute' }}
      onClick={removePlant}
      aria-label="Like minimal photography"
      size="md"
      variant="solid"
      color="danger">
      <Favorite />
    </IconButton>
  );
}

export default RemoveBtn;
