import React from 'react';
import PropTypes from 'prop-types';
import SliderNative from 'react-native-slider';
// import styled from 'styled-components';
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
    trackStyle={{
      height: 1,
      borderRadius: 1,
    }}
    thumbStyle={{
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 2,
      shadowOpacity: 0.35,
      elevation: 2,
    }}
    style={{
      height: 20,
    }}
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

/*
import React from 'react';
import { Animated, PanResponder, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Colors from '../../../Themes/Colors';

const handleSize = 25;

export default class Slider extends React.Component {
  static propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
  };
  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.Value(0),
      width: 1,
      initialized: false,
    };

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => !props.disabled,
      onMoveShouldSetPanResponderCapture: () => !props.disabled,
      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.extractOffset();
      },
      onPanResponderMove: Animated.event([null, { dx: this.state.pan }]),
      onPanResponderRelease: (e, { vx, vy }) => {
        this.state.pan.flattenOffset();
        // clamp the value between 0 and max width
        this.state.pan.setValue(Math.max(Math.min(this.state.width, this.state.pan._value), 0));
        this.props.onChange && this.props.onChange(this.state.pan._value / this.state.width);
      },
    });
  }

  render() {
    const sliderX = this.state.pan.interpolate({
      inputRange: [0, this.state.width],
      outputRange: [0, this.state.width],
      extrapolate: 'clamp',
    });

    return (
      <View
        onLayout={(e) => {
          const width = e.nativeEvent.layout.width - handleSize;
          this.state.pan.setValue(width * (typeof this.props.value !== 'undefined' ? this.props.value : 0.5));
          this.setState({ width, initialized: true });
        }}
        style={{ flex: 1, justifyContent: 'center' }}
      >
        <View style={style.scaleContainer}>
          <View style={style.scale} />
        </View>
        <View style={style.handleContainer}>
          <Animated.View
            {...this.panResponder.panHandlers}
            style={[style.handleEnlarger, { transform: [{ translateX: sliderX }] }]}
          >
            {this.state.initialized && <View style={style.handle} />}
          </Animated.View>
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  scaleContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderLeftColor: Colors.actionYellow,
    borderLeftWidth: 5,
    borderRightColor: Colors.actionYellow,
    borderRightWidth: 5,
  },
  scale: {
    flex: 1,
    height: 5,
    backgroundColor: Colors.actionYellow,
  },
  handleContainer: {
    flex: 1,
    paddingHorizontal: handleSize / 2,
  },
  handleEnlarger: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    left: -handleSize,
    width: 2 * handleSize,
  },
  handle: {
    width: handleSize,
    height: handleSize,
    backgroundColor: Colors.black,
    borderRadius: handleSize,
  },
});

*/
