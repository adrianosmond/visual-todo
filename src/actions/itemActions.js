export function add (id, name, image) {
  return {
    type: 'ADD_ITEM',
    id,
    name,
    image
  }
}

export function update (id, name, image) {
  return {
    type: 'UPDATE_ITEM',
    id,
    name,
    image
  }
}

export function remove (id) {
  return {
    type: 'REMOVE_ITEM',
    id: id
  }
}

export function loadItems (items) {
  return {
    type: 'LOAD_ITEMS',
    items: items
  }
}
