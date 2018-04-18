import { connect } from 'react-redux'
import Signup from '../Components/Signup'
import userActions from '../Redux/UserRedux'

const dispatchToProps = {
  signupRequest: userActions.signupRequest
}

const mapStateToProps = state => ({ signup: state.signup, user: state.user })

export default connect(mapStateToProps, dispatchToProps)(Signup)
