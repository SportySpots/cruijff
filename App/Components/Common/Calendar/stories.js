import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View, Text } from 'react-native';
import Calendar from '.';

class Container extends React.PureComponent {
  state = {
    date: null,
  }

  handleDayPress = (date) => {
    console.log('DATE', date);
    this.setState({ date });
  }

  render() {
    const { date } = this.state;

    return (
      <View>
        <Text>{(date && date.dateString) || ''}</Text>
        <Calendar
          visible
          value={date}
          onDayPress={this.handleDayPress}
        />
      </View>
    );
  }
}

storiesOf('Common.Calendar', module)
  .add('Calendar', () => <Container />);
