import { connect } from 'react-redux'
import { getVideoListPageInfo } from '../reducers/selector'
import { requestSearchVideo } from '../actions'
import Pagination from '../components/Pagination'

const mapStateToProps = (state) => {
  return {
    ...getVideoListPageInfo(state)
  }
}

const mapDispatchToProps = (dispatch) => ({
  searchVideo: (keyword, pageToken) =>
    dispatch(requestSearchVideo({keyword, pageToken}))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pagination)
