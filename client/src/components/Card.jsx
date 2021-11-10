import React from "react";
import styles from "./Card.module.css";
import { Link } from "react-router-dom";


export default function Card({ name, image, temperaments, id }) {
  return (
    <Link className={styles.link} to={"/details/" + id}>
      <div className={styles.card}>
        <h3 className={styles.cardTitle}> {name}</h3>
        <img src={image} alt="img not found" width="200px" height="250px" />
        <p className={styles.cardDesc}>Temperaments: {temperaments}</p>
      </div>
    </Link>
  );
}
