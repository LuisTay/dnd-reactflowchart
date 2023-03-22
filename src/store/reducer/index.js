import { combineReducers } from 'redux'

// Global Reducers
import selectionReducer from './selectionReducer'

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer () {
  const rootReducer = combineReducers({
    selection: selectionReducer
  })

  return rootReducer
}
