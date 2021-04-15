import produce from 'immer'
import { combineReducers } from 'redux'
import {
  CHANGE_TO_PAGE,
  REQUEST_LODA_DATA,
  LOAD_DATA,
  CLEAR_DATA,
} from '../actions'

const loadVideos = (draft, action) => {
  const {
    type,
    payload: { page, items },
  } = action
  draft.pageItems[page] = items
  draft.currentPage = page
  switch (type) {
    case REQUEST_LODA_DATA:
      draft.isFetching = true
      break
    case LOAD_DATA:
      draft.isFetching = false
      break
    default:
  }
}

const allVideos = produce(
  (draft, action) => {
    switch (action.type) {
      case CLEAR_DATA:
        draft = action.payload
        break
      case CHANGE_TO_PAGE:
        const {
          payload: { page },
        } = action
        draft.currentPage = page
        break
      case REQUEST_LODA_DATA:
      case LOAD_DATA:
        loadVideos(draft, action)
        break
      default:
    }
  },
  { pageItems: { 0: [] }, currentPage: 0, isFetching: false }
)

const pageInfo = produce(
  (draft, action) => {
    switch (action.type) {
      case CLEAR_DATA:
        draft = action.payload
        break
      case LOAD_DATA:
        const {
          payload: { nextPageToken, prevPageToken, pageInfo },
        } = action
        draft.nextPageToken = nextPageToken
        draft.prevPageToken = prevPageToken
        draft.pageInfo = pageInfo
        break
      default:
    }
  },
  { nextPageToken: null, prevPageToken: null, pageInfo: {} }
)

const videoListReducer = combineReducers({
  allVideos,
  pageInfo,
})

export default videoListReducer
