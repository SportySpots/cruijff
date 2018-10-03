import React from 'react';
import PropTypes from 'prop-types';
import RoundButton from '../../Common/RoundButton';
import handleShare from './utils';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const ShareGame = ({ gameUUID }) => (
  <RoundButton
    size="L"
    status="default"
    iconName="link-variant"
    onPress={() => { handleShare(gameUUID); }}
  />
);

ShareGame.propTypes = {
  gameUUID: PropTypes.string.isRequired,
};

export default ShareGame;
