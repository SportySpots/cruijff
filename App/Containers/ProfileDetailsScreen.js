import ProfileDetailsScreen from '../Components/Profile/ProfileDetailsScreen'
import userActions from '../Redux/UserRedux'

import { connect } from 'react-redux'

const dispatchToProps = {
  logout: userActions.logout
}

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, dispatchToProps)(ProfileDetailsScreen)
