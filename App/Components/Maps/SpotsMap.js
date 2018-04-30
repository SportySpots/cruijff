import React from 'react'
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
  Dimensions,
  StyleSheet
} from 'react-native'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Icon from 'react-native-vector-icons/MaterialIcons'
import MapView, { Marker } from 'react-native-maps'
import { showLocation } from 'react-native-map-link'
import Swiper from 'react-native-swiper'
import Colors from '../../Themes/Colors'
import Text from '../Text'
import RoundButton from '../RoundButton'
import { cardList } from '../Spots/Styles/CardStyles'
import CardSmall from '../Spots/SpotMapCardSmall'

// TODO: display google-maps link in case the map component crashes.
// Use <ErrorBoundary>

const { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 50 // 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

const Relative = styled.View`
  position: relative;
  margin: 0;
`

const Absolute = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`

const Flex = styled.View`
  flex-direction: row;
  flex: 1;
`

const Spacer = styled.View`
  width: 6;
`

const CardContainer = ({ onPress, ...rest }) => (
  <TouchableOpacity onPress={onPress} style={cardList.cardContainer}>
    <CardSmall {...rest} />
  </TouchableOpacity>
)

class SpotsMap extends React.PureComponent {
  state = {
    center: {
      latitude: this.props.spots[0].address.lat,
      longitude: this.props.spots[0].address.lng
    },
    delta: {
      latitudeDelta: this.props.delta.latitudeDelta,
      longitudeDelta: this.props.delta.latitudeDelta
    },
    currentSpot: 0 // index
  }

  // Fires every time a card is swiped. The new index is passed as the argument
  handleIndexChange = index => {
    // Get spot associated to the new index
    const spot = this.props.spots[index]
    // Get spot location
    const { address: { lat, lng } } = spot
    // Center map on the spot
    const center = { latitude: lat, longitude: lng }
    this.setState({ currentSpot: index, center })
  }

  // Fires every time the map stops panning
  handleRegionChange = region => {
    this.setState(region)
  }

  // Fires every time a marker is clicked in order to swipe the the card
  // associated to said marked into the view port
  handleMarkerPess = index => {
    // Calculate the offset between the index of the current spot and the new one
    const offset = index - this.state.currentSpot
    // Get spot associated to the new index
    const spot = this.props.spots[index]
    // Get spot location
    const { address: { lat, lng } } = spot
    // Center map on the spot
    const center = { latitude: lat, longitude: lng }
    // Make sure the card is swiped after the currentSpot is updated (otherwise
    // we'll have an infinite loop!)
    this.setState(({ currentSpot: index, center }) => {
      this.refs.swiper.scrollBy(offset, true)
    })
  }

  render () {
    const { navigation, spots } = this.props
    const { center, delta, currentSpot } = this.state

    return (
      <Relative style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          region={{ ...center, ...delta }}
          moveOnMarkerPress={false}
          onRegionChangeComplete={this.handleRegionChange}
        >
          {spots.map(({ uuid, address, name }, index) => {
            const center = { latitude: address.lat, longitude: address.lng }
            return (
              <Marker
                key={name}
                tracksViewChanges={false}
                coordinate={center}
                pinColor={
                  currentSpot === index ? Colors.primaryGreen : Colors.black
                }
                onPress={() => {
                  this.handleMarkerPess(index)
                }}
              />
            )
          })}
        </MapView>
        <Absolute>
          <Swiper
            ref='swiper'
            loop={false}
            bounces
            showsPagination={false}
            containerStyle={{ height: 80 }}
            index={currentSpot}
            onIndexChanged={this.handleIndexChange}
          >
            {spots.map(spot => (
              <CardContainer
                key={spot.uuid}
                spot={spot}
                onPress={() =>
                  navigation.navigate('SpotDetailsScreen', {
                    uuid: spot.uuid
                  })
                }
              />
            ))}
          </Swiper>
        </Absolute>
      </Relative>
    )
  }
}

SpotsMap.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired,
  // TODO: use fragment instead!
  spots: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      address: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired
      }).isRequired
    }).isRequired
  ),
  delta: PropTypes.shape({
    latitudeDelta: PropTypes.number.isRequired,
    longitudeDelta: PropTypes.number.isRequired
  }).isRequired
}

SpotsMap.defaultProps = {
  spots: [],
  delta: {
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  }
}

export default SpotsMap
