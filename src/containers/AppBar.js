import { connect } from 'react-redux'
import { requestSearchVideo } from '../actions'
import AppBar from '../components/AppBar'

const mapDispatchToProps = (dispatch) => ({
  searchVideo: keyword => dispatch(requestSearchVideo({
    keyword,
    page: 1
  }))
})

export default connect(
  null,
  mapDispatchToProps
)(AppBar)
