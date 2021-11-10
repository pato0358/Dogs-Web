import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css"

export default function LandingPage() {
  return (
    <div>
      <h1 className={styles.title}>Welcome to the Doggies Web</h1>
      <img className={styles.gify}
        src="https://i.pinimg.com/originals/f6/42/ee/f642eea95a8d6676dbfa530fe56b5ade.gif"
        alt="funny GIF"
        width="30%"
      />
      <Link to="/home">
        <button className={styles.btn}>Get in!</button>
      </Link>
    </div>
  );
}
