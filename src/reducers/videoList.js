import { combineReducers } from 'redux'
import produce from 'immer'
import { REQUEST_LODA_DATA, LOAD_DATA } from '../actions'

const loadVideoByNormalizr = (draft, action) => {
  const {
    payload: { items }
  } = action
  Object.keys(items).forEach(id => {
    draft[id] = items[id]
  })
}

const videosById = produce((draft, action) => {
  switch (action.type) {
    case LOAD_DATA:
      loadVideoByNormalizr(draft, action)
      break
    default:
  }
}, {})

const loadVideoIdByNormalizr = (draft, action) => {
  const {
    type,
    payload: { items }
  } = action
  // Extract object and append all its react's ID to the list of allIds
  switch (type) {
    case REQUEST_LODA_DATA:
      draft.items = items
      draft.isFetching = true
      break
    case LOAD_DATA:
      Object.keys(items).forEach(id => {
        draft.items.push(id)
      })
      draft.isFetching = false
      break
    default:
  }
}

const allVideos = produce((draft, action) => {
  switch (action.type) {
    case REQUEST_LODA_DATA:
    case LOAD_DATA:
      loadVideoIdByNormalizr(draft, action)
      break
    default:
  }
}, { items: [], isFetching: false })

const videoListReducer = combineReducers({
  byId: videosById,
  allIds: allVideos
})

export default videoListReducer
