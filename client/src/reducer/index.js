const initialState = {
  detail: [],
  allDogs: [],
  allTemperaments: [],
  searchText: "",
  sorting: "NameAsc",
  sourceFilter: "All",
  temperamentFilter: "All",
};
function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_DOGS":
      return {
        ...state,
        allDogs: action.payload,
      };

    case "GET_TEMPERAMENTS":
      return {
        ...state,
        allTemperaments: action.payload,
      };

    case "POST_DOG":
      return {
        ...state,
      };

    case "SET_SORTING":
      return {
        ...state,
        sorting: action.payload,
      };
    case "SET_SOURCE_FILTER":
      return {
        ...state,
        sourceFilter: action.payload,
      };
    case "SET_TEMPERAMENT_FILTER":
      return {
        ...state,
        temperamentFilter: action.payload,
      };
    case "SET_SEARCH_TEXT":
      return {
        ...state,
        searchText: action.payload,
      };



    default:
      return state;
  }
}

export default rootReducer;
