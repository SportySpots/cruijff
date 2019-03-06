import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Colors from '../../../Themes/Colors';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const triangleTopLeft = {
  width: 0,
  height: 0,
  backgroundColor: 'transparent',
  borderStyle: 'solid',
  borderRightWidth: 10,
  borderTopWidth: 10,
  borderRightColor: 'transparent',
  borderTopColor: 'red',
};
//------------------------------------------------------------------------------
const topRight = {
  transform: [
    { rotate: '90deg' },
  ],
};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// See: https://codedaily.io/tutorials/22/The-Shapes-of-React-Native
const Triangle = ({ position, primary }) => {
  const color = { borderTopColor: Colors[primary ? 'notify' : 'white'] };
  const style = position === 'top-left' ? {} : topRight;

  return (
    <View style={[triangleTopLeft, color, style]} />
  );
};

Triangle.propTypes = {
  position: PropTypes.oneOf('top-right', 'top-left'),
  primary: PropTypes.bool,
};

Triangle.defaultProps = {
  position: 'top-left',
  primary: false,
};

export default Triangle;
