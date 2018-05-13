import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialIcons';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.Text`
  padding: 20px;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const HeaderRight = ({ navigation, icon, to }) => (
  <Container onPress={() => { navigation.navigate(to); }}>
    <Icon name={icon} size={24} color="black" />
  </Container>
);

HeaderRight.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  icon: PropTypes.string.isRequired,
  to: PropTypes.oneOf([
    'SpotsListScreen',
    'SpotsMapScreen',
  ]).isRequired,
};

export default HeaderRight;
