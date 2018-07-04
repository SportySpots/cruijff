import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import I18n from '../../../I18n/index';
import gameDetailsFragment from '../../../GraphQL/Games/Fragments/gameDetails';
import SpotImages from '../../Spots/SpotImages';
import SpotMapWithLinkFallback from '../../Spots/SpotMapWithLinkFallback';
import GameProperties from '../../Games/GameProperties';
import Organizer from './Organizer';
import Attendees from './Attendees';
import OpenSpots from './OpenSpots';
import RSPV from './RSPV';
import ShareGame from './ShareGame';
import { Block, BlockLabel, HorizontalView } from './style';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const ATTENDEES_TO_SHOW = 7;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const GameDetails = ({
  game,
  user,
  onAttendeesPress,
  onOpenSpotsPress,
  rspvBeforeHook,
  rspvSuccessHook,
  navigation,
}) => [
  <SpotImages
    key="spot-img"
    spot={game.spot}
  />,
  <Block key="game-props">
    <GameProperties game={game} navigation={navigation} />
  </Block>,
  <SpotMapWithLinkFallback
    key="spot-map"
    spot={game.spot}
  />,
  <Block key="organizer">
    <BlockLabel key="label">{I18n.t('Organizer')}</BlockLabel>
    <Organizer game={game} />
  </Block>,
  <Block key="attendees">
    <Attendees
      game={game}
      maxLength={ATTENDEES_TO_SHOW}
      onAttendeesPress={onAttendeesPress}
    />
  </Block>,
  <Block key="open-spots">
    <OpenSpots
      game={game}
      maxLength={ATTENDEES_TO_SHOW}
      onOpenSpotsPress={onOpenSpotsPress}
    />
  </Block>,
  <Block key="rspv">
    <BlockLabel key="label">{I18n.t('Do you join?')}</BlockLabel>
    <HorizontalView style={{ width: '100%' }}>
      <RSPV
        game={game}
        user={user}
        onBeforeHook={rspvBeforeHook}
        onSuccessHook={rspvSuccessHook}
      />
    </HorizontalView>
  </Block>,
  <Block key="share">
    <BlockLabel>{I18n.t('Share with friends')}</BlockLabel>
    <ShareGame
      game={game}
      size={55}
    />
  </Block>,
];

GameDetails.propTypes = {
  user: PropTypes.shape({
    uuid: PropTypes.string,
  }).isRequired,
  game: propType(gameDetailsFragment).isRequired,
  onAttendeesPress: PropTypes.func,
  onOpenSpotsPress: PropTypes.func,
  rspvBeforeHook: PropTypes.func,
  rspvSuccessHook: PropTypes.func,
  navigation: PropTypes.any,
};

GameDetails.defaultProps = {
  onAttendeesPress: () => {},
  onOpenSpotsPress: () => {},
  rspvBeforeHook: () => {},
  rspvSuccessHook: () => {},
};

export default GameDetails;
