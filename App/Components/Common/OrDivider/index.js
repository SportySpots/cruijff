import React from 'react';
import styled from 'styled-components/native';
import I18n from '../../../I18n';
import Row from '../Row';
import Spacer from '../Spacer';
import Divider from '../Divider';
import Text from '../Text';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const StyledDivider = styled(Divider)`
  flex-grow: 1;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const OrDivider = () => (
  <Row alignItems="center">
    <StyledDivider />
    <Spacer row size="M" />
    <Text size="M">
      {I18n.t('orDivider.txt')}
    </Text>
    <Spacer row size="M" />
    <StyledDivider />
  </Row>
);

export default OrDivider;
