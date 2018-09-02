import React from 'react';
import styled from 'styled-components';
import Colors from '../../../Themes/Colors';
import Text from '../Text';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  margin-horizontal: 8px;
`;
//------------------------------------------------------------------------------
const StyledText = styled(Text.M)`
  color: ${Colors.shade};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const DotSpacer = () => (
  <Container>
    <StyledText>·</StyledText>
  </Container>
);

export default DotSpacer;

