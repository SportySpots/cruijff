import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import Text from '../Text';
import getPixelsFromSize from './utils';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.View`
  margin-horizontal: ${({ size }) => (getPixelsFromSize(size))}px;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const DotSpacer = ({ size }) => (
  <Container size={size}>
    <Text size="M" color="shade">·</Text>
  </Container>
);

DotSpacer.propTypes = {
  size: PropTypes.oneOf(['S', 'M', 'L']),
};

DotSpacer.defaultProps = {
  size: 'M',
};

export default DotSpacer;
