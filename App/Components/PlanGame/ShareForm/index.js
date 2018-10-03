import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import I18n from '../../../I18n';
import Colors from '../../../Themes/Colors';
import Row from '../../Common/Row';
import Text from '../../Common/Text';
import Spacer from '../../Common/Spacer';
import ShareGameButton from '../../Games/ShareGameButton';

// import ShareLink from '../ShareLink';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Subtitle = styled(Text.ML)`
  color: ${Colors.white};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const ShareForm = ({ gameUUID, onChange }) => [
  <Spacer key="sport-spacer" size="XXXL" />,
  <Row
    key="subtitle"
    alignItems="center"
  >
    <Icon
      name="share-variant"
      size={35}
      color={Colors.white}
    />
    <Spacer orientation="row" size="L" />
    <Subtitle>{I18n.t('invite via')}</Subtitle>
  </Row>,
  <Spacer
    key="spacer-share-btn"
    orientation="column"
    size="XXL"
  />,
  <ShareGameButton
    key="share-btn"
    gameUUID={gameUUID}
  />,
  /* <ShareLink
    key="link"
    link={link}
  />, */
];

ShareForm.propTypes = {
  gameUUID: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

ShareForm.defaultProps = {
  onChange: () => {},
};

export default ShareForm;
