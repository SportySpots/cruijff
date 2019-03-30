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
// COMPONENT:
//------------------------------------------------------------------------------
const NothingFound = ({ icon, text }) => (
  <Container>
    <Icon name={icon} size={96} color={Colors.link} />
    <Text size="L" color="link" center>
      {text}
    </Text>
  </Container>
);

NothingFound.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default NothingFound;
