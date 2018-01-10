import React from 'react'

import AskLocation from '../../Components/AskLocation'
import FieldBackground from '../../Components/FieldBackground'
import locationAction from '../../Redux/LocationRedux'
import { connect } from 'react-redux'

const _AskLocation = props =>
  <FieldBackground>
    <AskLocation onAllow={props.getLocationPermission} onCancel={props.locationDenied} />
  </FieldBackground>

const dispatchToProps = (dispatch) => ({
  getLocationPermission: () => dispatch(locationAction.getLocationPermission()),
  locationDenied: () => dispatch(locationAction.locationDenied())
})

export default connect(null, dispatchToProps)(_AskLocation)
