/* Card component, this is the Card that is used in a list of many Cards */

import React, { Component } from 'react'
import {Image, View} from 'react-native'
import PropTypes from 'prop-types'

import {card} from './Styles/CardStyles'
import Header from './Header'

export default class extends Component {
  static propTypes = {
    spot: PropTypes.object,
    style: PropTypes.number
  }

  /* forward setNativeProps to the root (View) so that Card can be used as Touchable */
  setNativeProps = (nativeProps) => {
    this._root.setNativeProps(nativeProps)
  }

  componentWillMount () {
    this.distance = 5
  }

  render () {
    const spot = this.props.spot

    return (
      <View style={[card.container, this.props.style]}>
        <Image style={card.image} source={{
          uri: (spot.images && spot.images[0]) || 'http://via.placeholder.com/350x150'
        }} />
        <Header spot={spot} style={card.bottom} />
      </View>
    )
  }
}
