import React, { Component } from 'react'
import {
  FlatList,
  View,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'

import Api from '../../Services/SeedorfApi'
import GameListCard from './GameListCard'
import styled from 'styled-components'
import { MenuProvider } from 'react-native-popup-menu'
import MonthSelector from './MonthSelector'

const CardContainer = props => {
  const { style, onPress, ...otherProps } = props
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <GameListCard {...otherProps} />
    </TouchableOpacity>
  )
}

export default class GamesListScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      month: new Date().getMonth(),
      spots: null,
      isLoading: true
    }
  }

  componentDidMount () {
    const { data } = Api.getGames({ month: 4 })
    this.setState({ isLoading: false, games: data })
  }

  render () {
    const { navigate } = this.props.navigation
    const { isLoading, games } = this.state

    if (isLoading) {
      return (
        <View style={{ flex: 1 }}>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <Container>
        <MonthSelector
          style={{ marginBottom: 16 }}
          month={this.state.month}
          onChange={month => this.setState({ month })}
        />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={games.slice(0, 100)}
          renderItem={({ item }) => (
            <GameListCardContainer
              id={item.id}
              onPress={() => navigate('GameDetailsScreen', { id: item.id })}
            />
          )}
          keyExtractor={item => item.id}
        />
      </Container>
    )
  }
}

const Container = styled(MenuProvider)`
  margin-left: 8px;
  margin-right: 8px;
  flex: 1;
`

const GameListCardContainer = styled(CardContainer)`
  margin-bottom: 8px;
`
