//import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDogs,
  getTemperaments,
  filterDogsByTemperament,
  filterCreated,
  orderByName,
} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8);
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const temps = useSelector((state) => state.allTemperaments);
  useEffect(() => {
    dispatch(getTemperaments());
  }, []);

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs());
  }
  function handleFilterByTemperament(e) {
    dispatch(filterDogsByTemperament(e.target.value));
  }
  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }

  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value));
  }

  return (
    //   console.log(temps),
    <div>
      <Link to="/dog">Crear Raza</Link>
      <h1>YA ESTOY MAMADO DE LOS FUCKING PERROS</h1>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Volver a cargar todos los perros
      </button>
      <div>
      <SearchBar/>
      </div>
      <div>
        <select onChange={(e) => handleSort(e)}>
          <option value="asc">Ascending Order</option>
          <option value="desc">Descending Order</option>
        </select>
        <select onChange={(e) => handleFilterCreated(e)}>
          <option value="All">All</option>
          <option value="Created">Created</option>
          <option value="Api">From Api</option>
        </select>
        <select onChange={(e) => handleFilterByTemperament(e)}>
          {temps.length > 0 ? (
            temps?.map((el) => {
              return <option value={el.name}>{el.name}</option>;
            })
          ) : (
            <option> Cargando </option>
          )}
        </select>

        <Paginado
          dogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          paginado={paginado}
        />
        {currentDogs?.map((el) => (
          <div key={el.id}>
            <Link to={"/home/" + el.id}>
              <Card
                name={el.name}
                temperaments={el.temperaments + ", "}
                weight={el.weight}
                image={el.image}
                id={el.id}
                key={el.id}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
