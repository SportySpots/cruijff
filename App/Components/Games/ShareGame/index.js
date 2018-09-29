import React from 'react';
import { propType } from 'graphql-anywhere';
import { Share } from 'react-native';
import config from '../../../config';
import I18n from '../../../I18n';
import RoundButton from '../../Common/RoundButton';
import gameDetailsFragment from '../../../GraphQL/Games/Fragments/gameDetails';

//------------------------------------------------------------------------------
// AUX FUNCTION:
//------------------------------------------------------------------------------
const handleShare = (game) => {
  const url = `https://${config.deeplinkHost}/games/${game.uuid}`;
  const message = `${I18n.t('You have been invited to a SportySpots game:')} ${url}`;
  Share.share(
    { message, title: 'SportySpots' },
    { dialogTitle: I18n.t('share') },
  );
};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const ShareGame = ({ game }) => (
  <RoundButton
    size="L"
    status="secondary"
    iconName="share-variant"
    onPress={() => { handleShare(game); }}
  />
);

ShareGame.propTypes = {
  game: propType(gameDetailsFragment).isRequired,
};

export default ShareGame;
