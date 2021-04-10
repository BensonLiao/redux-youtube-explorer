import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers'
import rootSaga from './sagas'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

let persistor
const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware()
  let store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  )
  persistor = persistStore(store)
  // Run the saga
  sagaMiddleware.run(rootSaga)

  return { store, persistor }
}

export function getPersistor() {
  return persistor
}

export default configureStore
