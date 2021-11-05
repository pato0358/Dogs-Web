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
    return answer;
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

// export function getDogsName(payload) {
//   return async function (dispatch) {
//     try {
//       var json = await axios("http://localhost:3001/dogs?name=" + payload);
//       return dispatch({
//         type: "GET_DOGS_NAME",
//         payload: json.data,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
// }



// export function filterDogsByTemperament(payload) {
//   return {
//     type: "FILTER_BY_TEMPERAMENT",
//     payload,
//   };
// }

// export function orderByName(payload) {
//   return {
//     type: "ORDER_BY_NAME",
//     payload,
//   };
// }

// export function filterCreated(payload) {
//   return {
//     type: "FILTER_CREATED",
//     payload,
//   };
// }

// export function getDetail(id) {
//   return async function (dispatch){
//     try{
//       var json = await axios ("http://localhost:3001/dogs/" + id)
//       return dispatch({
//         type:"GET_DETAILS",
//         payload: json.data
//       })
//     } catch(error){
//       console.log(error)
//     } 
//   } 
// }
