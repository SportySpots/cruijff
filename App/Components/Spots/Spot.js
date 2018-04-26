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
import { connect } from 'react-redux'
import api from '../../Services/SeedorfApi'

export class SpotContents extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      rating: 0,
      userRating: null, // todo: set from props
      showRating: true
    }
  }

  openSpot (spot) {
    showLocation({
      latitude: spot.lat,
      longitude: spot.lng,
      title: spot.name
    })
  }

  submitRating = async () => {
    if (this.state.rating > 0) {
      try {
        const result = await api.submitRating(
          this.props.spot.uuid,
          this.props.userUuid,
          this.state.rating
        )
        console.log(result)
      } catch (e) {
        console.log(e)
      }
      this.setState({ userRating: this.state.rating })
    }
  }

  render () {
    const spot = this.props.spot
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
        {this.state.showRating && (
          <Block style={{ backgroundColor: Colors.bgGrey }}>
            <Text>{I18n.t('Rate this spot')}</Text>
            <HorizontalView style={{ justifyContent: 'space-between' }}>
              <RatingBig
                rating={this.state.rating}
                onPress={i => this.setState({ rating: i })}
              />
              <FlatButton
                text={I18n.t(
                  this.state.userRating ? 'thank you' : 'submit'
                ).toUpperCase()}
                onPress={this.submitRating}
              />
            </HorizontalView>
          </Block>
        )}
        {spot.amenities.length > 0 && (
          <SpotProperties properties={spot.amenities[0].data} />
        )}
        <Block style={{ height: 100 }} />
      </Container>
    )
  }
}

const Spot = connect(state => ({ uuid: state.user.uuid }))(
  ({ navigation, uuid }) => (
    <Query
      query={GET_SPOT_DETAILS}
      variables={{ uuid: navigation.state.params.uuid, user_uuid: uuid }}
    >
      {({ loading, error, data }) => {
        if (loading) return <Text>Loading...</Text>
        if (error) return <Text>Error :( {JSON.stringify(error)}</Text>
        return (
          <SpotContents
            navigation={navigation}
            spot={data.spot}
            userUuid={uuid}
          />
        )
      }}
    </Query>
  )
)

export default Spot

const GET_SPOT_DETAILS = gql`
  query spot($uuid: UUID, $user_uuid: UUID) {
    spot(uuid: $uuid) {
      uuid
      name
      images {
        image
      }
      #      reactions {
      #
      #      }
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
