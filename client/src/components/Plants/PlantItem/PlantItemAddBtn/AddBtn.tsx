import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/joy/IconButton';

interface AddButtonProps {
  savePlant: () => void;
}

function AddButton({ savePlant }: AddButtonProps): JSX.Element {
  return (
    <IconButton
      className="btn PlantItem__btn"
      sx={{ position: 'absolute' }}
      onClick={savePlant}
      aria-label="Like minimal photography"
      size="md"
      variant="solid"
      color="danger">
      <FavoriteBorderIcon />
    </IconButton>
  );
}

export default AddButton;
