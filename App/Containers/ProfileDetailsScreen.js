import ProfileDetailsScreen from '../Components/ProfileDetailsScreen'
import FB from '../Redux/FacebookRedux'

import { connect } from 'react-redux'

const dispatchToProps = dispatch => ({
  logout: () => dispatch(FB.facebookLogout())
})

const mapStateToProps = state => ({
  facebook: state.facebook
})

export default connect(mapStateToProps, dispatchToProps)(ProfileDetailsScreen)
