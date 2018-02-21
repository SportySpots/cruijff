import React, { Component } from 'react'
import {
  FlatList,
  View,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import PropTypes from 'prop-types'

import { cardList } from './Styles/CardStyles'
import Card from './Card'

import { Container, Content } from 'native-base'

import Api from '../../Services/FixtureApi'

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
    console.log(data)
    this.setState({ isLoading: false, spots: data })
  }

  render () {
    console.log('rendering')
    const { navigate } = this.props.navigation
    const { isLoading, spots } = this.state

    if (isLoading) {
      return (
        <Container>
          <Content>
            <ActivityIndicator />
          </Content>
        </Container>
      )
    }
    console.log('done loading', spots)

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
