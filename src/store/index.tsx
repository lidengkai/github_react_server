/**
 * @module store
 */
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import AppStore, { APP_STORE } from './app'
import * as reducers from './reducers'

export default createStore(
  combineReducers({
    [APP_STORE]: AppStore,
    ...reducers
  }),
  applyMiddleware(thunk)
)
