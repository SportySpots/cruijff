import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import Text from '../../../../../Components/Text';
import I18n from '../../../../../I18n/index';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  height: 44px;
  justify-content: center;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const SportCard = ({ sport, onSelect }) => (
  <TouchableOpacity onPress={() => onSelect(sport)}>
    <Container>
      <Text.M>{I18n.t(sport.name)}</Text.M>
    </Container>
  </TouchableOpacity>
);

SportCard.propTypes = {
  sport: PropTypes.shape({
    uuid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
  onSelect: PropTypes.func,
};

SportCard.defaultProps = {
  onSelect: () => {},
};

export default SportCard;
