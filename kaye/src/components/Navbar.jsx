import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const close = () => setMenuOpen(false);

  return (
    <>
      <nav className="navbar">
        <NavLink to="/" className="navbar-brand" onClick={close}>Kaye</NavLink>

        {/* Desktop links */}
        <ul className="navbar-links">
          <li><NavLink to="/videos"    className={({ isActive }) => isActive ? 'active' : ''}>Videos</NavLink></li>
          <li><NavLink to="/photos"    className={({ isActive }) => isActive ? 'active' : ''}>Photos</NavLink></li>
          <li><NavLink to="/monthsary" className={({ isActive }) => isActive ? 'active' : ''}>Monthsary</NavLink></li>
          <li><NavLink to="/" end      className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
        </ul>

        {/* Hamburger button (mobile only) */}
        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`mobile-menu ${menuOpen ? 'visible' : ''}`}>
        <ul>
          <li><NavLink to="/videos"    onClick={close} className={({ isActive }) => isActive ? 'active' : ''}>Videos</NavLink></li>
          <li><NavLink to="/photos"    onClick={close} className={({ isActive }) => isActive ? 'active' : ''}>Photos</NavLink></li>
          <li><NavLink to="/monthsary" onClick={close} className={({ isActive }) => isActive ? 'active' : ''}>Monthsary</NavLink></li>
          <li><NavLink to="/" end      onClick={close} className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
        </ul>
      </div>

      {/* Overlay to close drawer */}
      {menuOpen && <div className="mobile-overlay" onClick={close} />}
    </>
  );
};

export default Navbar;
