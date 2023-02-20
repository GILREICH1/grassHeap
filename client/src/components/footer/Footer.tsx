import { Link } from '@mui/joy';
import Typography from '@mui/joy/Typography';
import styles from './Footer.module.scss';
function Footer(): JSX.Element {
  return (
    <footer className={styles['footer']}>
      <Typography>
        A Project by{' '}
        <Link
          href="https://github.com/GILREICH1"
          target="_blank"
          rel="noreferrer">
          Gil Reich{' '}
        </Link>
        {' - '}
        with thanks to the{' '}
        <Link
          rel="noreferrer"
          target="_blank"
          href="https://github.com/Growstuff/growstuff/wiki/API-Version-0">
          GrowStuff API
        </Link>
      </Typography>
    </footer>
  );
}

export default Footer;
