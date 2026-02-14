import React, { useMemo } from "react";
import Card from "../Card/Card";
import style from "./ShopByCategory.module.css";
import products from "../../data.json";

const ShopByCategory = () => {
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map((p) => p.categories))];

    return uniqueCategories.map((category) => {
      const product = products.find((p) => p.categories === category);

      return {
        name: category.toUpperCase(),
        image: product?.image,
      };
    });
  }, [products]);

  return (
    <section className={style.container}>
      <h2>Shop By Category</h2>
      <div className={style.grid}>
        {categories.map((cat, index) => (
          <Card
            key={index}
            image={cat.image}
            title={cat.name}
            isFeatured={false}
          />
        ))}
      </div>
    </section>
  );
};

export default ShopByCategory;
