import React from 'react'
import { View } from 'react-native' // eslint-disable-line
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Icon from 'react-native-vector-icons/MaterialIcons'
import MapView, { Marker } from 'react-native-maps'
import { showLocation } from 'react-native-map-link'
import Colors from '../../Themes/Colors'
import RoundButton from '../RoundButton'

// TODO: display google-maps link in case the map component crashes.
// Use <ErrorBoundary>

const DELTA = 0.003

const Relative = styled.View`
  position: relative;
  margin: 0;
`

const Absolute = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 16px;
`

const Flex = styled.View`
  flex-direction: row;
  flex: 1;
`

const Spacer = styled.View`
  width: 6;
`

const SpotMap = ({ spot, delta }) => {
  // Destructure spot data
  const center = {
    latitude: spot.address.lat,
    longitude: spot.address.lng
  }
  const title = spot.name

  return (
    <Relative>
      <MapView style={{ height: 150 }} initialRegion={{ ...center, ...delta }}>
        <Marker coordinate={center} pinColor={Colors.primaryGreen} />
      </MapView>
      <Absolute>
        <Flex>
          <RoundButton>
            <Icon name='directions' size={24} color={Colors.primaryGreen} />
          </RoundButton>
          <Spacer />
          <RoundButton onPress={() => showLocation({ ...center, title })}>
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
  }).isRequired,
  delta: PropTypes.shape({
    latitudeDelta: PropTypes.number.isRequired,
    longitudeDelta: PropTypes.number.isRequired
  }).isRequired
}

SpotMap.defaultProps = {
  delta: {
    latitudeDelta: DELTA,
    longitudeDelta: DELTA
  }
}

export default SpotMap
