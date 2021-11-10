import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText } from "../actions";
import styles from "./SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const allDogs = useSelector((state) => state.allDogs);

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
   
  }
  function handleSubmit(e) {
    e.preventDefault();
    const validate = allDogs.filter((el) =>
      el.name.toLowerCase().includes(name.toLowerCase())
    );
    if (validate.length < 1) {
      setName("");
      return alert("Inexistent Breed");
    } else {
      dispatch(setSearchText(name));
    }
    setName("");
  }

  return (
    <div>
      <input
        className={styles.nameInput}
        type="text"
        value={name}
        placeholder="Search dog by name..."
        onChange={(e) => handleInputChange(e)}
      />
      <button
        className={styles.btn}
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        Go!
      </button>
    </div>
  );
}
