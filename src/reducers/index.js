import { combineReducers } from 'redux'
import modules from './modules'
import 'semantic-ui-css/semantic.min.css'

const rootReducer = combineReducers({
  ...modules.reducers
})

export default rootReducer
