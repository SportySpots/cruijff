import React from 'react';
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
const HeaderLeft = () => (
  <Container>
    <Icon name="search" size={24} color="black" />
  </Container>
);

export default HeaderLeft;
