const itemsReducer = (state = {recentItems: [], containerItems: []}, action) => {
  switch (action.type) {
    case 'SET_RECENT_ITEMS':
      return {...state, recentItems: action.payload};
    case 'SET_ITEMS':
      return {...state, containerItems: action.payload};
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default itemsReducer;