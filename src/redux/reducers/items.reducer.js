const itemsReducer = (state = {recentItems: [], containerItems: [], currentItem: {} }, action) => {
  switch (action.type) {
    case 'SET_RECENT_ITEMS':
      return {...state, recentItems: action.payload};
    case 'SET_CONTAINER_ITEMS':
      return {...state, containerItems: action.payload};
    case 'SET_CURRENT_ITEM':
      return {...state, currentItem: action.payload};
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default itemsReducer;