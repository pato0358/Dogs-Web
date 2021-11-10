import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postDog, getTemperaments } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";
import styles from "./DogCreate.module.css";

export default function DogCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const temps = useSelector((state) => state.allTemperaments);
  

  const [input, setInput] = useState({
    name: "",
    weightMin: "",
    weightMax: "",
    heightMin: "",
    heightMax: "",
    life_span: "",
    image: "",
    temperaments: [],
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSelect(e) {
    setInput({
      ...input,
      temperaments: [...input.temperaments, e.target.value],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    const { name, weightMin, weightMax, heightMin, heightMax, life_span } =
      input;
    if (name === undefined || name.length < 3) {
      return alert("Name is invalid");
    } else if (
      weightMin > weightMax ||
      weightMin === undefined ||
      weightMax === undefined
    ) {
      setInput({
        ...input,
        weightMin: "",
        weightMax: "",
      });
      return alert(
        "Weight is undefined or minimum weight is greater than the maximun weight"
      );
    } else if (
      heightMin > heightMax ||
      heightMin === undefined ||
      heightMax === undefined
    ) {
      setInput({
        ...input,
        heightMin: "",
        heightMax: "",
      });
      return alert(
        "Height is undefined or minimum height is greater than the maximun height"
      );
    } else if (life_span < 1 || life_span > 50) {
      return alert("Life span can't be less than 1 or greater than 50");
    } else {
      input.weight = weightMin + " - " + weightMax;
      input.height = heightMin + " - " + heightMax;
      delete input.weightMin;
      delete input.weightMax;
      delete input.heightMin;
      delete input.heightMax;
    }

    dispatch(postDog(input));
    alert("Breed created succesfuly");
    setInput({
      name: "",
      weightMin: "",
      weightMax: "",
      heightMin: "",
      heightMax: "",
      life_span: "",
      image: "",
      temperaments: [],
    });
    history.push("/home");
  }

  function handleDelete(el) {
    setInput({
      ...input,
      temperaments: input.temperaments.filter((temps) => temps !== el),
    });
  }

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

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

      <div className={styles.container}>
        <h1 className={styles.title}>Create your own breed!</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label className={styles.label}>Name:</label>
            <input
              className={styles.input}
              type="text"
              value={input.name}
              name="name"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label className={styles.label}>Weight:</label>
            <input
              className={styles.input}
              type="number"
              placeholder="Min"
              value={input.weightMin}
              name="weightMin"
              onChange={(e) => handleChange(e)}
            />
            <input
              className={styles.input}
              type="number"
              placeholder="Max"
              value={input.weightMax}
              name="weightMax"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label className={styles.label}>Height:</label>
            <input
              className={styles.input}
              type="number"
              placeholder="Min"
              value={input.heightMin}
              name="heightMin"
              onChange={(e) => handleChange(e)}
            />
            <input
              className={styles.input}
              type="number"
              placeholder="Max"
              value={input.heightMax}
              name="heightMax"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label className={styles.label}>Life span:</label>
            <input
              className={styles.input}
              type="number"
              value={input.life_span}
              name="life_span"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label className={styles.label}>Image:</label>
            <input
              className={styles.input}
              type="text"
              value={input.image}
              name="image"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label className={styles.label}>Temperaments:</label>
            <select className={styles.input} onChange={(e) => handleSelect(e)}>
              Temperaments:
              {temps.map((el) => (
                <option key={el.id} value={el.name}>{el.name}</option>
              ))}
            </select>
          </div>
          
          {input.temperaments.map((el) => (
            <div key={el}>
              <p className={styles.temps}>{el}</p>
              <button
                className={styles.tempBtn}
                onClick={() => handleDelete(el)}
              >
                x
              </button>
            </div>
          ))}
          <button className={styles.homeBtn1} type="submit">
            Create breed
          </button>
        </form>
      </div>
    </div>
  );
}
