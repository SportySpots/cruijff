/* Card component, this is the Card that is used in a list of many Cards */

import React, { Component } from 'react'
import { Image, View } from 'react-native'
import PropTypes from 'prop-types'

import { card } from './Styles/CardStyles'
import Header from './Header'

export default class SpotListCard extends Component {
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
      <View style={[card.container, this.props.style]}>
        <Image style={card.image} source={{ uri: image }} />
        <Header spot={spot} style={card.bottom} />
      </View>
    )
  }
}
