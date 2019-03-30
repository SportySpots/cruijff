import { storiesOf } from '@storybook/react-native';
import React from 'react';
import PropTypes from 'prop-types';
import Block from '../Block';
import TimePickerField from '.';

class Container extends React.PureComponent {
  state = { date: null }

  handleChange = (date) => {
    this.setState({ date });
  }

  render() {
    const {
      theme,
      label,
      fullWidth,
      size,
    } = this.props;
    const { date } = this.state;

    return (
      <TimePickerField
        theme={theme}
        label={label}
        fullWidth={fullWidth}
        value={date}
        onChange={this.handleChange}
        size={size}
      />
    );
  }
}

Container.propTypes = {
  theme: PropTypes.oneOf(['black', 'white']),
  size: PropTypes.string,
  label: PropTypes.string,
  fullWidth: PropTypes.bool,
};

Container.defaultProps = {
  theme: 'black',
  size: 'M',
  label: '',
  fullWidth: false,
};

storiesOf('Common.TimePickerField', module)
  .add('TimePickerField', () => <Container />)
  .add('TimePickerField white theme', () => (
    <Block bgColor="primaryGreen">
      <Container theme="white" />
    </Block>
  ))
  .add('TimePickerField fullWidth size ML', () => (
    <Container label="I'm the label" fullWidth size="ML" />
  ));
