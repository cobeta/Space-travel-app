// Navbar.jsx
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => (
  <nav className={styles.nav}>
    <NavLink
      to="/"
      end
      className={({ isActive }) =>
        isActive
          ? `${styles.link} ${styles.active}`
          : styles.link
      }
    >
      Home
    </NavLink>

    <NavLink
      to="/spacecrafts"
      className={({ isActive }) =>
        isActive
          ? `${styles.link} ${styles.active}`
          : styles.link
      }
    >
      Spacecrafts
    </NavLink>

    <NavLink
      to="/planets"
      className={({ isActive }) =>
        isActive
          ? `${styles.link} ${styles.active}`
          : styles.link
      }
    >
      Planets
    </NavLink>
  </nav>
);

export default Navbar;
