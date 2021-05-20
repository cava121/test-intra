import { combineReducers } from 'redux';
import { requestReducer } from './requestReducer';

export const rootReducer = combineReducers({
  requestPage: requestReducer,
});
