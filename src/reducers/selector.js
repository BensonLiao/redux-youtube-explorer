// Videos of search result
export const getVideoListIsFetching = state => state.videoListReducer.isFetching
export const getKeyword = state => state.videoListReducer.keyword
export const getCurrentPage = state => state.videoListReducer.currentPage
export const getVideoListByPage = (state, page) =>
  state.videoListReducer.pageItems[page]
export const getVideoListAll = state => state.videoListReducer.pageItems
export const getVideoListPageInfo = state => state.videoListReducer.pageInfo
