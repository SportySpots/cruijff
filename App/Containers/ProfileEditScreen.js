import ProfileEditScreen from '../Components/ProfileEditScreen'

import { connect } from 'react-redux'

const dispatchToProps = dispatch => ({})

const mapStateToProps = state => ({
  facebook: state.facebook
})

export default connect(mapStateToProps, dispatchToProps)(ProfileEditScreen)
