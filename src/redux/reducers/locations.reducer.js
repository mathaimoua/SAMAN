const locationsReducer = (state = {main: {}, allLocations: [], currentLocation: {}}, action) => {
  switch (action.type) {
    case "SET_MAIN_LOCATION":
      return {...state, main: action.payload};
    case "SET_ALL_LOCATIONS":
      return {...state, allLocations: action.payload};
    case 'SET_CURRENT_LOCATION':
      return {...state, currentLocation: action.payload};
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default locationsReducer;
