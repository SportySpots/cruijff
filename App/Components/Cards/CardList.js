import React, { Component } from 'react'
import {FlatList, View, TouchableOpacity} from 'react-native'
import PropTypes from 'prop-types'

import { cardList } from './Styles/CardStyles'
import Card from './Card'

const CardContainer = ({data}) =>
  <TouchableOpacity style={cardList.cardContainer}>
    <Card spot={data} />
  </TouchableOpacity>

export default class extends Component {
  static propTypes = {
    style: PropTypes.number,
    spots: PropTypes.array
  }

  componentWillMount () {
    this.distance = 5
  }

  render () {
    return (
      <View style={[cardList.container, this.props.style]}>
        <FlatList
          data={this.props.spots}
          renderItem={({item}) => <CardContainer data={item} />}
          keyExtractor={(item) => item.id}
        />
      </View>
    )
  }
}
