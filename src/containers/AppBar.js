import { connect } from 'react-redux'
import { getKeyword } from '../reducers/selector'
import { requestSearchVideo } from '../actions'
import AppBar from '../components/AppBar'

const mapStateToProps = (state) => {
  return {
    keyword: getKeyword(state)
  }
}

const mapDispatchToProps = (dispatch) => ({
  searchVideo: keyword => dispatch(requestSearchVideo({
    keyword,
    page: 1
  }))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppBar)
