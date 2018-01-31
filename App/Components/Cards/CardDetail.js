/* Card component, this is the Card that is used in a list of many Cards */

import React, { Component } from 'react'
import {View} from 'react-native'
import PropTypes from 'prop-types'

import { cardDetails } from './Styles/CardStyles'
import ImageSlider from '../ImageSlider/ImageSlider'
import Header from './Header'
import Properties from './Properties'

export default class extends Component {
  static propTypes = {
    spot: PropTypes.object,
    style: PropTypes.number
  }

  componentWillMount () {
    this.distance = 5
  }

  render () {
    const spot = this.props.spot

    return (
      <View style={[cardDetails.container, this.props.style]}>
        <ImageSlider style={cardDetails.slider} images={spot.images} />
        <Header spot={spot} style={cardDetails.bottom} />
        <Properties properties={spot.properties} />
      </View>
    )
  }
}
