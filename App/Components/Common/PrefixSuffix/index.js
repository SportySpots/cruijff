import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Fonts from '../../../Themes/Fonts';
import Colors from '../../../Themes/Colors';
import Text from '../Text';
import Row from '../Row';
import Spacer from '../Spacer';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const StyledText = styled(Text)`
  color: ${({ color }) => (color)}
  font-size: ${({ size }) => (Fonts.style[size].fontSize)}
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const PrefixSuffix = ({
  children,
  prefix,
  suffix,
  size,
  color,
}) => (
  <Row>
    <StyledText size={size} color={color}>
      {prefix}
    </StyledText>
    <Spacer orientation="row" size="S" />
    {children}
    <Spacer orientation="row" size="S" />
    <StyledText size={size} color={color}>
      {suffix}
    </StyledText>
  </Row>
);

PrefixSuffix.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]).isRequired,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  size: PropTypes.oneOf(Object.keys(Fonts.style)),
  color: PropTypes.string,
};

PrefixSuffix.defaultProps = {
  prefix: '',
  suffix: '',
  size: 'M',
  color: Colors.black,
};

export default PrefixSuffix;
