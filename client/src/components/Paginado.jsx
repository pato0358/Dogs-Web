import React from "react";
import styles from "./Paginado.module.css"

export default function Paginado({ dogsPerPage, allDogs, paginado }) {
  const pageNumbers = [];


  for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.navstyle}>
      <ul>
        {pageNumbers &&
          pageNumbers.map((number) => (
            <div key={number} className={styles.styledli}>
              <button onClick={() => paginado(number)}>{number}</button>
            </div>
          ))}
      </ul>
    </div>
  );
}
