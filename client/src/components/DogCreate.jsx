import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postDog, getTemperaments } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";


function validate(input){
    let errors = {};
    if (!input.name) {errors.name ="Name is required"}
    else if (!input.weight) {errors.weight="Weight is required"}
    else if (!input.height) {errors.height="Height is required"}
    else if (!input.life_span) {errors.life_span="Life span is required"}
return errors;
}



export default function DogCreate() {
  const dispatch = useDispatch();
  const history = useHistory()
  const temps = useSelector((state) => state.allTemperaments);
  const [errors,setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    weight: "",
    height: "",
    life_span: "",
    temperaments: [],
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(validate({
        ...input,
        [e.target.name]: e.target.value
    }))
  }

  function handleSelect(e) {
    setInput({
      ...input,
      temperaments: [...input.temperaments, e.target.value],
    });
  }

  function handleSubmit(e){
      e.preventDefault();
    console.log(input)
    dispatch(postDog(input))
    alert("Breed created succesfuly")
    setInput({
        name: "",
        weight: "",
        height: "",
        life_span: "",
        temperaments: []
    })
    history.push('/home')

  }

  function handleDelete(el){
      setInput({
          ...input,
          temperaments: input.temperaments.filter(temps => temps !== el)
      })
  }

  useEffect(() => {
    dispatch(getTemperaments());
  }, []);

  return (
    <div>
      <Link to="/home">
        <button>Home</button>
      </Link>
      <h1>Create your own breed!</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e)=>handleChange(e)}
            />
          {errors.name &&(
              <p>{errors.name}</p>
              )}
        </div>
        <div>
          <lable>Weight:</lable>
          <input
            type="text"
            value={input.weight}
            name="weight"
            onChange={(e)=>handleChange(e)}
          />
          {errors.weight &&(
              <p>{errors.weight}</p>
          )}
        </div>
        <div>
          <lable>Height:</lable>
          <input
            type="text"
            value={input.height}
            name="height"
            onChange={(e)=>handleChange(e)}
          />
          {errors.height &&(
              <p>{errors.height}</p>
          )}
        </div>
        <div>
          <lable>Life span:</lable>
          <input
            type="number"
            value={input.life_span}
            name="life_span"
            onChange={(e)=>handleChange(e)}
          />
          {errors.life_span &&(
              <p>{errors.life_span}</p>
          )}
        </div>
        <div>
          <lable>Image:</lable>
          <input
            type="text"
            value={input.image}
            name="image"
            onChange={(e)=>handleChange(e)}
          />
        </div>
        <select onChange={(e) => handleSelect(e)} >
          {temps.map((el) => (
            <option value={el.name}>{el.name}</option>
          ))}
        </select>
        <ul><li>{input.temperaments.map}</li></ul>
        <button type="submit"> Create breed</button>
      </form>
      {input.temperaments.map(el =>
        <div>
            <p>{el}</p>
            <button onClick={()=> handleDelete(el)}>x</button>
        </div>    )}
    </div>
  );
}
