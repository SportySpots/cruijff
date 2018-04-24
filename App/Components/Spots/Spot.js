/* Card component, this is the Card that is used in a list of many Cards */

import React from 'react'

import { cardDetails } from './Styles/CardStyles'
import ImageSwiper from '../ImageSwiper'
import Header from './Header'
import Amenities from './Amenities'
import Text from '../Text'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import styled from 'styled-components'

export default class Spot extends React.PureComponent {
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
              <Header spot={spot} />
              {spot.amenities.length > 0 && (
                <Amenities amenities={spot.amenities[0].data} />
              )}
            </Container>
          )
        }}
      </Query>
    )
  }
}

const Container = styled.View`
  flex: 1;
`

const ImageSwiperContainer = styled.View`
  height: 200px;
`

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
