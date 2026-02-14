import React from "react";
import style from "./Card.module.css";

const Card = React.memo(({ image, title, price, isFeatured }) => {
  return (
    <>
      <div className={style.cardContainer}>
        <div className={style.card}>
          <img src={image} alt={title} />
          <h3>{title}</h3>

          {isFeatured && <p className={style.price}>₹ {price}</p>}
        </div>
      </div>
    </>
  );
});

export default Card;

{
  /* 
  Single responsibility
  Works for both category and featured
  Optimized
 */
}
