"use client";
import React, { useState } from "react";
import styles from "./newsletter-form.module.css";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  function handleInput(event) {
    setEmail(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (email === "" || !/\S+@\S+\.\S+/.test(email)) {
      setIsEmailValid(false);
    } else {
      setIsEmailValid(true);
      alert(`Thank you for subscribing with ${email}`);
      setEmail("");
    }
  }

  return (
    <div className={styles.container}>
      <h2>Subscribe to get more updates</h2>
      {/* {!isEmailValid ? <p>Please enter a valid email address</p> : null} */}
      <form onSubmit={handleSubmit} className={styles["input-button"]}>
        <input
          type="email"
          placeholder="Enter your email address here"
          value={email}
          onChange={handleInput}
          className={styles.input}
        />
        <button className={styles.button}>Subscribe</button>
      </form>
    </div>
  );
}

export default Newsletter;
