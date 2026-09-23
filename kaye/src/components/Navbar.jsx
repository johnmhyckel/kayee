import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-brand">Kaye</NavLink>
      <ul className="navbar-links">
        <li>
          <NavLink to="/videos" className={({ isActive }) => isActive ? 'active' : ''}>Videos</NavLink>
        </li>
        <li>
          <NavLink to="/photos" className={({ isActive }) => isActive ? 'active' : ''}>Photos</NavLink>
        </li>
        <li>
          <NavLink to="/monthsary" className={({ isActive }) => isActive ? 'active' : ''}>Monthsary</NavLink>
        </li>
        <li>
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
