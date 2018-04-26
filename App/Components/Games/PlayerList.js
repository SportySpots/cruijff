import React, { Component } from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import Text from '../Text'

export default class UserList extends Component {
  render () {
    return (
      <Query query={GET_GAME_USERS_LIST} variables={{ uuid: this.props.uuid }}>
        {({ loading, error, data }) => {
          if (loading) return <Text>Loading...</Text>
          if (error) return <Text>Error :( {JSON.stringify(error)}</Text>

          return <Text />
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
          name
          profile {
            yearOfBirth
          }
        }
      }
    }
  }
`
