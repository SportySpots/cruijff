import React, { Component } from 'react'
import { FlatList, View, TouchableOpacity } from 'react-native'

import { cardList } from './Styles/CardStyles'
import Card from './SpotListCard'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import Text from '../Text'

const CardContainer = props => {
  const { onPress, ...otherProps } = props
  return (
    <TouchableOpacity onPress={onPress} style={cardList.cardContainer}>
      <Card {...otherProps} />
    </TouchableOpacity>
  )
}

// TODO: Implement blank screen if no spots were found

export default class SpotList extends Component {
  render () {
    return (
      <Query query={GET_SPOTS} fetchPolicy='network-only'>
        {({ loading, error, data }) => {
          if (loading) return <Text>Loading...</Text>
          if (error) return <Text>Error :( {JSON.stringify(error)}</Text>

          return (
            <View style={[cardList.container, this.props.style]}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={data.spots.slice(0, 100)}
                renderItem={({ item }) => (
                  <CardContainer
                    spot={item}
                    onPress={() =>
                      this.props.navigation.navigate('SpotDetailsScreen', {
                        uuid: item.uuid
                      })
                    }
                  />
                )}
                keyExtractor={item => item.uuid}
              />
            </View>
          )
        }}
      </Query>
    )
  }
}

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
