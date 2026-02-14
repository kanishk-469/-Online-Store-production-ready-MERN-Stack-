import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useTheme } from "../../context/ThemeContext";
const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <nav className={styles.container}>
      <div className={styles.brandName}>
        <Link to="/">Online Store</Link>
      </div>

      {/* <button onClick={toggleTheme} className={styles.themeBtn}>
        {theme === "light" ? "🌙 Dark" : "☀ Light"}
      </button> */}

      <ul className={styles.navItems}>
        <li className={styles.navItem}>
          <Link to="/">Home</Link>
        </li>

        <li className={styles.navItem}>
          <Link to="/shop">Shop</Link>
        </li>

        <li className={styles.navItem}>
          <Link to="/cart">Cart</Link>
        </li>

        <li className={styles.navItem}>
          <Link to="/order">Order</Link>
        </li>

        <li className={styles.navItem}>
          <Link to="/auth">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
