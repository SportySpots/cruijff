/* Card component, this is the Card that is used in a list of many Cards */

import React, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import Text from '../Text'
import Api from '../../Services/FixtureApi'
import ImageSwiper from '../ImageSwiper'

export default class extends Component {
  static propTypes = {
    id: PropTypes.number,
    style: PropTypes.number
  }

  constructor () {
    super()
    this.state = {
      loading: true,
      game: null
    }
  }

  componentDidMount () {
    const { data } = Api.getGame(this.props.id)
    this.setState({ isLoading: false, game: data })
  }

  render () {
    if (!this)
    let images = []
    const spot = this.state.game.spot
    if (typeof spot.image === 'string') {
      images = [spot.image]
    } else if (typeof spot.image === 'object' && spot.length) {
      images = spot.image
    }

    return (
      <View style={[this.props.style]}>
        <ImageSwiper images={images} />
        <Text>{JSON.stringify(this.state.game)}asd</Text>
      </View>
    )
  }
}
