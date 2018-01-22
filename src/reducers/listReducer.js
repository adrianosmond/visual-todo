export default function itemsReducer(state = {list: []}, action) {
  let newState = {...state};

  switch (action.type) {
    case 'LOAD_LIST':
      newState.list = action.list;
      return newState;

    case 'ADD_ITEM_TO_LIST':
      newState.list = [...newState.list, action.item];
      return newState;

    case 'REMOVE_ITEM_FROM_LIST':
      const removeIndex = action.index;
      newState.list = [...newState.list.slice(0, removeIndex),
                        ...newState.list.slice(removeIndex + 1)]
      return newState;

    case 'MOVE_ITEM_UP':
      const moveUpIndex = action.index;
      if (moveUpIndex <= 0 || moveUpIndex >= newState.list.length) return newState;

      newState.list = [...newState.list.slice(0, moveUpIndex - 1),
                          newState.list[moveUpIndex],
                          newState.list[moveUpIndex - 1],
                      ...newState.list.slice(moveUpIndex + 1)]
      return newState;

    case 'MOVE_ITEM_DOWN':
      const moveDownIndex = action.index;
      if (moveDownIndex < 0 || moveDownIndex >= newState.list.length - 1) return newState;
      newState.list = [...newState.list.slice(0, moveDownIndex),
                          newState.list[moveDownIndex + 1],
                          newState.list[moveDownIndex],
                      ...newState.list.slice(moveDownIndex + 2)]
      return newState;

    case 'CLEAR_LIST':
      newState.list = []
      return newState;

    default:
      return state;
  }
}
