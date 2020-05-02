import rootReducer from './rootReducer'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

export default (initialState = {}) => {
  const middleware = [thunk]

  if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger({
      timestamp: true,
      duration: true,
      diff: true,
      collapsed: true
    }))
  }

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
  )

  return store
}
