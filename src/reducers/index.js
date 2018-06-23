import { combineReducers } from 'redux';
import editor from './editor';

const reducers = { editor };
const rootReducer = combineReducers(reducers);

export default rootReducer;
