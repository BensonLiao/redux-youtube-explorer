import produce from 'immer'
import { combineReducers } from 'redux'
import { REQUEST_LODA_DATA, LOAD_DATA } from '../actions'

const loadVideos = (draft, action) => {
  const {
    type,
    payload: { items }
  } = action
  draft.items = items
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

const allVideos = produce((draft, action) => {
  switch (action.type) {
    case REQUEST_LODA_DATA:
    case LOAD_DATA:
      loadVideos(draft, action)
      break
    default:
  }
}, { items: [], isFetching: false })

const videoListReducer = combineReducers({
  allVideos
})

export default videoListReducer
