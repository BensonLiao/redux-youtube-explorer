const CHANGE_TO_PAGE = 'CHANGE_TO_PAGE'

const changeToPage = ({page}) => ({
  type: CHANGE_TO_PAGE,
  payload: {
    page
  }
})

const REQUEST_SEARCH_VIDEO = 'REQUEST_SEARCH_VIDEO'

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
  CHANGE_TO_PAGE,
  changeToPage,
  REQUEST_SEARCH_VIDEO,
  requestSearchVideo,
  REQUEST_LODA_DATA,
  LOAD_DATA,
  requestLoadData,
  loadData
}
