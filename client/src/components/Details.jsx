import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDogs } from "../actions";
import styles from "./Details.module.css";

export default function Details(props) {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.allDogs);
  // eslint-disable-next-line eqeqeq
  const myDog = allDogs.find((dog) => dog.id == props.match.params.id);

  useEffect(() => {
    if (allDogs.length === 0) dispatch(getDogs());
  }, [dispatch, allDogs.length]);

  return (
    <div>
      <Link className={styles.link} to="/home">
        <img
          className={styles.gify}
          src="https://i.pinimg.com/originals/f6/42/ee/f642eea95a8d6676dbfa530fe56b5ade.gif"
          alt="funny GIF"
          width="7%"
        />
        <div className={styles.title1}>
          <h1>Doggies Web</h1>
        </div>
        <button className={styles.homeBtn}>Home</button>
      </Link>
      {myDog ? (
        <div className={styles.container}>
          <h1 className={styles.name}>{myDog.name}</h1>
          <img className={styles.img} src={myDog.image} alt="" />
          <div className={styles.description}>
            <h3>
              Temperaments:{" "}
              {!myDog.createdInDb
                ? myDog.temperaments?.join(", ")
                : myDog.temperaments?.map((e) => e.name).join(", ")}
            </h3>
            <h3>Weight: {myDog.weight}</h3>
            <h3>Height: {myDog.height}</h3>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
