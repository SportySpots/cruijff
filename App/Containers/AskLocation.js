import locationAction from '../Redux/LocationRedux'

import { connect } from 'react-redux'
import AskLocation from '../Components/AskLocation'

const dispatchToProps = dispatch => ({
  onLocationPermission: status =>
    dispatch(locationAction.locationPermission(status))
})

const mapStateToProps = state => ({})

export default connect(mapStateToProps, dispatchToProps)(AskLocation)
