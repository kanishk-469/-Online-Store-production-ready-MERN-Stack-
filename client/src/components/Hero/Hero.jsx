import { Link } from "react-router-dom";
import style from "./Hero.module.css";
const Hero = () => {
  return (
    <>
      <section className={style.heroContainer}>
        <h1>Welcome to Our Online Store</h1>
        <p>Discover the world of fashion and style</p>
        <Link to="/shop">
          <button>Shop Now</button>{" "}
        </Link>
        <div className={style.offer}>
          <p>Special Offer! Get 20% off on all electronics</p>
        </div>
      </section>
    </>
  );
};

export default Hero;
