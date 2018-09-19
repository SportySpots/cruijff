import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import Block from '../Block';
import CapacityPicker from './index';

class Container extends React.PureComponent {
  state = { value: null }

  handleBtnPress = (value) => {
    this.setState({ value });
  }

  increase = () => {
    this.setState(prevState => (
      { value: prevState.value + 1 }
    ));
  }

  decrease = () => {
    this.setState(prevState => (
      { value: prevState.value > 0 ? prevState.value - 1 : 0 }
    ));
  }

  render() {
    const { value } = this.state;

    return (
      <CapacityPicker
        value={value}
        onBtnPress={this.handleBtnPress}
        onIncrease={this.increase}
        onDecrease={this.decrease}
      />
    );
  }
}

storiesOf('Common.CapacityPicker', module)
  .add('CapacityPicker', () => (
    <View style={{ flex: 1, width: 320 }}>
      <Block style={{ flex: 1 }}>
        <Container />
      </Block>
    </View>
  ));
