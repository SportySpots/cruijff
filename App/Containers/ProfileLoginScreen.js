import ProfileLoginScreen from '../Components/ProfileLoginScreen'
import facebookAction from '../Redux/FacebookRedux'

import { connect } from 'react-redux'

const dispatchToProps = dispatch => ({
  facebookLogin: () => dispatch(facebookAction.facebookLogin())
})

const mapStateToProps = state => ({})

export default connect(mapStateToProps, dispatchToProps)(ProfileLoginScreen)
