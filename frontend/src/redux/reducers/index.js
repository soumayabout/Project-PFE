import { combineReducers } from 'redux';
import sidebarReducer from '../slices/sidebarSlice';

const rootReducer = combineReducers({
  sidebar: sidebarReducer,
});

export default rootReducer;
