import axios from "axios";


export function getDogs() {
  return async function (dispatch) {
    const json = await axios("http://localhost:3001/dogs");
    dispatch({
      type: "GET_DOGS",
      payload: json.data,
    });
  };
}


export function getTemperaments() {
  return async function (dispatch) {
    const json = await axios("http://localhost:3001/temperaments/");
    dispatch({
      type: "GET_TEMPERAMENTS",
      payload: json.data,
    });
  };
}

export function postDog (payload){
  return async function (dispatch) {
    const answer = await axios.post("http://localhost:3001/dogs",payload)
    console.log(answer)
    dispatch({
      type: "POST_DOG",
      payload: answer.data
    });
  }
}
export function setSorting(sorting) {
  return{
    type: "SET_SORTING",
    payload: sorting
  }
}

export function setSourceFilter(sourceFilter) {
  return{
    type: "SET_SOURCE_FILTER",
    payload: sourceFilter
  }
}

export function setTemperamentFilter (temperamentFilter) {
  return{
    type: "SET_TEMPERAMENT_FILTER",
    payload: temperamentFilter
  }
}

export function setSearchText (searchText) {
  return{
    type: "SET_SEARCH_TEXT",
    payload: searchText
  }
}

