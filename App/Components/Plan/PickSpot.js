import React, { Component } from 'react'
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native'
import Api from '../../Services/SeedorfApi'
import { cardList } from '../Spots/Styles/CardStyles'
import CardSmall from '../Spots/SpotListCardSmall'
import Text from '../Text'
import I18n from '../../I18n'
import PropTypes from 'prop-types'
import Footer from '../DarkFooter'

const CardContainer = props => {
  const { onPress, ...otherProps } = props
  return (
    <TouchableOpacity onPress={onPress} style={cardList.cardContainer}>
      <CardSmall {...otherProps} />
    </TouchableOpacity>
  )
}

export default class PickSpot extends Component {
  static propTypes = {
    navigate: PropTypes.func,
    navigation: PropTypes.object,
    setGameDetailField: PropTypes.func,
    gameDetails: PropTypes.shape({
      sport: PropTypes.string,
      date: PropTypes.string,
      startTime: PropTypes.string,
      stopTime: PropTypes.string,
      spotId: PropTypes.number,
      description: PropTypes.string,
      isPublic: PropTypes.bool
    })
  }

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

  selectSpot = item => {
    this.props.setGameDetailField('spotId', item.id)
    this.props.navigation.navigate('description')
  }

  render () {
    const { isLoading, spots } = this.state

    if (isLoading) {
      return <ActivityIndicator />
    }

    return (
      <View style={style.container}>
        <View style={[style.cardListContainer, this.props.style]}>
          <Text.L>{I18n.t('Pick a spot')}</Text.L>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={spots.slice(0, 100)}
            renderItem={({ item }) => (
              <CardContainer
                spot={item}
                onPress={() => this.selectSpot(item)}
              />
            )}
            keyExtractor={item => item.id}
          />
        </View>
        <Footer
          currentPage={1}
          numPages={4}
          disableNext
          onBack={() => this.props.navigation.goBack()}
        />
      </View>
    )
  }
}

const style = StyleSheet.create({
  cardListContainer: {
    padding: 8,
    flex: 1
  },
  container: {
    flex: 1
  }
})
