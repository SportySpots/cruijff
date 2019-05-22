import React from 'react';
import PropTypes from 'prop-types';
import SliderNative from '@react-native-community/slider';
import Colors from '../../../Themes/Colors';
import Row from '../Row';
import Text from '../Text';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class Slider extends React.Component {
  shouldComponentUpdate() {
    // Do not update on value change after mount
    return false;
  }

  render() {
    const { minimumValue, maximumValue, ...rest } = this.props;

    return [
      <SliderNative
        key="slider"
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        minimumTrackTintColor={Colors.primaryGreen}
        thumbTintColor={Colors.primaryGreen}
        style={{ marginHorizontal: -10 }}
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
  }
}

Slider.propTypes = {
  minimumValue: PropTypes.number.isRequired,
  maximumValue: PropTypes.number.isRequired,
  // Plus all props from react-native-slider
};

export default Slider;
