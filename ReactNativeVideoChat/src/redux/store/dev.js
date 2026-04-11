import { createStore, applyMiddleware, compose } from 'redux'
import { thunk } from 'redux-thunk'
import appReducer from '../reducers'

// instantiate logger middleware

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose

const configureStore = () =>
  createStore(
    appReducer,
    composeEnhancers(applyMiddleware(thunk)),
    // composeEnhancers(applyMiddleware(thunk, middleware)),
  )

export default configureStore
