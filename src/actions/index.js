const REQUEST_SEARCH_VIDEO = 'REQUEST_SEARCH_VIDEO'

const requestSearchVideo = ({keyword, pageToken, ...queryParams}) => ({
  type: REQUEST_SEARCH_VIDEO,
  payload: {
    keyword,
    pageToken,
    ...queryParams
  }
})


const REQUEST_LODA_DATA = 'REQUEST_LODA_DATA'
const LOAD_DATA = 'LOAD_DATA'

const requestLoadData = () => ({
  type: REQUEST_LODA_DATA,
  payload: {
    items: []
  }
})

const loadData = (result) => ({
  type: LOAD_DATA,
  payload: result
})

export {
  REQUEST_SEARCH_VIDEO,
  requestSearchVideo,
  REQUEST_LODA_DATA,
  LOAD_DATA,
  requestLoadData,
  loadData
}
