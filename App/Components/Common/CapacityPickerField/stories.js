import { storiesOf } from '@storybook/react-native';
import React from 'react';
import PropTypes from 'prop-types';
import Block from '../Block';
import CapacityPickerField from '.';

class Container extends React.PureComponent {
  state = { value: null }

  handleChange = (value) => {
    this.setState({ value });
  }

  render() {
    const {
      theme,
      error,
      label,
      fullWidth,
      size,
    } = this.props;
    const { value } = this.state;

    return (
      <CapacityPickerField
        theme={theme}
        error={error}
        label={label}
        fullWidth={fullWidth}
        value={value}
        onChange={this.handleChange}
        size={size}
      />
    );
  }
}

Container.propTypes = {
  theme: PropTypes.oneOf(['black', 'white']),
  error: PropTypes.string,
  size: PropTypes.string,
  label: PropTypes.string,
  fullWidth: PropTypes.bool,
};

Container.defaultProps = {
  theme: 'black',
  error: '',
  size: 'M',
  label: '',
  fullWidth: false,
};

storiesOf('Common.CapacityPickerField', module)
  .add('CapacityPickerField', () => (
    <Container />
  ))
  .add('CapacityPickerField with ERROR', () => (
    <Container error="I'm the error" />
  ))
  .add('CapacityPickerField white theme', () => (
    <Block bgColor="primaryGreen">
      <Container theme="white" />
    </Block>
  ))
  .add('CapacityPickerField fullWidth size ML', () => (
    <Container label="I'm the label" fullWidth size="ML" />
  ));
