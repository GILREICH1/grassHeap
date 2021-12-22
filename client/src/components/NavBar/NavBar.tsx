import React from 'react';
import { Link } from 'react-router-dom';
import { months } from '../../utils/months';
import AuthNav from '../Authentication/AuthNav';
import './NavBar.css';

function Navbar(): JSX.Element {
  const today = new Date();

  const currentMonth = months[today.getMonth()];

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
      NavBar.style.top = '-50px';
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
      </div>
      <AuthNav />
      <div className="p-menu1">
        <nav id="navbar" className="navigation" role="navigation">
          <input id="toggle1" type="checkbox" />
          <label className="hamburger" htmlFor="toggle1">
            <div className="top"></div>
            <div className="meat"></div>
            <div className="bottom"></div>
          </label>

          {/* <div className="Navbar__externalLinks menu1"> */}
          <div className="Navbar__externalLinks">
            <a
              className="dropdown NavLink navElement"
              href={`https://www.rhs.org.uk/advice/in-month/${currentMonth}`}
              rel="noreferrer"
              target="_blank">
              RHS
            </a>
            <span className="NavElement__icon">🍀</span>
            <a
              className="dropdown NavLink navElement"
              href={'https://www.bbc.co.uk/weather'}
              rel="noreferrer"
              target="_blank">
              BBC Weather
            </a>
            <span className="NavElement__icon">⛅</span>
            <a
              className="dropdown NavLink navElement"
              href={'https://www.gardenfocused.co.uk/index.php'}
              rel="noreferrer"
              target="_blank">
              Veg Info
            </a>
            <span className="NavElement__icon">🥦</span>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
