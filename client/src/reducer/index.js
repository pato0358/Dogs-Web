const initialState = {
  detail: [],
  dogs: [],
  allDogs: [],
  allTemperaments: [],
};
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_DOGS":
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
      };

    case "GET_DOGS_NAME":
      return {
        ...state,
        dogs: action.payload,
      };

    case "GET_TEMPERAMENTS":
      return {
        ...state,
        allTemperaments: action.payload,
      };

    case "FILTER_BY_TEMPERAMENT":
      // console.log("entre")
      // console.log(action.payload)
      const allDogs1 = state.allDogs;
      console.log(allDogs1);
      const temperamentFiltered = allDogs1.filter((el) =>
        el.temperaments?.includes(action.payload)
      );
      return {
        ...state,
        dogs: temperamentFiltered,
      };

    case "ORDER_BY_NAME":
      let sortedArr =
        action.payload === "asc"
          ? state.dogs.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.dogs.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        allDogs: sortedArr,
      };

    case "POST_DOG":
      return {
        ...state,
      };

    case "FILTER_CREATED":
      const createdFilter =
        action.payload === "Created"
          ? state.allDogs.filter((el) => el.createdInDb)
          : state.allDogs.filter((el) => !el.createdInDb);
          console.log(createdFilter)
      return {
        ...state,
        dogs: action.payload === "All" ? state.dogs : createdFilter,
      };

    case "GET_DETAILS":
      return {
        ...state,
        detail: action.payload,
      };

    default:
      return state;
  }
}

export default rootReducer;
