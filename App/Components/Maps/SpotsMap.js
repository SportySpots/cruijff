import React from 'react'
import {
  TouchableOpacity,
  View, // eslint-disable-line
  Dimensions
} from 'react-native'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import MapView, { Marker } from 'react-native-maps'
import Swiper from 'react-native-swiper'
import Colors from '../../Themes/Colors'
import { cardList } from '../Spots/Styles/CardStyles'
import CardSmall from '../Spots/SpotMapCardSmall'

// TODO: display google-maps link in case the map component crashes.
// Use <ErrorBoundary>

const { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0922
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
  left: 0;
  right: 0;
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
 * @summary Map component displaying a given set of spots plus a swiper component
 * at the bottom showing the spot cards. On render, the map is centered on
 * the 'initialLocation'. The component exposes a onCardPress method.
 */
class SpotsMap extends React.PureComponent {
  state = {
    region: {
      latitude: this.props.spots[0].address.lat,
      longitude: this.props.spots[0].address.lng,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    },
    currentSpot: 0 // index of the current spot based on the spots array
  }

  /**
   * @summary Fires every time a card is swiped. As a result, the map is
   * centered in the spot's location associated to the card.
   * @param {int} index - Index of the card being swiped.
   */
  handleIndexChange = index => {
    // Get spot associated to the new card/index
    const spot = this.props.spots[index]

    const latLng = getSpotLocation(spot)

    // Center map on the spot keeping delta as it is
    this.setState({
      currentSpot: index,
      region: { ...this.state.region, ...latLng }
    })
  }

  /**
   * @summary Fires every time the map stops panning. For us the map is a
   * controlled component, so we keep track of the map's region in our state
   * @param {object} region - { latitude, longitude, latitudeDelta, longitudeDelta }
   */
  handleRegionChange = region => {
    this.setState({ region })
  }

  /**
   * @summary Fires every time a marker is pressed. We first center the map in
   * the spot location and then we use the index of the marker in order to
   * display the associated card
   * @param {int} index - Index of the marker being swiped.
   */
  handleMarkerPess = index => {
    const { region, currentSpot } = this.state // eslint-disable-line

    // Calculate the offset between the index of the current spot and the new
    // one so that we know how many time we have to scroll the swiper
    const offset = index - currentSpot

    // Get spot associated to the new index
    const spot = this.props.spots[index]

    const latLng = getSpotLocation(spot) // eslint-disable-line

    const rg = { ...region, ...latLng }

    // Center map on the spot
    this.setState(({ currentSpot: index, region: rg }) => {
      // AFTER the map is re-centered, scroll the swiper to the desired card
      this.refs.swiper.scrollBy(offset, true)
    })
  }

  render () {
    const { spots, onCardPress } = this.props
    const { region, currentSpot } = this.state

    return (
      <Relative style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          region={region}
          moveOnMarkerPress={false}
          onRegionChangeComplete={this.handleRegionChange}
        >
          {spots.map((spot, index) => (
            <Marker
              key={spot.uuid}
              tracksViewChanges={false}
              coordinate={getSpotLocation(spot)}
              pinColor={
                Colors[currentSpot === index ? 'primaryGreen' : 'black']
              }
              onPress={() => {
                this.handleMarkerPess(index)
              }}
            />
          ))}
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
              <TouchableOpacity
                key={spot.uuid}
                onPress={() => {
                  onCardPress(spot.uuid)
                }}
                style={cardList.cardContainer}
              >
                <CardSmall spot={spot} />
              </TouchableOpacity>
            ))}
          </Swiper>
        </Absolute>
      </Relative>
    )
  }
}

SpotsMap.propTypes = {
  // TODO
  /* initialLocation: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired
  }).isRequired, */
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
  onCardPress: PropTypes.func
}

SpotsMap.defaultProps = {
  spots: [],
  onCardPress: () => {}
}

export default SpotsMap
