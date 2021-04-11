const CHANGE_TO_PAGE = 'CHANGE_TO_PAGE'
const REQUEST_SEARCH_VIDEO = 'REQUEST_SEARCH_VIDEO'
const REQUEST_LODA_DATA = 'REQUEST_LODA_DATA'
const LOAD_DATA = 'LOAD_DATA'
const CLEAR_DATA = 'CLEAR_DATA'

const changeToPage = ({page}) => ({
  type: CHANGE_TO_PAGE,
  payload: {
    page
  }
})

const requestSearchVideo = ({
  keyword,
  page,
  pageToken,
  ...queryParams
}) => ({
  type: REQUEST_SEARCH_VIDEO,
  payload: {
    keyword,
    page,
    pageToken,
    ...queryParams
  }
})


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

const clearData = () => ({
  type: CLEAR_DATA,
  payload: {}
})

export {
  CHANGE_TO_PAGE,
  REQUEST_SEARCH_VIDEO,
  REQUEST_LODA_DATA,
  LOAD_DATA,
  CLEAR_DATA,
  changeToPage,
  requestSearchVideo,
  requestLoadData,
  loadData,
  clearData
}
