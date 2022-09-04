const itemsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_RECENT_ITEMS':
      return action.payload;
      case 'SET_ITEMS':
        return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default itemsReducer;