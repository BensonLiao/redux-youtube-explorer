import { connect } from 'react-redux'
import { getCurrentPage, getVideoListByPage } from '../reducers/selector'
import VideoGridList from '../components/VideoGridList'

const mapStateToProps = (state) => {
  return {
    items: getVideoListByPage(state, getCurrentPage(state))
  }
}

export default connect(
  mapStateToProps
)(VideoGridList)
