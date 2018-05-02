import React, { Component } from 'react'
import {
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native'
import { cardList } from '../Spots/Styles/CardStyles'
import CardSmall from '../Spots/SpotListCardSmall'
import Text from '../Text'
import I18n from '../../I18n'
import PropTypes from 'prop-types'
import Footer from '../DarkFooter'
import { GET_SPOTS } from '../Spots/SpotList'
import { Query } from 'react-apollo'
import api from '../../Services/SeedorfApi'

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
    navigation: PropTypes.object
  }

  selectSpot = async item => {
    const result = await api.setGameSpot({
      gameUUID: this.props.navigation.state.params.uuid,
      spotUUID: item.uuid
    })
    if (result.ok) {
      this.props.navigation.navigate('description', {
        uuid: this.props.navigation.state.params.uuid
      })
    }
  }

  render () {
    return (
      <Query query={GET_SPOTS}>
        {({ loading, error, data }) => {
          if (loading) return <Text>Loading...</Text>
          if (error) return <Text>Error :( {JSON.stringify(error)}</Text>
          return (
            <View style={style.container}>
              <View style={[style.cardListContainer, this.props.style]}>
                <Text.L>{I18n.t('Pick a spot')}</Text.L>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={data.spots.slice(0, 100)}
                  renderItem={({ item }) => (
                    <CardContainer
                      spot={item}
                      onPress={() => this.selectSpot(item)}
                    />
                  )}
                  keyExtractor={item => item.uuid}
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
        }}
      </Query>
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
