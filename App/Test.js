import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Text } from 'react-native'

export const Users = () => (
  <Query
    query={gql`
      {
        spots {
          uuid
          spotGames {
            uuid
          }
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      console.log(error)
      if (loading) return <Text>Loading...</Text>
      if (error) return <Text>Error :( {JSON.stringify(error)}</Text>

      return data.spots.map(spot => <Text>{JSON.stringify(spot)}</Text>)
    }}
  </Query>
)
