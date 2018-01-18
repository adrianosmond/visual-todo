export function add (id) {
  return {
    type: 'ADD_ITEM',
    id
  }
}

export function remove (id) {
  return {
    type: 'REMOVE_ITEM',
    id
  }
}

export function moveUp (id) {
  return {
    type: 'MOVE_ITEM_UP',
    id
  }
}

export function moveDown (id) {
  return {
    type: 'MOVE_ITEM_DOWN',
    id
  }
}
