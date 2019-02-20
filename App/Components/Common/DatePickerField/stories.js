import { storiesOf } from '@storybook/react-native';
import React from 'react';
import PropTypes from 'prop-types';
import Colors from '../../../Themes/Colors';
import Block from '../Block';
import DatePickerField from '.';

class Container extends React.PureComponent {
  state = { value: null }

  handleChange = (value) => {
    this.setState({ value });
  }

  render() {
    const {
      theme,
      label,
      boxed,
      size,
      dateFormat,
    } = this.props;
    const { value } = this.state;

    return (
      <DatePickerField
        theme={theme}
        label={label}
        boxed={boxed}
        value={value}
        onChange={this.handleChange}
        size={size}
        dateFormat={dateFormat}
      />
    );
  }
}

Container.propTypes = {
  theme: PropTypes.oneOf(['black', 'white']),
  size: PropTypes.string,
  label: PropTypes.string,
  boxed: PropTypes.bool,
  dateFormat: PropTypes.string,
};

Container.defaultProps = {
  theme: 'black',
  size: 'M',
  label: '',
  boxed: false,
  dateFormat: 'DD-MM', // 'DD/MM/YYYY'
};

storiesOf('Common.DatePickerField', module)
  .add('DatePickerField', () => (
    <Container />
  ))
  .add('DatePickerField white theme', () => (
    <Block bgColor={Colors.primaryGreen}>
      <Container theme="white" />
    </Block>
  ))
  .add('DatePickerField boxed size ML dateFormat DD/MM/YYYY', () => (
    <Container
      label="I'm the label"
      boxed
      size="ML"
      dateFormat="DD/MM/YYYY"
    />
  ));
