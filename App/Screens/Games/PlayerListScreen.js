import React, { Component } from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import Text from '../../Components/Text'
import { TabBarTop, TabNavigator } from 'react-navigation'
import I18n from '../../I18n/index'
import Colors from '../../Themes/Colors'
import { ScrollView, View } from 'react-native'
import propTypes from 'prop-types'
import UserCircle from '../../Components/UserCircle'
import moment from 'moment'
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
    attendee: propTypes.object
  }
  render () {
    const user = this.props.attendee.user
    return (
      <UserRowContainer>
        <UserCircle user={user} />
        <UserRowRight>
          <Text.M>{user.name}</Text.M>
          <Text.S>
            {I18n.t('Signed up at')}:{' '}
            {moment(this.props.attendee.createdAt).format('d MMMM YYYY HH:mm')}
          </Text.S>
        </UserRowRight>
      </UserRowContainer>
    )
  }
}

const UserRowContainer = styled(View)`
  height: 50px;
  flex-direction: row;
  align-items: center;
  padding: 8px;
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.lightGray};
`

const UserRowRight = styled.View`
  flex-direction: column;
  padding-left: 8px;
`

export default class UserList extends Component {
  render () {
    return (
      <Query query={GET_GAME_USERS_LIST} variables={{ uuid: this.props.uuid }}>
        {({ loading, error, data }) => {
          if (loading) return <Text>Loading...</Text>
          if (error) return <Text>Error :( {JSON.stringify(error)}</Text>
          const screens = {}
          for (let status of Object.keys(statuses)) {
            const attendees = data.game.attendees.filter(
              attendee => attendee.status === status
            )
            screens[status] = {
              screen: () => (
                <ScrollView style={{ flex: 1 }}>
                  {attendees.map(attendee => (
                    <UserRow key={attendee.user.uuid} attendee={attendee} />
                  ))}
                </ScrollView>
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
        createdAt
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
