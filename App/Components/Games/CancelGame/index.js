import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import I18n from '../../../I18n';
import gameDetailsFragment from '../../../GraphQL/Games/Fragments/gameDetails';
import GameProperties from '../GameProperties';
import ClickableAttendees from '../ClickableAttendees';
import CancelMsg from '../CancelMsg';
import Block from '../../Common/Block';
import Divider from '../../Common/Divider';
import Label from '../../Common/Label';
import AlertMsg from '../../Common/AlertMsg';
import { getAttendees } from '../utils';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const CancelGame = ({
  game,
  cancelMsg,
  onSpotPress,
  onAttendeesPress,
  onCancelMsgChange,
}) => {
  const withAttendees = getAttendees(game).length > 0;

  return [
    <Block key="game-properties">
      <GameProperties game={game} onSpotPress={onSpotPress} />
    </Block>,
    withAttendees && [
      <Divider key="divider-game-attendees" />,
      <Block key="game-attendees">
        <Label>{I18n.t('Attending')}</Label>
        <ClickableAttendees
          game={game}
          onAttendeesPress={onAttendeesPress}
        />
      </Block>,
      <Divider key="divider-cancel-msg" />,
      <Block key="cancel-msg">
        <CancelMsg
          value={cancelMsg}
          onChangeText={onCancelMsgChange}
        />
      </Block>,
      <Divider key="divider-alert-warning" />,
      <Block key="alert-warning">
        <AlertMsg
          value={`${I18n.t('All attendees will receive an email update with your reason for cancellation')}.`}
          status="warning"
        />
      </Block>,
    ],
  ];
};

CancelGame.propTypes = {
  game: propType(gameDetailsFragment).isRequired,
  cancelMsg: PropTypes.string,
  onSpotPress: PropTypes.func,
  onAttendeesPress: PropTypes.func,
  onCancelMsgChange: PropTypes.func,
};

CancelGame.defaultProps = {
  cancelMsg: '',
  onSpotPress: () => {},
  onAttendeesPress: () => {},
  onCancelMsgChange: () => {},
};

export default CancelGame;
