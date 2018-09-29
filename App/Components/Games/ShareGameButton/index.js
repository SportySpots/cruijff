import React from 'react';
import { propType } from 'graphql-anywhere';
import RoundButton from '../../Common/RoundButton';
import gameDetailsFragment from '../../../GraphQL/Games/Fragments/gameDetails';
import handleShare from './utils';

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
