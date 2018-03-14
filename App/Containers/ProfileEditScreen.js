import ProfileEditScreen from '../Components/ProfileEditScreen'

import { connect } from 'react-redux'
import userActions from '../Redux/UserRedux'

const dispatchToProps = {
  login: userActions.login,
  logout: userActions.logout
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, dispatchToProps)(ProfileEditScreen)
