import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';
import I18n from '../../../I18n/index';
import gameDetailsFragment from '../../../GraphQL/Games/Fragments/gameDetails';
import SpotImages from '../../Spots/SpotImages';
import SpotMapWithLinkFallback from '../../Spots/SpotMapWithLinkFallback';
import Block from '../../Common/Block';
import Label from '../../Common/Label';
import Text from '../../Common/Text';
import AlertMsg from '../../Common/AlertMsg';
import GameProperties from '../GameProperties';
import Organizer from '../Organizer';
import DescriptionReadMore from '../DescriptionReadMore';
import ClickableAttendees from '../ClickableAttendees';
import OpenSpots from '../OpenSpots';
import ShareGameButton from '../ShareGameButton';
import RSVP from '../RSVP';
import { getAttendees } from '../utils';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const NoOpenSpots = styled(Text.M)`
  font-family: Rajdhani-Regular;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const GameDetails = ({
  game,
  user,
  userRSVP,
  userStatus,
  onSpotPress,
  onAttendeesPress,
  onRSVPLoggedOut,
  onRSVPSuccess,
}) => {
  const hasCapacity = game.capacity && game.capacity > 0;
  const attendees = getAttendees(game.attendees);
  const isCanceled = game.status === 'CANCELED';
  const isFull = game.capacity && game.capacity > 0 && game.capacity === attendees.length;

  return [
    <SpotImages
      key="spot-images"
      images={(game.spot && game.spot.images) || []}
    />,
    isCanceled && (
      <Block key="alert-warning">
        <AlertMsg
          value={`${I18n.t('gameDetails.cancelMsg')}.`}
          status="error"
        />
      </Block>
    ),
    <Block key="game-properties">
      <GameProperties game={game} onSpotPress={onSpotPress} />
    </Block>,
    <SpotMapWithLinkFallback key="spot-map" spot={game.spot} />,
    <Block key="game-organizer">
      <Label>{I18n.t('gameDetails.organizer')}</Label>
      <Organizer
        organizer={game.organizer}
        description={game.description}
      />
    </Block>,
    !!game.description && game.description.length > 0 && [
      <Block key="game-description">
        <Label>{I18n.t('gameDetails.description')}</Label>
        <DescriptionReadMore description={game.description} />
      </Block>,
    ],
    attendees.length > 0 && [
      <Block key="game-attendees">
        <Label>{I18n.t('gameDetails.attending')}</Label>
        <ClickableAttendees
          attendees={attendees}
          onAttendeesPress={onAttendeesPress}
        />
      </Block>,
    ],
    hasCapacity && [
      <Block key="open-spots">
        <Label>{I18n.t('gameDetails.openSpots')}</Label>
        <OpenSpots game={game} />
        {isFull && (
          <NoOpenSpots>
            {I18n.t('gameDetails.fullMsg')}
          </NoOpenSpots>
        )}
      </Block>,
    ],
    (!isCanceled && (!isFull || (isFull && userStatus === 'ATTENDING'))) && (
      <Block key="rsvp">
        <Label>
          {I18n.t(!userStatus ? 'gameDetails.join' : 'gameDetails.edit')}
        </Label>
        <RSVP
          gameUUID={game.uuid}
          user={user}
          userRSVP={userRSVP}
          userStatus={userStatus}
          onRSVPLoggedOut={onRSVPLoggedOut}
          onRSVPSuccess={onRSVPSuccess}
        />
      </Block>
    ),
    <Block key="share">
      <Label>{I18n.t('gameDetails.share')}</Label>
      <ShareGameButton gameUUID={game.uuid} />
    </Block>,
  ];
};

GameDetails.propTypes = {
  game: propType(gameDetailsFragment).isRequired,
  user: PropTypes.object, // eslint-disable-line
  userRSVP: PropTypes.object, // eslint-disable-line
  userStatus: PropTypes.oneOf([
    'UNKNOWN',
    'ACCEPTED',
    'ATTENDING',
    'CHECKED_IN',
    'DECLINED',
    'INTERESTED',
    'INVITED',
  ]),
  onSpotPress: PropTypes.func,
  onAttendeesPress: PropTypes.func,
  onRSVPLoggedOut: PropTypes.func,
  onRSVPSuccess: PropTypes.func,
};

GameDetails.defaultProps = {
  user: null,
  userRSVP: null,
  userStatus: null,
  onSpotPress: () => {},
  onAttendeesPress: () => {},
  onRSVPLoggedOut: () => {},
  onRSVPSuccess: () => {},
};

export default GameDetails;
