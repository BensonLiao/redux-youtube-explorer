// Videos of search result
export const getVideoListIsFetching = state =>
  state.videoListReducer.allVideos.isFetching
export const getVideoList = state => state.videoListReducer.allVideos.items
