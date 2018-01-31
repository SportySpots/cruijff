/* Card component, this is the Card that is used in a list of many Cards */

import React, { Component } from 'react'
import {Image, View} from 'react-native'
import Text from '../Text'
import PropTypes from 'prop-types'

import { card } from './Styles/CardStyles'
import Rating from '../Rating'
import Int18n from '../../I18n'

const Spacer = () => <Text style={card.spacer}>·</Text>

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
          uri: (spot.image && spot.image) || 'http://via.placeholder.com/350x150'
        }} />
        <View style={card.bottom}>
          <Text.M>
            {spot.name}
          </Text.M>
          <View style={card.belowName}>
            <Rating rating={spot.rating} />
            <Spacer />
            <Text.S>{Int18n.t(spot.sport)}</Text.S>
            <Spacer />
            <Text.S>{this.distance.toFixed(1)} km</Text.S>
            {spot.numGames > 0 && ([
              <Spacer key={1} />,
              <Text.S key={2} style={card.plannedGamesCount}>
                {spot.numGames} {Int18n.t('games')}
              </Text.S>
            ])}
          </View>
        </View>
      </View>
    )
  }
}
