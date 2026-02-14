import React, { useEffect, useMemo, useState, useCallback } from "react";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner/Spinner";

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import {
  fetchProducts,
  selectProducts,
  selectProductsLoading,
} from "../../redux/slices/productSlice";
import styles from "./Shop.module.css";
import productData from "../../data.json";

const Shop = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  // const products = useSelector(selectProducts);
  const loading = useSelector(selectProductsLoading);

  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState("");

  useEffect(() => {
    setProducts(productData);
  }, []);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Debounce
  const debouncedSearch = useMemo(() => search, [search]);

  const filteredProducts = useMemo(() => {
    let min = 0;
    let max = Infinity;

    if (priceRange) {
      [min, max] = priceRange.split("-").map(Number);
    }

    return products.filter((product) => {
      const title = (product.title || product.name || "").toLowerCase();
      const description = (product.description || "").toLowerCase();

      const matchSearch =
        title.includes(debouncedSearch.toLowerCase()) ||
        description.includes(debouncedSearch.toLowerCase());

      const matchPrice = product.price >= min && product.price <= max;

      return matchSearch && matchPrice;
    });
  }, [products, debouncedSearch, priceRange]);

  const handleAddToCart = useCallback(
    (product) => {
      dispatch(addToCart({ ...product, quantity: 1 }));
      toast.success(`${product.title || product.name} added to cart`);
    },
    [dispatch]
  );

  // if (loading) return <p>Loading...</p>;
  if (loading) return <Spinner />;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Products</h1>

      <div className={styles.filterSection}>
        {" "}
        <input
          type="text"
          placeholder="Search for products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />{" "}
        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className={styles.select}
        >
          {" "}
          <option value="">Select Price Range</option>{" "}
          <option value="0-50">Under 50</option>{" "}
          <option value="51-100">51 - 100</option>{" "}
          <option value="101-200">101 - 200</option>{" "}
          <option value="201-300">201 - 300</option>{" "}
          <option value="301-500">301 - 500</option>{" "}
          <option value="500-1000">500 - 1000</option>{" "}
          <option value="1000-10000">1000 Above</option>{" "}
        </select>{" "}
      </div>

      <div className={styles.grid}>
        {filteredProducts.map((product) => (
          <div key={product._id || product.id} className={styles.card}>
            <img
              src={product.image}
              alt={product.title || product.name}
              className={styles.image}
            />

            <div className={styles.cardBody}>
              <h5 className={styles.cardTitle}>
                {product.title || product.name}
              </h5>

              <p className={styles.price}>₹ {product.price}</p>

              <button
                onClick={() => handleAddToCart(product)}
                className={styles.button}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {!loading && filteredProducts.length === 0 && (
        <p className={styles.errorMessage}>No products found.</p>
      )}
    </div>
  );
};

export default Shop;
