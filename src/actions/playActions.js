export function loadItemsToPlay () {
  return {
    type: 'LOAD_ITEMS_TO_PLAY'
  }
}

export function nextItem () {
  return {
    type: 'NEXT_ITEM'
  }
}

export function prevItem () {
  return {
    type: 'PREV_ITEM'
  }
}

export function overview () {
  return {
    type: 'TOGGLE_OVERVIEW'
  }
}

export function load () {
  return {
    type: 'LIST_LOADED'
  }
}

export function start () {
  return {
    type: 'TOGGLE_OVERVIEW',
    start: true
  }
}
