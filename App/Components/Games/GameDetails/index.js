import React from 'react';
import {
  Alert,
  Image,
  ScrollView,
  Share,
  TouchableOpacity,
  View,
} from 'react-native';
// import moment from 'moment';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components';
import I18n from '../../../I18n/index';
import Colors from '../../../Themes/Colors';
import API from '../../../Services/SeedorfApi';
import Text from '../../../Components/Text';
import gameDetailsFragment from '../../../GraphQL/Games/Fragments/gameDetails';
import ImageSwiper from '../../../Components/ImageSwiper';
import UserCircle from '../../../Components/UserCircle';
import PropertyCircle from '../../../Components/PropertyCircle';
import themeImages from '../../../Themes/Images';
import DefaultButton from '../../../Components/DefaultButton';
import SpotMapWithLinkFallback from '../../../Components/Spots/SpotMapWithLinkFallback';
import config from '../../../config';
import GameProperties from '../../../Components/Games/GameProperties';
import Attendees from './Attendees';
import RSPV from './RSPV';

const RSVP_STATUSES = {
  ATTENDING: 'ATTENDING',
  DECLINED: 'DECLINED',
};

const HorizontalView = styled.View`
  flex-direction: row;
`;

const ChevronContainer = styled(HorizontalView)`
  justify-content: center;
  align-items: center;
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

const SpotOpenImage = () => (
  <Image source={themeImages.spotOpenCircle} style={{ width: 42, height: 42, marginRight: 4 }} />
);

const mapMax = (maxNum, data, fn, fnElse) => {
  if (maxNum >= data.length) return data.map(fn);

  const returnArr = data.slice(0, maxNum - 1).map(fn);
  returnArr.push(fnElse());
  return returnArr;
};

class GameDetails extends React.PureComponent {
  onShare = (game) => {
    const url = `https://${config.deeplinkHost}/games/${game.uuid}`;
    const message = `${I18n.t('You have been invited to a SportySpots game:')} ${url}`;
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

  render() {
    const {
      game,
      user,
      onAttendeesPress,
      onRSPVBtnPress,
    } = this.props;

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
      <ScrollView style={{ ...this.props.style, backgroundColor: Colors.white }}>
        <SwiperContainer>
          <ImageSwiper images={images} />
        </SwiperContainer>
        <Block>
          <GameProperties game={game} />
        </Block>
        <SpotMapWithLinkFallback spot={spot} />
        <Block>
          <BlockLabel>{I18n.t('Organizer')}</BlockLabel>
          <HorizontalView>
            <UserCircle user={game.organizer} style={{ marginRight: 16 }} />
            <View style={{ flex: 1 }}>
              <Text.SM>
                {game.organizer.first_name} {game.organizer.last_name} -{' '}
                {game.description || ''}
              </Text.SM>
            </View>
          </HorizontalView>
        </Block>
        <Attendees
          game={game}
          onAttendeesPress={onAttendeesPress}
        />
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
        <RSPV
          game={game}
          user={user}
          onRSPVBtnPress={onRSPVBtnPress}
        />
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

GameDetails.propTypes = {
  user: PropTypes.shape({
    uuid: PropTypes.string,
  }).isRequired,
  game: propType(gameDetailsFragment).isRequired,
  onAttendeesPress: PropTypes.func,
  onRSPVBtnPress: PropTypes.func,
};

GameDetails.defaultProps = {
  onAttendeesPress: () => {},
  onRSPVBtnPress: () => {},
};

export default GameDetails;
