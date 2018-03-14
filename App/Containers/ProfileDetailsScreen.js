import ProfileDetailsScreen from '../Components/ProfileDetailsScreen'
import userActions from '../Redux/UserRedux'

import { connect } from 'react-redux'

const dispatchToProps = {
  login: userActions.login,
  logout: userActions.logout
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, dispatchToProps)(ProfileDetailsScreen)
