import React from 'react'
import {
  View, // eslint-disable-line
  Dimensions
} from 'react-native'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Icon from 'react-native-vector-icons/MaterialIcons'
import MapView, { Marker } from 'react-native-maps'
import { showLocation } from 'react-native-map-link'
import Colors from '../../Themes/Colors'
import RoundButton from '../RoundButton'

// TODO: display google-maps link in case the map component crashes.
// Use <ErrorBoundary>

const { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.003
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

// -----------------------------------------------------------------------------
// STYLE:
// -----------------------------------------------------------------------------
const Relative = styled.View`
  position: relative;
  margin: 0;
`
// -----------------------------------------------------------------------------
const Absolute = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 16px;
`
// -----------------------------------------------------------------------------
const Flex = styled.View`
  flex-direction: row;
  flex: 1;
`
// -----------------------------------------------------------------------------
const Spacer = styled.View`
  width: 6;
`
// -----------------------------------------------------------------------------
// AUX FUNCTIONS:
// -----------------------------------------------------------------------------
const getSpotLocation = spot => ({
  latitude: spot.address.lat,
  longitude: spot.address.lng
})
// -----------------------------------------------------------------------------
// COMPONENT:
// -----------------------------------------------------------------------------
/**
 * @summary Renders map center on the post's location plus two buttons. The first
 * button takes the user to google maps and provides direction to reach the spot.
 * The second button takes the user google maps and shows the location
 */
const SpotMap = ({ spot }) => {
  // Get sport location
  const latLng = getSpotLocation(spot)

  // Define map region centered on the spot
  const region = {
    ...latLng,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  }

  return (
    <Relative>
      <MapView style={{ height: 150 }} initialRegion={region}>
        <Marker coordinate={latLng} pinColor={Colors.primaryGreen} />
      </MapView>
      <Absolute>
        <Flex>
          <RoundButton>
            <Icon name='directions' size={24} color={Colors.primaryGreen} />
          </RoundButton>
          <Spacer />
          <RoundButton
            onPress={() => showLocation({ ...latLng, title: spot.name })}
          >
            <Icon name='map' size={24} color={Colors.primaryGreen} />
          </RoundButton>
        </Flex>
      </Absolute>
    </Relative>
  )
}

SpotMap.propTypes = {
  // TODO: use fragment instead!
  spot: PropTypes.shape({
    name: PropTypes.string.isRequired,
    address: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired
    }).isRequired
  }).isRequired
}

export default SpotMap
