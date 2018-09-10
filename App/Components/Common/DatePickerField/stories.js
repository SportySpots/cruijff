import { storiesOf } from '@storybook/react-native';
import React from 'react';
import DatePickerField from './index';

class Container extends React.PureComponent {
  state = { value: 2 }

  handleChange = (value) => {
    this.setState({ value });
  }

  render() {
    const { value } = this.state;

    return (
      <DatePickerField
        value={value}
        onChange={this.handleChange}
      />
    );
  }
}

storiesOf('Common.DatePickerField', module)
  .add('DatePickerField', () => (
    <Container />
  ));
