import React from "react";
import styles from "./Customer.module.css";

const testimonials = [
  {
    id: 1,
    text: "Amazing products! Fast shipping and great customer service.",
    name: "Rajesh Singh",
  },
  {
    id: 2,
    text: "I love shopping here. The prices are unbeatable.",
    name: "Vikash Pandey",
  },
  {
    id: 3,
    text: "Fantastic quality. Will definitely buy again.",
    name: "Santosh Jha",
  },
  {
    id: 4,
    text: "Great variety and easy to use website. Highly recommend!",
    name: "Amit Chauhan",
  },
];

const Customer = () => {
  return (
    <section className={styles.container}>
      <h2 className={styles.heading}>Customer Testimonials</h2>

      <div className={styles.cardWrapper}>
        {testimonials.map((item) => (
          <div key={item.id} className={styles.card}>
            <p className={styles.text}>"{item.text}"</p>
            <h4 className={styles.name}>- {item.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Customer;
