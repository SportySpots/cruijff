import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Colors from '../Themes/Colors';
import Text from './Common/Text';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Circle = styled.View`
  width: ${props => props.size};
  height: ${props => props.size};
  border-radius: ${props => props.size};
  background-color: ${Colors.primaryGreen};
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
//------------------------------------------------------------------------------
const Content = styled(Text.S)`
  color: ${Colors.white};
  font-size: 12px;
  padding: 4px;
  text-align: center;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const PropertyCircle = ({ text, size, style }) => (
  <Circle size={size} style={style}>
    <Content>{text}</Content>
  </Circle>
);

PropertyCircle.propTypes = {
  text: PropTypes.string,
  size: PropTypes.number,
  style: PropTypes.object,
};

PropertyCircle.defaultProps = {
  text: '',
  size: 40,
  style: {},
};

export default PropertyCircle;
