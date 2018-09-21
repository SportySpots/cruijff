import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import I18n from '../../../I18n/index';
import gameDetailsFragment from '../../../GraphQL/Games/Fragments/gameDetails';
import SpotImages from '../../Spots/SpotImages';
import SpotMapWithLinkFallback from '../../Spots/SpotMapWithLinkFallback';
import GameProperties from '../GameProperties';
import OrganizerAndDescription from '../OrganizerAndDescription';
import ClickableAttendees from '../ClickableAttendees';
import OpenSpots from '../OpenSpots';
import RSPV from '../RSPV';
import ShareGame from '../ShareGame';
import Block from '../../Common/Block';
import Label from '../../Common/Label';
import AlertMsg from '../../Common/AlertMsg';
import { getAttendees } from '../utils';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class GameDetails extends React.Component {
  render() {
    const {
      game,
      user,
      onSpotPress,
      onAttendeesPress,
      rspvBeforeHook,
      rspvSuccessHook,
    } = this.props;


    const isCanceled = game.status === 'CANCELED';
    const hasCapacity = game.capacity && game.capacity > 0;
    const withAttendees = getAttendees(game).length > 0;

    return [
      <SpotImages key="spot-images" spot={game.spot} />,
      isCanceled && (
        <Block key="alert-warning">
          <AlertMsg
            value={`${I18n.t('This activity is canceled')}.`}
            status="error"
          />
        </Block>
      ),
      <Block key="game-properties">
        <GameProperties game={game} onSpotPress={onSpotPress} />
      </Block>,
      <SpotMapWithLinkFallback key="spot-map" spot={game.spot} />,
      <Block key="game-organizer">
        <Label>{I18n.t('Organizer')}</Label>
        <OrganizerAndDescription
          organizer={game.organizer}
          description={game.description}
        />
      </Block>,
      withAttendees && [
        <Block key="game-attendees">
          <Label>{I18n.t('Attending')}</Label>
          <ClickableAttendees
            game={game}
            onAttendeesPress={onAttendeesPress}
          />
        </Block>,
      ],
      hasCapacity && [
        <Block key="open-spots">
          <Label>{I18n.t('Open spots')}</Label>
          <OpenSpots game={game} />
        </Block>,
      ],
      !isCanceled && (
        <Block key="rspv">
          <Label>{I18n.t('Do you join?')}</Label>
          <RSPV
            game={game}
            user={user}
            onBeforeHook={rspvBeforeHook}
            onSuccessHook={rspvSuccessHook}
          />
        </Block>
      ),
      <Block key="share">
        <Label>{I18n.t('Share with friends')}</Label>
        <ShareGame
          game={game}
          size={55}
        />
      </Block>,
    ];
  }
}

GameDetails.propTypes = {
  user: PropTypes.shape({
    uuid: PropTypes.string,
  }).isRequired,
  game: propType(gameDetailsFragment).isRequired,
  onSpotPress: PropTypes.func,
  onAttendeesPress: PropTypes.func,
  rspvBeforeHook: PropTypes.func,
  rspvSuccessHook: PropTypes.func,
};

GameDetails.defaultProps = {
  onSpotPress: () => {
  },
  onAttendeesPress: () => {
  },
  rspvBeforeHook: () => {
  },
  rspvSuccessHook: () => {
  },
};

export default GameDetails;
