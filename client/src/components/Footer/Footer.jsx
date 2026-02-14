import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Brand Section */}
        <div className={styles.section}>
          <h2 className={styles.logo}>OnlineStore</h2>
          <p className={styles.description}>
            Your one-stop destination for quality products at unbeatable prices.
            Fast delivery and secure checkout guaranteed.
          </p>
          <div className={styles.socials}>
            <FaFacebookF />
            <FaInstagram />
            <FaTwitter />
            <FaLinkedin />
          </div>
        </div>

        {/* Quick Links */}
        <div className={styles.section}>
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/shop">Shop</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              <Link to="/auth">SignIn</Link>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div className={styles.section}>
          <h3>Customer Service</h3>
          <ul>
            <li>
              <Link to="/order">My Orders</Link>
            </li>
            <li>
              <Link to="/auth">Reset Password</Link>
            </li>
            <li>
              <Link to="/">Contact Us</Link>
            </li>
            <li>
              <Link to="/">FAQ</Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className={styles.section}>
          <h3>Subscribe</h3>
          <p>Get updates about new products & special offers.</p>
          <div className={styles.newsletter}>
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        © {new Date().getFullYear()} OnlineStore. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
