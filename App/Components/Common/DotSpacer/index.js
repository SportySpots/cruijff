import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Colors from '../../../Themes/Colors';
import Text from '../Text';
import getPixelsFromSize from './utils';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  margin-horizontal: ${({ size }) => (getPixelsFromSize(size))}px;
`;
//------------------------------------------------------------------------------
const StyledText = styled(Text.M)`
  color: ${Colors.shade};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const DotSpacer = ({ size }) => (
  <Container size={size}>
    <StyledText>·</StyledText>
  </Container>
);

DotSpacer.propTypes = {
  size: PropTypes.oneOf(['S', 'M', 'L']),
};

DotSpacer.defaultProps = {
  size: 'M',
};

export default DotSpacer;

