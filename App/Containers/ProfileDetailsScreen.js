import ProfileDetailsScreen from '../Components/ProfileDetailsScreen'

import { connect } from 'react-redux'

const dispatchToProps = dispatch => ({})

const mapStateToProps = state => ({
  facebook: state.facebook
})

export default connect(mapStateToProps, dispatchToProps)(ProfileDetailsScreen)
