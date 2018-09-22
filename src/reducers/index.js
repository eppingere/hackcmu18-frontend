import { combineReducers } from 'redux';
import fuelSavings from './fuelSavingsReducer';
import 'semantic-ui-css/semantic.min.css';

const rootReducer = combineReducers({
  fuelSavings,
});

export default rootReducer;
