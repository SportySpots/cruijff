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
import ShareGameButton from '../ShareGameButton';
import Block from '../../Common/Block';
import Label from '../../Common/Label';
import AlertMsg from '../../Common/AlertMsg';
import { getAttendees } from '../utils';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class GameDetails extends React.PureComponent {
  /**
    * @summary Check whether or not user is attending
    */
  get userRSVP() {
    const { user, game } = this.props;

    for (const attendee of game.attendees) {
      if (user && attendee.user.uuid === user.uuid) {
        return attendee;
      }
    }
    return null;
  }

  get userStatus() {
    const attendee = this.userRSVP;
    return attendee ? attendee.status : null;
  }

  render() {
    const {
      game,
      onSpotPress,
      onAttendeesPress,
      rsvpBeforeHook,
      rsvpSuccessHook,
    } = this.props;

    const isCanceled = game.status === 'CANCELED';
    const hasCapacity = game.capacity && game.capacity > 0;
    const attendees = getAttendees(game.attendees);

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
      attendees.length > 0 && [
        <Block key="game-attendees">
          <Label>{I18n.t('Attending')}</Label>
          <ClickableAttendees
            attendees={attendees}
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
          <Label>
            {I18n.t(!this.userStatus ? 'Do you join?' : 'Edit presence')}
          </Label>
          <RSPV
            gameUUID={game.uuid}
            userRSVP={this.userRSVP}
            userStatus={this.userStatus}
            onBeforeHook={rsvpBeforeHook}
            onSuccessHook={rsvpSuccessHook}
          />
        </Block>
      ),
      <Block key="share">
        <Label>{I18n.t('Share with friends')}</Label>
        <ShareGameButton gameUUID={game.uuid} />
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
  rsvpBeforeHook: PropTypes.func,
  rsvpSuccessHook: PropTypes.func,
};

GameDetails.defaultProps = {
  onSpotPress: () => {},
  onAttendeesPress: () => {},
  rsvpBeforeHook: () => {},
  rsvpSuccessHook: () => {},
};

export default GameDetails;
