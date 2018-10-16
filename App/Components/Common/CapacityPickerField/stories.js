import { storiesOf } from '@storybook/react-native';
import React from 'react';
import PropTypes from 'prop-types';
import Colors from '../../../Themes/Colors';
import Block from '../Block';
import CapacityPickerField from './index';

class Container extends React.PureComponent {
  state = { value: null }

  handleChange = (value) => {
    this.setState({ value });
  }

  render() {
    const { theme } = this.props;
    const { value } = this.state;

    return (
      <CapacityPickerField
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

storiesOf('Common.CapacityPickerField', module)
  .add('CapacityPickerField', () => (
    <Container />
  ))
  .add('CapacityPickerField white theme', () => (
    <Block bgColor={Colors.primaryGreen}>
      <Container theme="white" />
    </Block>
  ));
