import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { WithApolloMockProvider } from '../../../GraphQL';
import Block from '../Block';
import SportsList from './index';

class Container extends React.PureComponent {
  state = {
    sport: null,
  }

  handleSportPress = (sport) => {
    this.setState({ sport });
  }

  render() {
    const { sport } = this.state;

    return (
      <WithApolloMockProvider>
        <Block>
          <SportsList
            selectedSport={sport}
            onSportPress={this.handleSportPress}
          />
        </Block>
      </WithApolloMockProvider>
    );
  }
}

storiesOf('Common.SportsList', module)
  .add('SportsList', () => (
    <Container />
  ));
