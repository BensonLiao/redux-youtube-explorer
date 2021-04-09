import { connect } from 'react-redux'
import { getVideoList } from '../reducers/selector'
import VideoGridList from '../components/VideoGridList'

const mapStateToProps = (state) => {
  return {
    items: getVideoList(state)
  }
}

export default connect(
  mapStateToProps
)(VideoGridList)
