import { connect } from 'react-redux'
import { getVideoListPageInfo } from '../reducers/selector'
import Pagination from '../components/Pagination'

const mapStateToProps = (state) => {
  return {
    ...getVideoListPageInfo(state)
  }
}

export default connect(
  mapStateToProps
)(Pagination)
