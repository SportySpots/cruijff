import { storiesOf } from '@storybook/react-native';
import React from 'react';
import PropTypes from 'prop-types';
import Colors from '../../../Themes/Colors';
import Block from '../Block';
import DatePickerField from './index';

class Container extends React.PureComponent {
  state = { value: null }

  handleChange = (value) => {
    this.setState({ value });
  }

  render() {
    const { theme } = this.props;
    const { value } = this.state;

    return (
      <DatePickerField
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

storiesOf('Common.DatePickerField', module)
  .add('DatePickerField', () => (
    <Container />
  ))
  .add('DatePickerField white theme', () => (
    <Block bgColor={Colors.primaryGreen}>
      <Container theme="white" />
    </Block>
  ));
