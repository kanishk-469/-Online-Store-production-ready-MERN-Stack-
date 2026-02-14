import React, { useMemo } from "react";
import Card from "../Card/Card";
import style from "./FeaturedProduct.module.css";
import products from "../../data.json";

const FeaturedProduct = () => {
  //   const products = useMemo(() => normalizeProducts(productsData), []);

  const featuredProducts = useMemo(
    () => products.filter((p) => p.isFeatured === true).slice(0, 4),
    // [products]
    []
  );

  return (
    <section className={style.container}>
      <h2>Featured Products</h2>
      <div className={style.grid}>
        {featuredProducts.map((product) => (
          <Card
            key={product.id}
            image={product.image}
            title={product.title}
            price={product.price}
            isFeatured={product.isFeatured}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProduct;
