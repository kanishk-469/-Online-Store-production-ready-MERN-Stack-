import React from "react";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from "../../redux/slices/cartSlice";

import styles from "./Cart.module.css";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  // console.log(items);

  if (items.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <h2>Your Cart is Empty 🛒</h2>
        <p>Add some products to your cart.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Shopping Cart</h1>

      <div className={styles.cartItems}>
        {items.map((item) => (
          <div key={item.id} className={styles.card}>
            <img
              src={item.image}
              alt={item.title || item.name}
              className={styles.image}
            />

            <div className={styles.details}>
              <h3>{item.title || item.name}</h3>
              <p className={styles.price}>₹ {item.price}</p>

              <div className={styles.quantityControls}>
                <button
                  onClick={() => dispatch(decreaseQuantity(item.id))}
                  className={styles.qtyBtn}
                >
                  −
                </button>

                <span className={styles.quantity}>{item.quantity}</span>

                <button
                  onClick={() => dispatch(increaseQuantity(item.id))}
                  className={styles.qtyBtn}
                >
                  +
                </button>
              </div>

              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className={styles.removeBtn}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.summary}>
        <h2>Total: ₹ {total.toFixed(2)}</h2>

        <div className={styles.summaryButtons}>
          <button
            onClick={() => dispatch(clearCart())}
            className={styles.clearBtn}
          >
            Clear Cart
          </button>

          <button
            className={styles.checkoutBtn}
            onClick={() => {
              if (items.length === 0) {
                alert("Cart is empty!");
                return;
              }
              // dispatch(clearCart()); //  dispatch action
              navigate("/order");
            }}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
