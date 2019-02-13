import React from 'react';
import styled from 'styled-components';
import I18n from '../../../I18n';
import Colors from '../../../Themes/Colors';
import Spacer from '../Spacer';
import Text from '../Text';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
//------------------------------------------------------------------------------
const Line = styled.View`
  border-bottom-width: 2px;
  border-bottom-color: ${Colors.silver};
  flex-grow: 1;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const OrDivider = () => (
  <Container>
    <Line />
    <Spacer row size="M" />
    <Text.M>{I18n.t('orDivider.txt')}</Text.M>
    <Spacer row size="M" />
    <Line />
  </Container>
);

export default OrDivider;
