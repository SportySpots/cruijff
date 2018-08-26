import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import I18n from '../../../I18n/index';
import gameDetailsFragment from '../../../GraphQL/Games/Fragments/gameDetails';
import GameProperties from '../GameProperties';
import Attendees from '../Attendees';
import CancelMsg from '../CancelMsg';
import Block from '../../Common/Block';
import Divider from '../../Common/Divider';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const CancelGame = ({
  game,
  cancelMsg,
  onSpotPress,
  onAttendeesPress,
  onCancelMsgChange,
}) => [
  <Block key="game-properties">
    <GameProperties game={game} onSpotPress={onSpotPress} />
  </Block>,
  <Divider key="divider-game-properties" />,
  <Block key="game-attendees">
    <Attendees
      game={game}
      onAttendeesPress={onAttendeesPress}
    />
  </Block>,
  <Block key="cancel-msg">
    <CancelMsg
      value={cancelMsg}
      onChangeText={onCancelMsgChange}
    />
  </Block>,
];

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
