import React from 'react'

import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import Text from '../../Components/Text'
import SpotsList from '../../Components/Spots/SpotsList'
import Card from '../../Components/Spots/SpotListCard'

// TODO: Implement blank screen if no spots were found --> this should probably
// handled in SpotsList (child) component itself

const SpotsListScreen = ({ navigation, style }) => {
  const handleCardPress = spotId => {
    navigation.navigate('SpotDetailsScreen', {
      uuid: spotId
    })
  }

  return (
    <Query query={GET_SPOTS}>
      {({ loading, error, data }) => {
        if (loading) return <Text>Loading...</Text>
        if (error) return <Text>Error :( {JSON.stringify(error)}</Text>

        return (
          <SpotsList
            spots={data.spots}
            cardComponent={Card}
            onCardPress={handleCardPress}
            style={style}
          />
        )
      }}
    </Query>
  )
}

export default SpotsListScreen

export const GET_SPOTS = gql`
  {
    spots {
      uuid
      name
      images {
        image
      }
      address {
        lat
        lng
      }
      sports {
        category
      }
    }
  }
`
