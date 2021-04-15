import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import {
  loadState,
  loadStateInKeys,
  saveState,
  clearState,
} from './localStorage'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers'
import rootSaga from './sagas'
import {
  getVideoListAll,
  getCurrentPage,
  getKeyword,
  getVideoListPageInfo,
} from './reducers/selector'
import { clearPageData } from './actions'
import { MAX_STORAGE_PAGES } from './constants'

const observeStore = (store, selector, onChange) => {
  let currentState

  function handleChange() {
    let nextState = selector(store.getState())
    if (nextState !== currentState) {
      currentState = nextState
      onChange(currentState)
    }
  }

  let unsubscribe = store.subscribe(handleChange)
  return unsubscribe
}

const configureStore = () => {
  // With localStorage, the state will persisted after refreshing the web page.
  const persistedState = rootReducer({}, {})
  persistedState.videoListReducer = {
    ...persistedState.videoListReducer,
    ...loadState({ exceptKeys: /\d/, withKey: true }),
    pageItems: loadStateInKeys({ keys: /\d/, withKey: true }),
  }
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    rootReducer,
    persistedState,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  )
  const persistedPageQueue = Object.keys(getVideoListAll(store.getState()))

  // In case of performance issue, because subscribe() calls
  // every time the state has change and saveState() use JOSN.stringify() which
  // is a expensive operation.
  // So using lodash/throttle to make sure only 1 function calling per second.
  // store.subscribe(
  //   throttle(() => {
  //     // Save all the state to localStorage.
  //     // saveState(store.getState())
  //     // Save only data state like `todos` but not ui state like `visibilityFilter`.
  //     saveState({
  //       state: {
  //         videoListReducer: store.getState().videoListReducer
  //       }
  //     })
  //   }, '1000')
  // )

  // Run the saga
  sagaMiddleware.run(rootSaga)

  observeStore(store, getVideoListAll, state => {
    const allState = store.getState()
    const page = getCurrentPage(allState)
    const pageData = state[page]
    if (persistedPageQueue.length >= MAX_STORAGE_PAGES) {
      const clearPage = persistedPageQueue.shift()
      store.dispatch(clearPageData(clearPage))
      clearState(clearPage)
    }
    if (pageData) {
      saveState({
        key: page,
        state: pageData,
      })
      persistedPageQueue.push(page)
    }
  })

  observeStore(store, getCurrentPage, state => {
    if (state) {
      saveState({
        key: 'currentPage',
        state,
      })
    }
  })

  observeStore(store, getKeyword, state => {
    if (state) {
      saveState({
        key: 'keyword',
        state,
      })
    }
  })

  observeStore(store, getVideoListPageInfo, state => {
    if (state) {
      saveState({
        key: 'pageInfo',
        state,
      })
    }
  })

  return store
}

export default configureStore
