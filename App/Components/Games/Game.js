import React, { Component } from 'react'
import { View, ScrollView, Image, TouchableOpacity, Share } from 'react-native'
import PropTypes from 'prop-types'
import Text from '../Text'
import ImageSwiper from '../ImageSwiper'
import Colors from '../../Themes/Colors'
import moment from 'moment'
import I18n from '../../I18n'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import styled from 'styled-components'
import UserCircle from '../UserCircle'
import PropertyCircle from '../PropertyCircle'
import images from '../../Themes/Images'
import DefaultButton from '../DefaultButton'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import ErrorBoundary from '../ErrorBoundary'
import SpotMap from '../Maps/SpotMap'

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

class GameComponent extends Component {
  static propTypes = {
    game: PropTypes.object,
    style: View.propTypes.style,
    navigation: PropTypes.object
  }

  constructor (props) {
    super(props)
    this.state = {
      rating: 0
    }
  }

  openPlayerList = () => {
    this.props.navigation.navigate('GamePlayerScreen', {
      uuid: this.props.game.uuid
    })
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

  render () {
    const game = this.props.game
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
            <Text.M>{spot.name}</Text.M>
            <HeaderLeftDetails>
              <Text.SM>{moment(game.startTime).format('D MMM')}</Text.SM>
              <Time>
                <MaterialIcon name='access-time' style={{ paddingRight: 4 }} />
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
          <ErrorBoundary>
            <SpotMap spot={spot} />
          </ErrorBoundary>
        </View>
        <Block>
          <BlockLabel>{I18n.t('Organizer')}</BlockLabel>
          <TouchableOpacity onPress={this.openPlayerList}>
            <HorizontalView>
              <UserCircle user={game.organizer} style={{ marginRight: 16 }} />
              <View style={{ flex: 1 }}>
                <Text.SM>
                  {game.organizer.name} - {game.description}
                </Text.SM>
              </View>
            </HorizontalView>
          </TouchableOpacity>
        </Block>
        {attendingUsers.length > 0 && (
          <Block>
            <BlockLabel>{I18n.t('Attending')}</BlockLabel>
            <TouchableOpacity onPress={this.openPlayerList}>
              <HorizontalView>
                {mapMax(
                  8,
                  attendingUsers,
                  user => (
                    <UserCircle
                      key={user.uuid}
                      user={user}
                      style={{ marginRight: 4 }}
                    />
                  ),
                  () => (
                    <PropertyCircle
                      key='extra'
                      text={'+' + (attendingUsers.length - 7)}
                    />
                  )
                )}
              </HorizontalView>
            </TouchableOpacity>
          </Block>
        )}
        {nOpenSpots > 0 && (
          <Block>
            <BlockLabel>{I18n.t('Open spots')}</BlockLabel>
            <TouchableOpacity onPress={this.openPlayerList}>
              <HorizontalView>
                {mapMax(
                  8,
                  [...Array(nOpenSpots)],
                  (_, i) => <SpotOpenImage key={i} />,
                  () => (
                    <PropertyCircle key='extra' text={'+' + (nOpenSpots - 7)} />
                  )
                )}
              </HorizontalView>
            </TouchableOpacity>
          </Block>
        )}
        {nOpenSpots > 0 && (
          <Block>
            <HorizontalView style={{ width: '100%' }}>
              <DefaultButton
                style={{ flex: 1, marginLeft: -10 }}
                bgColor={Colors.primaryGreen}
                textColor={Colors.white}
                text={I18n.t("I'm attending")}
              />
              <DefaultButton
                style={{ flex: 1, marginRight: -10 }}
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
  }
}

export default class Game extends Component {
  static propTypes = {
    uuid: PropTypes.string,
    style: View.propTypes.style
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
          return (
            <GameComponent
              style={this.props.style}
              game={data.game}
              navigation={this.props.navigation}
            />
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
