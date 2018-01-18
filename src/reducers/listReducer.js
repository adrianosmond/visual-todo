export default function itemsReducer(state = {items: []}, action) {
  let newState = {...state};

  switch (action.type) {
    case 'ADD_ITEM':
      return newState;

    case 'REMOVE_ITEM':
      return newState;

    case 'MOVE_ITEM_UP':
      return newState;

    case 'MOVE_ITEM_DOWN':
      return newState;

    default:
      return state;
  }
}
