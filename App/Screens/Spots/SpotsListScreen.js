import React from 'react'

import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import Text from '../../Components/Text'
import SpotsList from '../../Components/Spots/SpotsList'
import Card from '../../Components/Spots/SpotListCard'
import { View } from 'react-native'
import CenteredActivityIndicator from '../../CenteredActivityIndicator'
import withQuery from '../../GraphQL/withQuery'

// TODO: Implement blank screen if no spots were found --> this should probably
// handled in SpotsList (child) component itself

const SpotsListScreen = ({ navigation, style }) => {
  const handleCardPress = spotId => {
    navigation.navigate('SpotDetailsScreen', {
      uuid: spotId
    })
  }

  const _SpotsList = withQuery(GET_SPOTS)(SpotsList)

  return (
    <_SpotsList
      cardComponent={Card}
      onCardPress={handleCardPress}
      style={style}
    />
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
