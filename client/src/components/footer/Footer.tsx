import styles from './Footer.module.scss';
function Footer(): JSX.Element {
  return (
    <footer className={styles['footer']}>
      A Project by
      <a href="https://github.com/GILREICH1" target="_blank" rel="noreferrer">
        {' '}
        Gil Reich{' '}
      </a>
      with thanks to the{' '}
      <a href="https://github.com/Growstuff/growstuff/wiki/API-Version-0">
        GrowStuff API
      </a>
    </footer>
  );
}

export default Footer;
