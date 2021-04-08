import { connect } from 'react-redux'
import { getVideoList } from '../reducers/selector'
import VideoListGrid from '../components/VideoListGrid'

const mapStateToProps = (state) => {
  return {
    items: getVideoList(state)
  }
}

export default connect(
  mapStateToProps
)(VideoListGrid)
