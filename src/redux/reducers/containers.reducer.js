const containersReducer = (state = { containersList: [], currentContainer: {} }, action) => {
  switch (action.type) {
    case 'SET_CONTAINERS':
      console.log('setting containers')
      return {...state, containersList: action.payload};
    case 'SET_CURRENT_CONTAINER':
      return {...state, currentContainer: action.payload};
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default containersReducer;