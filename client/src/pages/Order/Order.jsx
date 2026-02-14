import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectCartTotal,
  clearCart,
} from "../../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import styles from "./Order.module.css";
import axios from "../../api/axiosInstance";

const Order = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    city: "",
    addressLine: "",
  });

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    try {
      if (
        !address.fullName ||
        !address.phone ||
        !address.city ||
        !address.addressLine
      ) {
        alert("Please fill all fields");
        return;
      }

      // await axios.post("/orders", {
      //   items,
      //   total,
      // });
      alert("Order Placed Successfully! 🎉");

      dispatch(clearCart());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <h2>No items to order 🛒</h2>
        <button onClick={() => navigate("/shop")}>Go to Shop</button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1>Order Summary</h1>

      <div className={styles.layout}>
        {/* Order Items */}
        <div className={styles.itemsSection}>
          {items.map((item) => (
            <div key={item.id} className={styles.itemCard}>
              <img src={item.image} alt={item.title} />
              <div>
                <h3>{item.title}</h3>
                <p>₹ {item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            </div>
          ))}

          <h2 className={styles.total}>Total: ₹ {total.toFixed(2)}</h2>
        </div>

        {/* Shipping Form */}
        <div className={styles.formSection}>
          <h2>Shipping Details</h2>
          <form onSubmit={handlePlaceOrder}>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              onChange={handleChange}
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              onChange={handleChange}
              required
            />

            <textarea
              name="addressLine"
              placeholder="Full Address"
              onChange={handleChange}
              required
            />

            <button type="submit" className={styles.placeOrderBtn}>
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Order;
