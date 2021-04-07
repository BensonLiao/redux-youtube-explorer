// Videos of search result
export const getReactionIsFetching = state =>
  state.reactReducer.allIds.isFetching
export const getReactionIds = state => state.reactReducer.allIds.items
export const getReactions = state => state.reactReducer.byId
