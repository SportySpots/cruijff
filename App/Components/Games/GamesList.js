import React, { Component } from 'react'
import {
  FlatList,
  View,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'

import { cardList } from './Styles/CardStyles'
import Card from './Card'

import Api from '../../Services/SeedorfApi'

const CardContainer = props => {
  const { onPress, ...otherProps } = props
  return (
    <TouchableOpacity onPress={onPress} style={cardList.cardContainer}>
      <Card {...otherProps} />
    </TouchableOpacity>
  )
}

// TODO: Implement blank screen if no spots were found

export default class SpotListScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      spots: null,
      isLoading: true
    }
  }

  componentDidMount () {
    const { data } = Api.getAllSpots()
    this.setState({ isLoading: false, spots: data })
  }

  render () {
    const { navigate } = this.props.navigation
    const { isLoading, spots } = this.state

    if (isLoading) {
      return (
        <View style={{ flex: 1 }}>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <View style={[cardList.container, this.props.style]}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={spots.slice(0, 100)}
          renderItem={({ item }) => (
            <CardContainer
              spot={item}
              onPress={() => navigate('SpotDetailsScreen', { spotId: item.id })}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    )
  }
}
