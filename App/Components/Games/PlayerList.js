import React, { Component } from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import Text from '../Text'
import { TabBarTop, TabNavigator } from 'react-navigation'
import I18n from '../../I18n'
import Colors from '../../Themes/Colors'
import { ScrollView, View } from 'react-native'
import propTypes from 'prop-types'
export const BottomNav = ({ screens }) =>
  React.createElement(
    new TabNavigator(screens, {
      tabBarComponent: TabBarTop,
      tabBarPosition: 'top',
      tabBarOptions: {
        style: {
          backgroundColor: Colors.white
        },
        labelStyle: {
          color: 'black',
          fontWeight: '700'
        },
        indicatorStyle: {
          backgroundColor: Colors.primaryGreen,
          height: 4
        }
      },
      initialRouteName: 'ATTENDING'
    })
  )

const statuses = {
  ATTENDING: {
    label: I18n.t('attending')
  },
  DECLINED: {
    label: I18n.t('declined')
  },
  INVITED: {
    label: I18n.t('invited')
  }
}

class UserRow extends Component {
  static propTypes = {
    user: propTypes.object
  }
  render () {
    const user = this.props.user
    return (
      <ScrollView style={{ flex: 1 }}>
        <Text>{JSON.stringify(user)}</Text>
      </ScrollView>
    )
  }
}

export default class UserList extends Component {
  render () {
    return (
      <Query query={GET_GAME_USERS_LIST} variables={{ uuid: this.props.uuid }}>
        {({ loading, error, data }) => {
          if (loading) return <Text>Loading...</Text>
          if (error) return <Text>Error :( {JSON.stringify(error)}</Text>

          const screens = {}
          for (let status of Object.keys(statuses)) {
            const users = data.game.attendees
              .filter(attendee => attendee.status === status)
              .map(a => a.user)
            screens[status] = {
              screen: () => (
                <View>
                  {users.map(user => <UserRow key={user.uuid} user={user} />)}
                </View>
              ),
              navigationOptions: {
                tabBarLabel: statuses[status].label
              }
            }
          }
          return (
            <View style={{ flex: 1 }}>
              <BottomNav screens={screens} />
            </View>
          )
        }}
      </Query>
    )
  }
}

export const GET_GAME_USERS_LIST = gql`
  query game($uuid: UUID) {
    game(uuid: $uuid) {
      uuid
      attendees {
        status
        user {
          uuid
          name
          profile {
            yearOfBirth
          }
        }
      }
    }
  }
`
