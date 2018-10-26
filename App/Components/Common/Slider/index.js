import React from 'react';
import PropTypes from 'prop-types';
import SliderNative from 'react-native-slider';
import Colors from '../../../Themes/Colors';
import Row from '../Row';
import Text from '../Text';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// See https://github.com/jeanregisser/react-native-slider instead
const Slider = ({ minimumValue, maximumValue, ...rest }) => [
  <SliderNative
    key="slider"
    minimumValue={minimumValue}
    maximumValue={maximumValue}
    minimumTrackTintColor={Colors.primaryGreen}
    thumbTintColor={Colors.primaryGreen}
    trackStyle={{ height: 1 }}
    style={{ height: 20 }}
    {...rest}
  />,
  <Row
    key="labels"
    justifyContent="space-between"
  >
    <Text>{minimumValue}</Text>
    <Text>{maximumValue}</Text>
  </Row>,
];

Slider.propTypes = {
  minimumValue: PropTypes.number.isRequired,
  maximumValue: PropTypes.number.isRequired,
  // Plus all props from react-native-slider
};

export default Slider;
