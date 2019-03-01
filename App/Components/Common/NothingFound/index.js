import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';
import Colors from '../../../Themes/Colors';
import Text from '../Text';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  height: 100%;
  justify-content: center;
  align-items: center;
`;
//------------------------------------------------------------------------------
const NotFoundText = styled(Text.L)`
  color: ${Colors.link};
  text-align: center;
`;
//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const NothingFound = ({ icon, text }) => (
  <Container>
    <Icon name={icon} size={96} color={Colors.link} />
    <NotFoundText>{text}</NotFoundText>
  </Container>
);

NothingFound.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default NothingFound;
