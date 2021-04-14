import produce from 'immer'
import { combineReducers } from 'redux'
import {
  CHANGE_TO_PAGE,
  REQUEST_SEARCH_VIDEO,
  REQUEST_LODA_DATA,
  LOAD_DATA,
  CLEAR_PAGE_DATA
} from '../actions'

const pageItems = produce((draft, action) => {
  switch (action.type) {
    case CLEAR_PAGE_DATA:
      delete draft[action.payload.page]
      break
    case REQUEST_LODA_DATA:
    case LOAD_DATA:
      const {
        payload: { page, items }
      } = action
      draft[page] = items
      break
    default:
  }
}, {})

const currentPage = (state = 0, action) => {
  switch (action.type) {
    case CHANGE_TO_PAGE:
    case LOAD_DATA:
      const {
        payload: { page }
      } = action
      return page
    default:
      return state
  }
}

const keyword = (state = null, action) => {
  switch (action.type) {
    case LOAD_DATA:
      const {
        payload: { keyword }
      } = action
      return keyword
    default:
      return state
  }
}

const isFetching = (state = false, action) => {
  switch (action.type) {
    case REQUEST_SEARCH_VIDEO:
      return true
    case LOAD_DATA:
      return false
    default:
      return state
  }
}

const pageInfo = produce((draft, action) => {
  switch (action.type) {
    case LOAD_DATA:
      const {
        payload: { nextPageToken, prevPageToken, pageInfo }
      } = action
      draft.nextPageToken = nextPageToken
      draft.prevPageToken = prevPageToken
      draft.pageInfo = pageInfo
      break
    default:
  }
}, { nextPageToken: null, prevPageToken: null, pageInfo: {} })

const videoListReducer = combineReducers({
  pageItems,
  currentPage,
  keyword,
  isFetching,
  pageInfo
})

export default videoListReducer
