import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import DarkFooter from '.';

class Wrapper extends React.Component {
  constructor() {
    super();
    this.state = { currentPage: 1 };
  }
  render() {
    return (
      <DarkFooter
        currentPage={this.state.currentPage}
        numPages={4}
        onNext={() => this.setState({ currentPage: this.state.currentPage + 1 })}
        onBack={() => this.setState({ currentPage: this.state.currentPage - 1 })}
      />
    );
  }
}

storiesOf('DarkFooter').add('Default', () => (
  <View style={{ flex: 1 }}>
    <Wrapper />
  </View>
));
