import ProfileEditScreen from '../Components/Profile/ProfileEditScreen'

import { connect } from 'react-redux'
import userActions from '../Redux/UserRedux'

const dispatchToProps = {
  logout: userActions.logout
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, dispatchToProps)(ProfileEditScreen)
