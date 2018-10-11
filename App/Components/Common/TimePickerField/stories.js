import { storiesOf } from '@storybook/react-native';
import React from 'react';
import PropTypes from 'prop-types';
import Colors from '../../../Themes/Colors';
import Block from '../Block';
import TimePickerField from './index';

class Container extends React.PureComponent {
  state = { value: null }

  handleChange = (date) => {
    this.setState({ value: date });
  }

  render() {
    const {
      theme,
      label,
      boxed,
      size,
    } = this.props;
    const { value } = this.state;

    return (
      <TimePickerField
        theme={theme}
        label={label}
        boxed={boxed}
        value={value}
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
  boxed: PropTypes.bool,
};

Container.defaultProps = {
  theme: 'black',
  size: 'M',
  label: '',
  boxed: false,
};

storiesOf('Common.TimePickerField', module)
  .add('TimePickerField', () => <Container />)
  .add('TimePickerField white theme', () => (
    <Block bgColor={Colors.primaryGreen}>
      <Container theme="white" />
    </Block>
  ))
  .add('TimePickerField boxed size ML', () => (
    <Container label="I'm the label" boxed size="ML" />
  ));
