import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { Share, TouchableOpacity } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components';
import config from '../../../config';
import I18n from '../../../I18n';
import Colors from '../../../Themes/Colors';
import gameDetailsFragment from '../../../GraphQL/Games/Fragments/gameDetails';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Button = styled(TouchableOpacity)`
  height: ${props => props.size};
  width: ${props => props.size};
  border-radius: ${props => props.size};
  background-color: ${Colors.gray};
  align-items: center;
  justify-content: center;
`;
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
const ShareGame = ({ game, size }) => (
  <Button
    size={size}
    onPress={() => { handleShare(game); }}
  >
    <MaterialIcon
      size={32}
      color={Colors.white}
      name="share"
    />
  </Button>
);

ShareGame.propTypes = {
  game: propType(gameDetailsFragment).isRequired,
  size: PropTypes.number,
};

ShareGame.defaultProps = {
  size: 48,
};

export default ShareGame;
