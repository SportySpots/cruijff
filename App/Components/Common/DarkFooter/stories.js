import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import DarkFooter from '.';

class Wrapper extends React.Component {
  state = { currentPage: 1 }

  render() {
    const { currentPage } = this.state;

    return (
      <View style={{ flex: 1 }}>
        <DarkFooter
          currentPage={currentPage}
          numPages={4}
          onNext={() => this.setState({ currentPage: currentPage + 1 })}
          onBack={() => this.setState({ currentPage: currentPage - 1 })}
          {...this.props}
        />
      </View>
    );
  }
}

storiesOf('DarkFooter', module)
  .add('DarkFooter default', () => (
    <Wrapper />
  ))
  .add('DarkFooter NO Back button', () => (
    <Wrapper showBack={false} />
  ));
