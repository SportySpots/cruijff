import React, { Component } from 'react'
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View
} from 'react-native'
import Api from '../../Services/FixtureApi'
import { cardList } from '../Cards/Styles/CardStyles'
import CardSmall from '../Cards/CardSmall'
import Text from '../Text'
import I18n from '../../I18n'

const CardContainer = props => {
  const { onPress, ...otherProps } = props
  return (
    <TouchableOpacity onPress={onPress} style={cardList.cardContainer}>
      <CardSmall {...otherProps} />
    </TouchableOpacity>
  )
}

// TODO: Implement blank screen if no spots were found

export default class PickSpot extends Component {
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
      return <ActivityIndicator />
    }

    return (
      <View style={[cardList.container, this.props.style]}>
        <Text.L>{I18n.t('Pick a spot')}</Text.L>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={spots.slice(0, 100)}
          renderItem={({ item }) => (
            <CardContainer spot={item} onPress={() => null} />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    )
  }
}
