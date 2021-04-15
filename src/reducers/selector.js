// Videos of search result
export const getVideoListIsFetching = state =>
  state.videoListReducer.allVideos.isFetching
export const getCurrentPage = state =>
  state.videoListReducer.allVideos.currentPage
export const getVideoListByPage = (state, page) =>
  state.videoListReducer.allVideos.pageItems[page]
export const getVideoListAll = state =>
  state.videoListReducer.allVideos.pageItems
export const getVideoListPageInfo = state => state.videoListReducer.pageInfo
