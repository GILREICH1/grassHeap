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
    <button disabled={disabled} className={className} onClick={onClick}>
      <p>▶</p>
    </button>
  );
};

export default ScrollButton;
