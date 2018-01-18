import { database } from '../lib/db.js';

export default function itemsReducer(state = {items: []}, action) {
  let newState = {...state};

  switch (action.type) {
    case 'ADD_ITEM':
      database.ref(`items/${action.id}`).set({
        name: action.name,
        image: action.image
      });

      const newObj = {
        id: action.id,
        name: action.name,
        image: action.image
      };
      newState.items = [...newState.items, newObj];
      newState.items.sort((a, b) => {
        if (a.id < b.id) {
          return -1;
        } else if (a.id > b.id) {
          return 1;
        } else {
          return 0;
        }
      })
      return newState;

    case 'UPDATE_ITEM':
      database.ref(`items/${action.id}`).set({
        name: action.name,
        image: action.image
      });

      const updateIndex = newState.items.findIndex((item) => item.id === action.id);
      if (updateIndex < 0) {
        return newState;
      }

      const updatedObj = {
        id: action.id,
        name: action.name,
        image: action.image
      };

      newState.items[updateIndex] = updatedObj;
      return newState;

    case 'REMOVE_ITEM':
      console.log(`REMOVE items/${action.id}`)
      database.ref(`items/${action.id}`).set(null);

      const removeIndex = newState.items.findIndex((item) => item.id === action.id);
      if (removeIndex < 0) {
        return newState;
      }

      newState.items = [...newState.items.slice(0, removeIndex),
                        ...newState.items.slice(removeIndex + 1)];

      return newState;

    case 'LOAD_ITEMS':
      newState.items = action.items;
      return newState;

    default:
      return state;
  }
}
