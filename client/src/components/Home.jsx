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

const comparators = {
  nameAsc: (a, b) => a.name.localeCompare(b.name),
  nameDesc: (a, b) => b.name.localeCompare(a.name),
  weightAsc: (a, b) =>
    a.weight.split(" - ")[0] - b.weight.split(" - ")[0],
  weightDesc: (a, b) =>
    b.weight.split(" - ")[0] - a.weight.split(" - ")[0],
};

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.allDogs);
  // const [order, setOrder] = useState("");
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
  function handleTemperamentFilter(e) {
    dispatch(setTemperamentFilter(e.target.value));
  }
  function handleSort(e) {
    e.preventDefault();
    dispatch(setSorting(e.target.value));
    setCurrentPage(1);
    // setOrder(`Ordenado ${e.target.value}`);
  }

  function handleSourceFilter(e) {
    dispatch(setSourceFilter(e.target.value));
  }
  const currentDogs = allDogs.filter(
    (dog) =>
      (sourceFilter === "All" ||
        (!!dog.createdInDb === (sourceFilter === "Created"))) &&
      (temperamentFilter === "All" ||
        dog.temperaments?.includes(temperamentFilter))
  ).sort (comparators[sorting]);

  const dogsRendered = currentDogs.slice(indexOfFirstDog, indexOfLastDog)

  return (
    //   console.log(temps),
    <div>
      <Link to="/dog">Crear Raza</Link>
      <h1>YA ESTOY MAMADO DE LOS FUCKING PERROS</h1>
      {/* <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Volver a cargar todos los perros
      </button> */}
      <div>{/* <SearchBar/> */}</div>
      <div>
        <select onChange={(e) => handleSort(e)}>
          <option value="nameAsc">Ascending by name</option>
          <option value="nameDesc">Descending by name</option>
          <option value="weightAsc">Ascending by weight </option>
          <option value="weightDesc">Descending by weight</option>
        </select>
        <select onChange={(e) => handleSourceFilter(e)}>
          <option value="All">All</option>
          <option value="Created">Created</option>
          <option value="Api">From Api</option>
        </select>
        <select onChange={(e) => handleTemperamentFilter(e)}>
          {temps.length > 0 ? (
            [
              <option value="All">All</option>,
              ...temps?.map((el) => {
                return <option value={el.name}>{el.name}</option>;
              }),
            ]
          ) : (
            <option> Cargando </option>
          )}
        </select>

        <Paginado
          dogsPerPage={dogsPerPage}
          allDogs={currentDogs.length}
          paginado={paginado}
        />
        {dogsRendered?.map((el) => (
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
