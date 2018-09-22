import { combineReducers } from 'redux'
import modules from './modules'

/* import fuelSavings from './fuelSavingsReducer'; */

const rootReducer = combineReducers({
  ...modules.reducers
});

export default rootReducer;
