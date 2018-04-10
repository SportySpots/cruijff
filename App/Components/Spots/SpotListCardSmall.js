/* Card component, this is the Card that is used in a list of many Cards */

import React, { Component } from 'react'
import { Image, View } from 'react-native'
import PropTypes from 'prop-types'
import Text from '../Text'

import { cardSmall } from './Styles/CardStyles'
import Rating from '../Rating'

const Spacer = () => <Text style={{ marginLeft: 8, marginRight: 8 }}>·</Text>

const distance = 1.3

export default class SpotListCardSmall extends Component {
  static propTypes = {
    spot: PropTypes.object,
    style: PropTypes.number
  }

  /* forward setNativeProps to the root (View) so that Card can be used as Touchable */
  setNativeProps = nativeProps => {
    this._root.setNativeProps(nativeProps)
  }

  componentWillMount () {
    this.distance = 5
  }

  render () {
    const spot = this.props.spot

    let image = 'http://via.placeholder.com/350x150'
    if (typeof spot.image === 'string') {
      image = spot.image
    } else if (typeof spot.image === 'object' && spot.length) {
      image = spot.image[0]
    }

    return (
      <View style={[cardSmall.container, this.props.style]}>
        <View style={cardSmall.details}>
          <Text.M>{spot.label}</Text.M>
          <View style={{ flexDirection: 'row' }}>
            <Rating rating={spot.rating || 4} />
            <Spacer />
            <Text.S>{distance.toFixed(1)} km</Text.S>
          </View>
        </View>
        <Image style={cardSmall.image} source={{ uri: image }} />
      </View>
    )
  }
}
