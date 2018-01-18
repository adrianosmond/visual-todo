import { combineReducers } from 'redux';
import playReducer from './playReducer';
import listReducer from './listReducer';
import itemsReducer from './itemsReducer';

export default combineReducers({
  playList: playReducer,
  manageList: listReducer,
  allItems: itemsReducer
});
