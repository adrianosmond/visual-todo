export default function listReducer(state = {
  loaded: false,
  started: false,
  showingOverview: true,
  complete: false,
  currentItem: 0,
  items: [{
    name: "Apple",
    image: "https://staticdelivery.nexusmods.com/mods/110/images/74627-0-1459502036.jpg"
  },{
    name: "Apple",
    image: "https://staticdelivery.nexusmods.com/mods/110/images/74627-0-1459502036.jpg"
  },{
    name: "Apple",
    image: "https://staticdelivery.nexusmods.com/mods/110/images/74627-0-1459502036.jpg"
  }]
}, action) {
  switch (action.type) {
    case 'LIST_LOADED':
      return {...state, loaded: true};
    case 'TOGGLE_OVERVIEW':
      if (action.start) {
        return {...state, showingOverview: !state.showingOverview, started: true};
      } else {
        return {...state, showingOverview: !state.showingOverview};
      }
    case 'NEXT_ITEM':
      if (state.currentItem < state.items.length - 1) {
        return {...state, currentItem: state.currentItem + 1, started: true};
      } else if (state.currentItem === state.items.length - 1) {
        return {...state, currentItem: state.currentItem + 1, complete: true, started: true};
      } else {
        return state;
      }
    case 'PREV_ITEM':
      if (state.currentItem > 0) {
        return {...state, currentItem: state.currentItem - 1, complete: false};
      } else if (state.currentItem === 0) {
        return {...state, currentItem: 0, started: false, complete: false, showingOverview: true};
      } else {
        return state;
      }
    default:
      return state;
  }
}
