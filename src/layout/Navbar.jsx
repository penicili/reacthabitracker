import { NavLink } from "react-router";
import { useState } from "react";
import styles from "./Navbar.module.css";

const quotes = [
  "Small steps every day.",
  "Progress, not perfection.",
  "Keep showing up.",
  "Consistency beats intensity.",
  "You can do hard things.",
];

const Navbar = () => {
  const [quote] = useState(
    () => quotes[Math.floor(Math.random() * quotes.length)],
  );

  return (
    <nav className={styles.navBar}>
      <div>{/* Logo */}</div>
      <ul className={styles.navbarLinks}>
        <li>
          <NavLink className={styles.title} to="/">
            . habituals
          </NavLink>
        </li>
        <p className={styles.quotes}>{quote}</p>
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
