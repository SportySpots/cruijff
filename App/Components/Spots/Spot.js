/* Card component, this is the Card that is used in a list of many Cards */

import React from 'react'

import ImageSwiper from '../ImageSwiper'
import Header from './Header'
import Text from '../Text'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import styled from 'styled-components'
import I18n from '../../I18n'
import { Image, ScrollView, TouchableOpacity, View } from 'react-native'
import RatingBig from '../RatingBig'
import FlatButton from '../FlatButton'
import SpotProperties from './SpotProperties'
import Colors from '../../Themes/Colors'
import { showLocation } from 'react-native-map-link'

export default class Spot extends React.PureComponent {
  openSpot (spot) {
    showLocation({
      latitude: spot.lat,
      longitude: spot.lng,
      title: spot.name
    })
  }

  render () {
    return (
      <Query
        query={GET_SPOT_DETAILS}
        variables={{ uuid: this.props.navigation.state.params.uuid }}
      >
        {({ loading, error, data }) => {
          if (loading) return <Text>Loading...</Text>
          if (error) return <Text>Error :( {JSON.stringify(error)}</Text>
          const spot = data.spot

          const images =
            spot.images.length > 0
              ? spot.images.map(image => image.image)
              : [
                'https://raw.githubusercontent.com/SportySpots/cruijff/graphql/App/Images/spot-placeholder.png'
              ]

          return (
            <Container>
              <ImageSwiperContainer>
                <ImageSwiper images={images} />
              </ImageSwiperContainer>
              <Block>
                <Header spot={spot} />
              </Block>
              <View style={{ margin: 0 }}>
                <TouchableOpacity onPress={() => this.openSpot(spot)}>
                  <Image
                    style={{ height: 120 }}
                    source={{ uri: 'http://via.placeholder.com/350x150' }}
                  />
                </TouchableOpacity>
              </View>
              <Block style={{ backgroundColor: Colors.bgGrey }}>
                <Text>{I18n.t('Rate this spot')}</Text>
                <HorizontalView style={{ justifyContent: 'space-between' }}>
                  <RatingBig onPress={console.log} />
                  <FlatButton text={I18n.t('submit').toUpperCase()} />
                </HorizontalView>
              </Block>
              {spot.amenities.length > 0 && (
                <SpotProperties properties={spot.amenities[0].data} />
              )}
              <Block style={{ height: 100 }} />
            </Container>
          )
        }}
      </Query>
    )
  }
}

const GET_SPOT_DETAILS = gql`
  query spot($uuid: UUID) {
    spot(uuid: $uuid) {
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
  }
`

const Container = styled(ScrollView)`
  background-color: ${Colors.white};
`

const ImageSwiperContainer = styled.View`
  height: 200px;
`

const HorizontalView = styled.View`
  flex-direction: row;
`

const Block = styled.View`
  padding: 16px;
`
