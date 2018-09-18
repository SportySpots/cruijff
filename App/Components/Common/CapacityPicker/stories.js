import { storiesOf } from '@storybook/react-native';
import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Block from '../Block';
import CapacityPicker from './index';

class Container extends React.PureComponent {
  state = { value: null }

  handleChange = (value) => {
    this.setState({ value });
  }

  render() {
    const { theme } = this.props;
    const { value } = this.state;

    return (
      <CapacityPicker
        theme={theme}
        value={value}
        onChange={this.handleChange}
      />
    );
  }
}

Container.propTypes = {
  theme: PropTypes.oneOf(['black', 'white']),
};

Container.defaultProps = {
  theme: 'black',
};

storiesOf('Common.CapacityPicker', module)
  .add('CapacityPicker', () => (
    <View style={{ flex: 1, width: 320 }}>
      <Block style={{ flex: 1 }}>
        <Container />
      </Block>
    </View>
  ));
