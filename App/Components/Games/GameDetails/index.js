/* import React from 'react';
import PropTypes from 'prop-types';
import { Alert, Image, ScrollView, Share, TouchableOpacity, View } from 'react-native';
import { propType } from 'graphql-anywhere';
import moment from 'moment';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components';
import { connect } from 'react-redux';
import I18n from '../../../I18n/index';
import Colors from '../../../Themes/Colors';
import API from '../../../Services/SeedorfApi';
import spotDetailsFragment from '../../../GraphQL/Spots/Fragments/spotDetails';
import GET_GAME_DETAILS from '../../../GraphQL/Games/Queries/GET_GAME_DETAILS';
import Text from '../../Text';
import ImageSwiper from '../../ImageSwiper';
import UserCircle from '../../UserCircle';
import PropertyCircle from '../../PropertyCircle';
import themeImages from '../../../Themes/Images';
import DefaultButton from '../../DefaultButton';
import PropTypeDefinitions from '../../../PropTypesDefinitions';
import withQuery from '../../../GraphQL/withQuery';
import SpotMapWithLinkFallback from '../../Spots/SpotMapWithLinkFallback';
import config from '../../../config';

const RSVP_STATUSES = {
  ATTENDING: 'ATTENDING',
  DECLINED: 'DECLINED',
};

const SpotOpenImage = () => (
  <Image source={themeImages.spotOpenCircle} style={{ width: 42, height: 42 }} />
);

const mapMax = (maxNum, data, fn, fnElse) => {
  if (maxNum >= data.length) return data.map(fn);

  const returnArr = data.slice(0, maxNum - 1).map(fn);
  returnArr.push(fnElse());
  return returnArr;
};

class GameDetails extends React.PureComponent {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     rating: 0,
  //   };
  // }

  openPlayerList = () => {
    this.props.navigation.navigate('GamePlayerScreen', {
      uuid: this.props.data.game.uuid,
    });
  };

  onShare = (game) => {
    const url = `https://${config.deeplinkHost}/games/${game.uuid}`;
    const message = `${I18n.t('You have been invited to a SportySpots game:')}: ${url}`;
    Share.share(
      {
        message,
        title: 'SportySpots',
      },
      {
        dialogTitle: I18n.t('share'),
      },
    );
  };

  get userRSVP() {
    for (const attendee of this.props.data.game.attendees) {
      if (attendee.user.uuid === this.props.user.uuid) {
        return attendee;
      }
    }
    return null;
  }

  get userStatus() {
    const attendee = this.userRSVP;
    if (attendee) {
      return attendee.status;
    }
    return null;
  }

  setRSVPStatus = async (status) => {
    const attendee = this.userRSVP;
    if (attendee) {
      await API.updateRSVPStatus({
        gameUUID: this.props.data.game.uuid,
        rsvpUUID: attendee.uuid,
        status,
      });
    } else {
      await API.setRSVPStatus({ gameUUID: this.props.data.game.uuid, status });
    }
    this.props.refetch();
  }

  rsvpBlock = () => {
    const status = this.userStatus;
    if (!status) {
      return (
        <Block>
          <HorizontalView style={{ width: '100%' }}>
            <DefaultButton
              style={{ flex: 1, marginLeft: -10 }}
              bgColor={Colors.primaryGreen}
              textColor={Colors.white}
              text={I18n.t("I'm attending")}
              onPress={() => !this.props.user.uuid ?
                this.props.navigation.navigate('ProfileTab') :
                this.setRSVPStatus(RSVP_STATUSES.ATTENDING)
              }
            />
            <DefaultButton
              style={{ flex: 1, marginRight: -10 }}
              bgColor={Colors.red}
              textColor={Colors.white}
              text={I18n.t("I'm not attending")}
              onPress={() => !this.props.user.uuid ?
                this.props.navigation.navigate('ProfileTab') :
                this.setRSVPStatus(RSVP_STATUSES.DECLINED)}
            />
          </HorizontalView>
        </Block>
      );
    }
    return (
      <Block>
        <HorizontalView style={{ width: '100%' }}>
          <DefaultButton
            style={{ flex: 1, marginLeft: -10 }}
            bgColor={status === RSVP_STATUSES.ATTENDING ? Colors.white : Colors.primaryGreen}
            textColor={status === RSVP_STATUSES.ATTENDING ? Colors.black : Colors.white}
            text={I18n.t(status === RSVP_STATUSES.ATTENDING ? "I'm not attending" : "I'm attending")}
            onPress={() => {
              if (status === RSVP_STATUSES.ATTENDING) {
                Alert.alert(
                  I18n.t('Confirm'),
                  I18n.t('Are you sure you want to stop attending?'),
                  [
                    { text: I18n.t('No'), onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                    { text: I18n.t('Yes'), onPress: () => this.setRSVPStatus(RSVP_STATUSES.DECLINED) },
                  ],
                );
              } else {
                this.setRSVPStatus(RSVP_STATUSES.ATTENDING);
              }
            }}
          />
        </HorizontalView>
      </Block>
    );
  }

  render() {
    const game = this.props.data.game;
    const spot = game.spot;
    const images =
      spot.images.length > 0
        ? spot.images.map(image => image.image)
        : [
          'https://raw.githubusercontent.com/SportySpots/cruijff/graphql/App/Images/spot-placeholder.png',
        ];

    const attendingUsers = game.attendees
      ? game.attendees
        .filter(rsvp => rsvp.status === 'ATTENDING')
        .map(rsvp => rsvp.user)
      : [];

    const nOpenSpots = Math.max(0, game.capacity - attendingUsers.length);
    return (
      <ScrollView style={this.props.style}>
        <SwiperContainer>
          <ImageSwiper images={images} />
        </SwiperContainer>
        <BlockHeader>
          <HeaderLeft>
            <Text.M>{spot.name}</Text.M>
            <HeaderLeftDetails>
              <Text.SM>{moment(game.start_time).format('D MMM')}</Text.SM>
              <Time>
                <MaterialIcon name="access-time" style={{ paddingRight: 4 }} />
                <Text.SM>
                  {moment(game.start_time).format('HH')} - {moment(game.end_time).format('HH')}
                </Text.SM>
              </Time>
              <Text.SM>{I18n.t(game.sport.category)}</Text.SM>
            </HeaderLeftDetails>
          </HeaderLeft>
          <HeaderRight />
        </BlockHeader>
        <SpotMapWithLinkFallback spot={spot} />
        <Block>
          <BlockLabel>{I18n.t('Organizer')}</BlockLabel>
          <TouchableOpacity onPress={this.openPlayerList}>
            <HorizontalView>
              <UserCircle user={game.organizer} style={{ marginRight: 16 }} />
              <View style={{ flex: 1 }}>
                <Text.SM>
                  {game.organizer.first_name} {game.organizer.last_name} -{' '}
                  {game.description || ''}
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
                  7,
                  attendingUsers,
                  user => <UserCircle key={user.uuid} user={user} style={{ marginRight: 4 }} />,
                  () => <PropertyCircle key="extra" text={`+${attendingUsers.length - 6}`} />,
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
                  7,
                  [...Array(nOpenSpots)],
                  (_, i) => <SpotOpenImage key={i} />,
                  () => <PropertyCircle key="extra" text={`+${nOpenSpots - 6}`} />,
                )}
              </HorizontalView>
            </TouchableOpacity>
          </Block>
        )}
        { this.rsvpBlock() }
        <Block>
          <BlockLabel>{I18n.t('Share with friends')}</BlockLabel>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.gray,
              height: 48,
              width: 48,
              borderRadius: 48,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => this.onShare(game)}
          >
            <MaterialIcon size={32} color={Colors.white} name="share" />
          </TouchableOpacity>
        </Block>
      </ScrollView>
    );
  }
}
*/
/* const GameDetailsScreen = connect(state => ({ user: state.user }))(
  (props) => {
    const Contents = withQuery(GET_GAME_DETAILS)(GameComponent);
    return (
      <Contents
        {...props}
        variables={{ uuid: props.navigation.state.params.uuid }}
      />
    );
  },
); */
/*
GameDetails.propTypes = {
  game: propType(gameDetailsFragment).isRequired,
  style: PropTypes.any,
  navigation: PropTypeDefinitions.navigation,
  user: PropTypes.object,
  refetch: PropTypes.func,
};

export default GameDetails;

const HorizontalView = styled.View`
  flex-direction: row;
`;

const SwiperContainer = styled.View`
  height: 150px;
  width: 100%;
`;

const Block = styled.View`
  padding: 16px;
`;

const BlockHeader = styled(Block)`
  flex-direction: row;
`;

const HeaderLeft = styled.View`
  flex: 4;
`;

const HeaderRight = styled.View`
  flex: 3;
`;

const HeaderLeftDetails = styled(HorizontalView)`
  justify-content: space-between;
  margin-top: 16px;
`;

const Time = styled(HorizontalView)`
  align-items: center;
`;

const BlockLabel = styled(Text.M)`
  margin-bottom: 8px;
`;
*/

/*
import React, { Component } from 'react';
import { Alert, Image, ScrollView, Share, TouchableOpacity, View, Platform } from 'react-native';
import moment from 'moment';
import PropTypes from 'prop-types';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components';
import { connect } from 'react-redux';
import I18n from '../../I18n/index';
import Colors from '../../Themes/Colors';
import API from '../../Services/SeedorfApi';
import Text from '../../Components/Text';
import ImageSwiper from '../../Components/ImageSwiper';
import UserCircle from '../../Components/UserCircle';
import PropertyCircle from '../../Components/PropertyCircle';
import themeImages from '../../Themes/Images';
import DefaultButton from '../../Components/DefaultButton';
import PropTypeDefinitions from '../../PropTypesDefinitions';
import GET_GAME_DETAILS from '../../GraphQL/Games/Queries/GET_GAME_DETAILS';
import withQuery from '../../GraphQL/withQuery';
import SpotMapWithLinkFallback from '../../Components/Spots/SpotMapWithLinkFallback';
import config from '../../config';

const RSVP_STATUSES = {
  ATTENDING: 'ATTENDING',
  DECLINED: 'DECLINED',
};

const SpotOpenImage = () => (
  <Image source={themeImages.spotOpenCircle} style={{ width: 42, height: 42 }} />
);

const mapMax = (maxNum, data, fn, fnElse) => {
  if (maxNum >= data.length) return data.map(fn);

  const returnArr = data.slice(0, maxNum - 1).map(fn);
  returnArr.push(fnElse());
  return returnArr;
};

class GameComponent extends Component {
  static propTypes = {
    data: PropTypes.any.isRequired,
    style: PropTypes.any,
    navigation: PropTypeDefinitions.navigation,
    user: PropTypes.object,
    refetch: PropTypes.func,
  };

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     rating: 0,
  //   };
  // }

  openPlayerList = () => {
    this.props.navigation.navigate('GamePlayerScreen', {
      uuid: this.props.data.game.uuid,
    });
  };

  onShare = (game) => {
    const url = `https://${config.deeplinkHost}/games/${game.uuid}`;
    const message = `${I18n.t('You have been invited to a SportySpots game:')}: ${url}`;
    Share.share(
      {
        message,
        title: 'SportySpots',
      },
      {
        dialogTitle: I18n.t('share'),
      },
    );
  };

  get userRSVP() {
    for (const attendee of this.props.data.game.attendees) {
      if (attendee.user.uuid === this.props.user.uuid) {
        return attendee;
      }
    }
    return null;
  }

  get userStatus() {
    const attendee = this.userRSVP;
    if (attendee) {
      return attendee.status;
    }
    return null;
  }

  setRSVPStatus = async (status) => {
    const attendee = this.userRSVP;
    if (attendee) {
      await API.updateRSVPStatus({
        gameUUID: this.props.data.game.uuid,
        rsvpUUID: attendee.uuid,
        status,
      });
    } else {
      await API.setRSVPStatus({ gameUUID: this.props.data.game.uuid, status });
    }
    this.props.refetch();
  }

  rsvpBlock = () => {
    const status = this.userStatus;
    if (!status) {
      return (
        <Block>
          <HorizontalView style={{ width: '100%' }}>
            <DefaultButton
              style={{ flex: 1, marginLeft: -10 }}
              bgColor={Colors.primaryGreen}
              textColor={Colors.white}
              text={I18n.t("I'm attending")}
              onPress={() => !this.props.user.uuid ?
                this.props.navigation.navigate('ProfileTab') :
                this.setRSVPStatus(RSVP_STATUSES.ATTENDING)
              }
            />
            <DefaultButton
              style={{ flex: 1, marginRight: -10 }}
              bgColor={Colors.red}
              textColor={Colors.white}
              text={I18n.t("I'm not attending")}
              onPress={() => !this.props.user.uuid ?
                this.props.navigation.navigate('ProfileTab') :
                this.setRSVPStatus(RSVP_STATUSES.DECLINED)}
            />
          </HorizontalView>
        </Block>
      );
    }
    return (
      <Block>
        <HorizontalView style={{ width: '100%' }}>
          <DefaultButton
            style={{ flex: 1, marginLeft: -10 }}
            bgColor={status === RSVP_STATUSES.ATTENDING ? Colors.white : Colors.primaryGreen}
            textColor={status === RSVP_STATUSES.ATTENDING ? Colors.black : Colors.white}
            text={I18n.t(status === RSVP_STATUSES.ATTENDING ? "I'm not attending" : "I'm attending")}
            onPress={() => {
              if (status === RSVP_STATUSES.ATTENDING) {
                Alert.alert(
                  I18n.t('Confirm'),
                  I18n.t('Are you sure you want to stop attending?'),
                  [
                    { text: I18n.t('No'), onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                    { text: I18n.t('Yes'), onPress: () => this.setRSVPStatus(RSVP_STATUSES.DECLINED) },
                  ],
                );
              } else {
                this.setRSVPStatus(RSVP_STATUSES.ATTENDING);
              }
            }}
          />
        </HorizontalView>
      </Block>
    );
  }

  render() {
    const game = this.props.data.game;
    const spot = game.spot;
    const images =
      spot.images.length > 0
        ? spot.images.map(image => image.image)
        : [
          'https://raw.githubusercontent.com/SportySpots/cruijff/graphql/App/Images/spot-placeholder.png',
        ];

    const attendingUsers = game.attendees
      ? game.attendees
        .filter(rsvp => rsvp.status === 'ATTENDING')
        .map(rsvp => rsvp.user)
      : [];

    const nOpenSpots = Math.max(0, game.capacity - attendingUsers.length);
    return (
      <ScrollView style={this.props.style}>
        <SwiperContainer>
          <ImageSwiper images={images} />
        </SwiperContainer>
        <BlockHeader>
          <HeaderLeft>
            <Text.M>{spot.name}</Text.M>
            <HeaderLeftDetails>
              <Text.SM>{moment(game.start_time).format('D MMM')}</Text.SM>
              <Time>
                <MaterialIcon name="access-time" style={{ paddingRight: 4 }} />
                <Text.SM>
                  {moment(game.start_time).format('HH')} - {moment(game.end_time).format('HH')}
                </Text.SM>
              </Time>
              <Text.SM>{I18n.t(game.sport.category)}</Text.SM>
            </HeaderLeftDetails>
          </HeaderLeft>
          <HeaderRight />
        </BlockHeader>
        <SpotMapWithLinkFallback spot={spot} />
        <Block>
          <BlockLabel>{I18n.t('Organizer')}</BlockLabel>
          <TouchableOpacity onPress={this.openPlayerList}>
            <HorizontalView>
              <UserCircle user={game.organizer} style={{ marginRight: 16 }} />
              <View style={{ flex: 1 }}>
                <Text.SM>
                  {game.organizer.first_name} {game.organizer.last_name} -{' '}
                  {game.description || ''}
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
                  7,
                  attendingUsers,
                  user => <UserCircle key={user.uuid} user={user} style={{ marginRight: 4 }} />,
                  () => <PropertyCircle key="extra" text={`+${attendingUsers.length - 6}`} />,
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
                  7,
                  [...Array(nOpenSpots)],
                  (_, i) => <SpotOpenImage key={i} />,
                  () => <PropertyCircle key="extra" text={`+${nOpenSpots - 6}`} />,
                )}
              </HorizontalView>
            </TouchableOpacity>
          </Block>
        )}
        { this.rsvpBlock() }
        <Block>
          <BlockLabel>{I18n.t('Share with friends')}</BlockLabel>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.gray,
              height: 48,
              width: 48,
              borderRadius: 48,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => this.onShare(game)}
          >
            <MaterialIcon size={32} color={Colors.white} name="share" />
          </TouchableOpacity>
        </Block>
      </ScrollView>
    );
  }
}

const GameDetailsScreen = connect(state => ({ user: state.user }))(
  (props) => {
    const Contents = withQuery(GET_GAME_DETAILS)(GameComponent);
    return (
      <Contents
        {...props}
        variables={{ uuid: props.navigation.state.params.uuid }}
      />
    );
  },
);

export default GameDetailsScreen;

const HorizontalView = styled.View`
  flex-direction: row;
`;

const SwiperContainer = styled.View`
  height: 150px;
  width: 100%;
`;

const Block = styled.View`
  padding: 16px;
`;

const BlockHeader = styled(Block)`
  flex-direction: row;
`;

const HeaderLeft = styled.View`
  flex: 4;
`;

const HeaderRight = styled.View`
  flex: 3;
`;

const HeaderLeftDetails = styled(HorizontalView)`
  justify-content: space-between;
  margin-top: 16px;
`;

const Time = styled(HorizontalView)`
  align-items: center;
`;

const BlockLabel = styled(Text.M)`
  margin-bottom: 8px;
`;
*/
