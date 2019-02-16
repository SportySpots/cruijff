import { storiesOf } from '@storybook/react-native';
import React from 'react';
import Block from '../Block';
import SportsList from '.';

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
      <Block>
        <SportsList
          selectedSport={sport}
          onSportPress={this.handleSportPress}
        />
      </Block>
    );
  }
}

storiesOf('Common.SportsList', module)
  .add('SportsList', () => <Container />);
