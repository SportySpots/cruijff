/* eslint-disable */
// code taken from: https://github.com/rimiti/react-native-toastify
import React from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';
import styled from 'styled-components';
import Colors from '../../../Themes/Colors';
import Block from '../Block';
import Text from '../Text';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Container = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  elevation: 999;
  z-index: 10000;
  min-height: 64px;
  background-color: ${Colors.black};
`;
//------------------------------------------------------------------------------
const StyledText = styled(Text.SM)`
  color: ${Colors.white};
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// TODO: clean, refactor, test
class Toast extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      text: '',
      opacityValue: new Animated.Value(props.opacity),
    };
  }

  componentWillUnmount() {
    this.resetTimeout();
  }

  show(text, duration) {
    this.setState({
      isShow: true,
      text,
      duration: typeof duration === 'number' ? duration : this.props.durationShort,
    });

    Animated.timing(this.state.opacityValue, {
      toValue: this.props.opacity,
      duration: this.props.fadeInDuration,
    })
      .start(() => {
        this.isShow = true;
        if (duration !== this.props.end) this.close();
      });
  }

  close(duration) {
    let delay = typeof duration === 'number' ? duration : this.state.duration;
    if (delay === this.props.end) delay = this.props.defaultCloseDelay;

    if (!this.isShow && !this.state.isShow) return;
    this.resetTimeout();
    this.timer = setTimeout(() => Animated.timing(this.state.opacityValue, {
      toValue: 0.0,
      duration: this.props.fadeOutDuration,
    })
      .start(() => {
        this.setState({ isShow: false });
        this.isShow = false;
      }), delay);
  }

  resetTimeout() {
    clearTimeout(this.timer);
  }

  render() {
    return this.state.isShow ?
      <Container activeOpacity={1} onPress={() => { this.close(0); }}>
        <Animated.View>
          <Block>
            <StyledText>{this.state.text}</StyledText>
          </Block>
        </Animated.View>
      </Container> : null;
  }
}

Toast.propTypes = {
  fadeInDuration: PropTypes.number,
  fadeOutDuration: PropTypes.number,
  opacity: PropTypes.number,
  durationShort: PropTypes.number,
  defaultCloseDelay: PropTypes.number,
  end: PropTypes.number,
};

Toast.defaultProps = {
  fadeInDuration: 500,
  fadeOutDuration: 500,
  opacity: 1,
  durationShort: 500,
  defaultCloseDelay: 0,
  end: 0,
};

export default Toast;
