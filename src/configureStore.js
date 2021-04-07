import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers'

const configureStore = preloadedState => {
  const sagaMiddleware = createSagaMiddleware()
  return {
    ...createStore(
      rootReducer,
      preloadedState,
      composeWithDevTools(applyMiddleware(sagaMiddleware))
    ),
    runSaga: sagaMiddleware.run
  }
}

export default configureStore
