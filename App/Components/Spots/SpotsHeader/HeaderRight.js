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
const HeaderRight = ({ icon, onPress }) => (
  <Container onPress={onPress}>
    <Icon name={icon} size={24} color="black" />
  </Container>
);

HeaderRight.propTypes = {
  icon: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};

HeaderRight.defaultProps = {
  onPress: () => {},
};

export default HeaderRight;
