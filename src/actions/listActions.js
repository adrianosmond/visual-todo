export function loadList (list) {
  return {
    type: 'LOAD_LIST',
    list
  }
}

export function add (item) {
  return {
    type: 'ADD_ITEM_TO_LIST',
    item
  }
}

export function remove (index) {
  return {
    type: 'REMOVE_ITEM_FROM_LIST',
    index
  }
}

export function moveUp (index) {
  return {
    type: 'MOVE_ITEM_UP',
    index
  }
}

export function moveDown (index) {
  return {
    type: 'MOVE_ITEM_DOWN',
    index
  }
}

export function clear () {
  return {
    type: 'CLEAR_LIST'
  }
}
