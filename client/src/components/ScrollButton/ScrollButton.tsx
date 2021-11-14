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
  const className = 'scroll-btn__' + type;

  return (
    <button
      disabled={disabled}
      className={styles[className]}
      onClick={onClick}
      type="button">
      <p>▶</p>
    </button>
  );
};

export default ScrollButton;
