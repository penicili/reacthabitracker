import { NavLink } from "react-router";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navBar}>
      <div>{/* Logo */}</div>
      <ul className={styles.navbarLinks}>
        <li>
          <NavLink className={styles.title} to="/">
            . habituals
          </NavLink>
        </li>
        <p className={styles.quotes}>
          Greetings, User!
        </p>
        <div className={styles.navigate}>
          <li>
            <NavLink className={styles.navLink} to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className={styles.navLink} to="/">
              Stats
            </NavLink>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
