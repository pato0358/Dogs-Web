//import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDogs,
  getTemperaments,
  setTemperamentFilter,
  setSourceFilter,
  setSorting,
} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import styles from "./Home.module.css";

const comparators = {
  nameAsc: (a, b) => a.name.localeCompare(b.name),
  nameDesc: (a, b) => b.name.localeCompare(a.name),
  weightAsc: (a, b) => getWeight(a) - getWeight(b),
  weightDesc: (a, b) => getWeight(b) - getWeight(a),
};

function getWeight(dog) {
  const w = dog.weight.split(" - ")[0];
  return w > 0 ? w : 0;
}

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.allDogs);
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8);
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const temps = useSelector((state) => state.allTemperaments);
  const sorting = useSelector((state) => state.sorting);
  const sourceFilter = useSelector((state) => state.sourceFilter);
  const temperamentFilter = useSelector((state) => state.temperamentFilter);
  const searchText = useSelector((state) => state.searchText);

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  
  function handleTemperamentFilter(e) {
    dispatch(setTemperamentFilter(e.target.value));
  }
  function handleSort(e) {
    e.preventDefault();
    dispatch(setSorting(e.target.value));
    setCurrentPage(1);
  }

  function handleSourceFilter(e) {
    dispatch(setSourceFilter(e.target.value));
  }
  const currentDogs = allDogs
    .filter(
      (dog) =>
        sourceFilter === "All" ||
        !!dog.createdInDb === (sourceFilter === "Created")
    )
    .filter(
      (dog) =>
        temperamentFilter === "All" ||
        dog.temperaments?.includes(temperamentFilter)
    )
    .filter((dog) => dog.name.toLowerCase().includes(searchText.toLowerCase()))

    .sort(comparators[sorting]);

  const dogsRendered = currentDogs.slice(indexOfFirstDog, indexOfLastDog);

  return (
    <div>
      <Link className={styles.link} to="/dog">
        <button className={styles.createBreed}>Create Breed</button>
      </Link>
      <Link className={styles.link} to="/home">
      <img className={styles.gify}
        src="https://i.pinimg.com/originals/f6/42/ee/f642eea95a8d6676dbfa530fe56b5ade.gif"
        alt="funny GIF"
        width="7%"
      />
      <div className={styles.title}> 
      <h1>Doggies Web</h1>
      </div>
      </Link>
      <div>{<SearchBar />}</div>
      <div>
      <div>
      <h3 className={styles.filterName}>Sort by:</h3>
        <select className={styles.select} onChange={(e) => handleSort(e)}>
          <option value="nameAsc">Ascending name</option>
          <option value="nameDesc">Descending name</option>
          <option value="weightAsc">Ascending weight </option>
          <option value="weightDesc">Descending weight</option>
        </select>
        </div>
        <div> 
          <h3 className={styles.filterName}>Filter by procedence:</h3>
        <select className={styles.select} onChange={(e) => handleSourceFilter(e)}>
          <option value="All">All</option>
          <option value="Created">Created</option>
          <option value="Api">Existing</option>
        </select>
        </div>
        <div > 
        <h3 className={styles.filterName}>Filter by temperament:</h3>
        <select className={styles.select} onChange={(e) => handleTemperamentFilter(e)}>
          {temps.length > 0 ? (
            [
              <option key="All" value="All">All</option>,
              ...temps?.map((el) => {
                return <option key={el.name} value={el.name}>{el.name}</option>;
              }),
            ]
          ) : (
            <option> Cargando </option>
          )}
        </select>
        </div> 

        <div className={styles.cardsContainer}>
          {dogsRendered?.map((el) => (
            <div key={el.id}>
                 <Card
                  name={el.name}
                  temperaments={
                    !el.createdInDb
                      ? el.temperaments?.join(", ")
                      : el.temperaments?.map((e) => e.name).join(", ")
                  }
                  weight={el.weight}
                  image={el.image}
                  id={el.id}
                  key={el.id}
                />
              
            </div>
          ))}
        </div>
        <Paginado
          dogsPerPage={dogsPerPage}
          allDogs={currentDogs.length}
          paginado={paginado}
        />
      </div>
    </div>
  );
}
