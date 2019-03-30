import { storiesOf } from '@storybook/react-native';
import React from 'react';
import PropTypes from 'prop-types';
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
      fullWidth,
      size,
      dateFormat,
    } = this.props;
    const { value } = this.state;

    return (
      <DatePickerField
        theme={theme}
        label={label}
        fullWidth={fullWidth}
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
  fullWidth: PropTypes.bool,
  dateFormat: PropTypes.string,
};

Container.defaultProps = {
  theme: 'black',
  size: 'M',
  label: '',
  fullWidth: false,
  dateFormat: 'DD-MM', // 'DD/MM/YYYY'
};

storiesOf('Common.DatePickerField', module)
  .add('DatePickerField', () => (
    <Container />
  ))
  .add('DatePickerField white theme', () => (
    <Block bgColor="primaryGreen">
      <Container theme="white" />
    </Block>
  ))
  .add('DatePickerField fullWidth size ML dateFormat DD/MM/YYYY', () => (
    <Container
      label="I'm the label"
      fullWidth
      size="ML"
      dateFormat="DD/MM/YYYY"
    />
  ));
