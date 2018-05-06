import React, { Component } from 'react'
import { FlatList, TouchableOpacity } from 'react-native'

import GameListCard from '../../Components/Games/GameListCard'
import styled from 'styled-components'
import { MenuProvider } from 'react-native-popup-menu'
import MonthSelector from '../../Components/Games/MonthSelector'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import Text from '../../Components/Text'

const CardContainer = props => {
  const { style, onPress, ...otherProps } = props
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <GameListCard {...otherProps} />
    </TouchableOpacity>
  )
}

/* Get the min / max date for month `month`. Past months will change to future months */
const getMonthRange = month => {
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  return {
    minDate: new Date(
      month < currentMonth ? currentYear + 1 : currentYear,
      month,
      0
    ),
    maxDate: new Date(
      month < currentMonth ? currentYear + 1 : currentYear,
      month + 1,
      0
    )
  }
}

export default class GameList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      month: new Date().getMonth()
    }
  }
  render () {
    const monthRange = getMonthRange(this.state.month)
    return (
      <Query
        query={GET_GAMES_LIST}
        variables={{
          minStartTime: monthRange.minDate,
          maxStartTime: monthRange.maxDate
        }}
      >
        {({ loading, error, data }) => {
          if (loading) return <Text>Loading...</Text>
          if (error) return <Text>Error :( {JSON.stringify(error)}</Text>

          return (
            <Container>
              <MonthSelector
                style={{ marginBottom: 16 }}
                month={this.state.month}
                onChange={month => this.setState({ month })}
              />
              <FlatList
                showsVerticalScrollIndicator={false}
                data={data.games.filter(game => game.spot)}
                renderItem={({ item }) => (
                  <GameListCardContainer
                    game={item}
                    onPress={() =>
                      this.props.navigation.navigate('GameDetailsScreen', {
                        uuid: item.uuid
                      })
                    }
                  />
                )}
                keyExtractor={item => item.uuid}
              />
            </Container>
          )
        }}
      </Query>
    )
  }
}

export const GET_GAMES_LIST = gql`
  #  query games($minStartTime: String!, $maxStartTime: String!) {
  query games {
    games #      maxStartTime: $maxStartTime #      minStartTime: $minStartTime #      orderBy: "startTime" #      isListed: true
    {
      uuid
      name
      start_time
      end_time
      is_featured
      show_remaining
      capacity
      sport {
        category
      }
      spot {
        uuid
        name
        images {
          image
        }
        amenities {
          sport {
            category
          }
          data
        }
        sports {
          category
        }
        address {
          lat
          lng
        }
      }
      attendees {
        status
        user {
          name
        }
      }
    }
  }
`

const Container = styled(MenuProvider)`
  margin-left: 8px;
  margin-right: 8px;
  flex: 1;
`

const GameListCardContainer = styled(CardContainer)`
  margin-bottom: 8px;
`
