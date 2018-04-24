import React, { Component } from 'react'
import { View, ScrollView, Image, TouchableOpacity, Share } from 'react-native'
import PropTypes from 'prop-types'
import Text from '../Text'
import Api from '../../Services/SeedorfApi'
import ImageSwiper from '../ImageSwiper'
import Colors from '../../Themes/Colors'
import moment from 'moment'
import I18n from '../../I18n'
import { showLocation } from 'react-native-map-link'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import styled from 'styled-components'
import UserCircle from '../UserCircle'
import PropertyCircle from '../PropertyCircle'
import images from '../../Themes/Images'
import BigButton from '../BigButton'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

const SpotOpenImage = () => (
  <Image source={images.spotOpenCircle} style={{ width: 42, height: 42 }} />
)

const mapMax = (maxNum, data, fn, fnElse) => {
  if (maxNum >= data.length) return data.map(fn)
  else {
    const returnArr = data.slice(0, maxNum - 1).map(fn)
    returnArr.push(fnElse())
    return returnArr
  }
}

export default class Game extends Component {
  static propTypes = {
    uuid: PropTypes.string,
    style: View.propTypes.style
  }

  onShare = game => {
    Share.share(
      {
        message: 'You have been invited',
        url: game.link,
        title: 'Sportyspots'
      },
      {
        dialogTitle: I18n.t('share')
      }
    )
  }

  openMaps (game) {
    showLocation({
      latitude: game.spot.lat,
      longitude: game.spot.lng,
      title: game.spot.label
    })
  }

  render () {
    return (
      <Query
        query={GET_GAME_DETAILS}
        variables={{ uuid: this.props.navigation.state.params.uuid }}
      >
        {({ loading, error, data }) => {
          if (loading) return <Text>Loading...</Text>
          if (error) return <Text>Error :( {JSON.stringify(error)}</Text>

          const game = data.game
          const spot = game.spot

          let attendingUsers = game.attendees
            .filter(rsvp => rsvp.status === 'ATTENDING')
            .map(rsvp => rsvp.user)

          const nOpenSpots = Math.max(0, game.capacity - attendingUsers.length)
          return (
            <ScrollView style={this.props.style}>
              <SwiperContainer>
                <ImageSwiper images={spot.images.map(i => i.image)} />
              </SwiperContainer>
              <BlockHeader>
                <HeaderLeft>
                  <Text.M>{spot.label}</Text.M>
                  <HeaderLeftDetails>
                    <Text.SM>{moment(game.startTime).format('D MMM')}</Text.SM>
                    <Time>
                      <MaterialIcon name='access-time' />
                      <Text.SM>
                        {moment(game.startTime).format('HH')} -{' '}
                        {moment(game.endTime).format('HH')}
                      </Text.SM>
                    </Time>
                    <Text.SM>{I18n.t(game.sport.category)}</Text.SM>
                  </HeaderLeftDetails>
                </HeaderLeft>
                <HeaderRight />
              </BlockHeader>
              <View style={{ margin: 0 }}>
                <TouchableOpacity onPress={() => this.openMaps(game)}>
                  <Image
                    style={{ height: 120 }}
                    source={{ uri: 'http://via.placeholder.com/350x150' }}
                  />
                </TouchableOpacity>
              </View>
              <Block>
                <BlockLabel>{I18n.t('Organizer')}</BlockLabel>
                <HorizontalView>
                  <UserCircle
                    user={game.organizer}
                    style={{ marginRight: 16 }}
                  />
                  <View style={{ flex: 1 }}>
                    <Text.SM>
                      {game.organizer.name} - {game.description}
                    </Text.SM>
                  </View>
                </HorizontalView>
              </Block>
              {attendingUsers.length > 0 && (
                <Block>
                  <BlockLabel>{I18n.t('Attending')}</BlockLabel>
                  <HorizontalView>
                    {mapMax(
                      8,
                      attendingUsers,
                      user => <UserCircle key={user.uuid} user={user} />,
                      () => (
                        <PropertyCircle
                          key='extra'
                          text={'+' + (attendingUsers.length - 7)}
                        />
                      )
                    )}
                  </HorizontalView>
                </Block>
              )}
              {nOpenSpots > 0 && (
                <Block>
                  <BlockLabel>{I18n.t('Open spots')}</BlockLabel>
                  <HorizontalView>
                    {mapMax(
                      8,
                      [...Array(nOpenSpots)],
                      (_, i) => <SpotOpenImage key={i} />,
                      () => (
                        <PropertyCircle
                          key='extra'
                          text={'+' + (nOpenSpots - 7)}
                        />
                      )
                    )}
                  </HorizontalView>
                </Block>
              )}
              {nOpenSpots > 0 && (
                <Block>
                  <HorizontalView style={{ width: '100%' }}>
                    <BigButton
                      style={{ flex: 1, marginLeft: 0 }}
                      bgColor={Colors.primaryGreen}
                      textColor={Colors.white}
                      text={I18n.t("I'm attending")}
                    />
                    <BigButton
                      style={{ flex: 1, marginRight: 0 }}
                      bgColor={Colors.red}
                      textColor={Colors.white}
                      text={I18n.t("I'm not attending")}
                    />
                  </HorizontalView>
                </Block>
              )}
              <Block>
                <BlockLabel>{I18n.t('Share with friends')}</BlockLabel>
                <TouchableOpacity
                  style={{
                    backgroundColor: Colors.gray,
                    height: 48,
                    width: 48,
                    borderRadius: 48,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onPress={() => this.onShare(game)}
                >
                  <MaterialIcon size={32} color={Colors.white} name='share' />
                </TouchableOpacity>
              </Block>
            </ScrollView>
          )
        }}
      </Query>
    )
  }
}

const GET_GAME_DETAILS = gql`
  query game($uuid: UUID!) {
    game(uuid: $uuid) {
      uuid
      name
      startTime
      endTime
      isFeatured
      showRemaining
      capacity
      sport {
        category
      }
      spot {
        uuid
        name
        images {
          image
        }
        amenities {
          sport
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
      organizer {
        name
      }
      attendees {
        status
        user {
          uuid
          name
        }
      }
    }
  }
`

const HorizontalView = styled.View`
  flex-direction: row;
`

const SwiperContainer = styled.View`
  height: 150px;
  width: 100%;
`

const Block = styled.View`
  padding: 16px;
`

const BlockHeader = styled(Block)`
  flex-direction: row;
`

const HeaderLeft = styled.View`
  flex: 4;
`

const HeaderRight = styled.View`
  flex: 3;
`

const HeaderLeftDetails = styled(HorizontalView)`
  justify-content: space-between;
  margin-top: 16px;
`

const Time = styled(HorizontalView)`
  align-items: center;
`

const BlockLabel = styled(Text.M)`
  margin-bottom: 8px;
`
