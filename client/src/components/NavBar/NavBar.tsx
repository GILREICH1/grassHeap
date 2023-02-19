import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';
import AuthNav from '../Authentication/AuthNav';
import './NavBar.css';

function Navbar(): JSX.Element {
  const { isAuthenticated } = useAuth0();

  let prevScrollpos = window.pageYOffset;
  window.onscroll = function () {
    const currentScrollPos = window.pageYOffset;

    const NavBar = Array.from(
      document.getElementsByClassName(
        'Navbar',
      ) as HTMLCollectionOf<HTMLElement>,
    )[0];
    if (window.scrollY < 30) {
      NavBar.style.top = '0';
    } else if (prevScrollpos > currentScrollPos) {
      NavBar.style.top = '0';
    } else {
      NavBar.style.top = '-40px';
    }
    prevScrollpos = currentScrollPos;
  };

  return (
    <div className="Navbar">
      <div className="Navbar__appLinks">
        <Link className="NavLink navElement" to="/">
          Dashboard
        </Link>
        <span className="NavElement__icon">🌱</span>
        <Link className="NavLink navElement" to="/plants">
          Browse Plants
        </Link>
        <span className="NavElement__icon">🥕</span>
        <AuthNav />
      </div>
      {!isAuthenticated && (
        <div className="login-warning">
          You&apos;re not logged in! Login to save your changes
        </div>
      )}
    </div>
  );
}

export default Navbar;
