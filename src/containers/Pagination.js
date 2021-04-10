import { connect } from 'react-redux'
import { getCurrentPage, getVideoListPageInfo, getVideoListAll } from '../reducers/selector'
import { changeToPage, requestSearchVideo } from '../actions'
import Pagination from '../components/Pagination'

const mapStateToProps = (state) => {
  return {
    ...getVideoListPageInfo(state),
    currentPageNumber: getCurrentPage(state),
    allVideoList: getVideoListAll(state)
  }
}

const mapDispatchToProps = (dispatch) => ({
  searchVideo: (keyword, page, pageToken) => {
    dispatch(changeToPage({page}))
    dispatch(requestSearchVideo({keyword, page, pageToken}))
  },
  changeToPage: (page) =>
    dispatch(changeToPage({page}))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pagination)
