import Button from '@mui/joy/Button';
import styles from './ScrollButton.module.scss';

interface ScrollButtonProps {
  type: 'forward' | 'back';
  disabled: boolean;
  onClick(): void;
}

const ScrollButton = ({
  type,
  onClick,
  disabled,
}: ScrollButtonProps): JSX.Element => {
  const className = `${styles['scroll-btn']} ${
    type === 'back' ? styles[`scroll-btn__${type}`] : ''
  }`;

  return (
    <>
      <Button
        sx={{ height: '10rem' }}
        color="success"
        variant="solid"
        size="lg"
        disabled={disabled}
        className={className}
        onClick={onClick}>
        {'>'}
      </Button>
    </>
  );
};

export default ScrollButton;
