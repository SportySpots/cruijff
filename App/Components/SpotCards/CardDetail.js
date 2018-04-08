/* Card component, this is the Card that is used in a list of many Cards */

import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import PropTypes from 'prop-types'

import { cardDetails } from './Styles/CardStyles'
import ImageSwiper from '../ImageSwiper'
import Header from './Header'
import Properties from './Properties'
import Api from '../../Services/SeedorfApi'
import Text from '../Text'

export default class extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      spot: null,
      isLoading: true
    }
  }

  componentDidMount () {
    const { data } = Api.getSpot(this.props.navigation.state.params.spotId)
    this.setState({ isLoading: false, spot: data })
  }

  render () {
    const { navigate } = this.props.navigation
    const { isLoading, spot } = this.state

    if (isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      )
    }

    let description = ''
    const descAttrIndex = spot.attributes.findIndex(
      attr => attr['attribute_name'] === 'Omschrijving'
    )
    if (descAttrIndex !== -1) {
      description = spot.attributes[descAttrIndex].value
      spot.attributes.splice(descAttrIndex, 1)
    }

    let images = ['http://via.placeholder.com/350x150']
    if (typeof spot.image === 'string') {
      images = [spot.image]
    } else if (Array.isArray(spot.image)) {
      images = spot.image
    }

    return (
      <View style={[cardDetails.container, this.props.style]}>
        <ImageSwiper style={cardDetails.slider} images={images} />
        <Header spot={spot} style={cardDetails.bottom} />
        <Text>{description}</Text>
        <Properties properties={spot.attributes} />
      </View>
    )
  }
}
