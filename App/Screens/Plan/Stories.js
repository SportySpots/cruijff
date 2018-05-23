import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import { WithApolloMockProvider } from '../../GraphQL/index';
import Created from './CreatedScreen';
import Description from './DescriptionScreen';
import PickSpot from './PickSpotScreen';
import SportAndTime from './SportAndTimeScreen';

const gameDetails = {
  sport: null,
  timeStart: null,
  timeEnd: null,
  date: null,
};

storiesOf('Plan')
  .add('Step 1: Sport/time', () => (
    <WithApolloMockProvider>
      <View style={{ flex: 1 }}>
        <SportAndTime gameDetails={gameDetails} setGameDetailField={() => null} />
      </View>
    </WithApolloMockProvider>
  ))
  .add('Step 2: Pick spot', () => (
    <WithApolloMockProvider>
      <View style={{ flex: 1 }}>
        <PickSpot gameDetails={gameDetails} setGameDetailField={() => null} />
      </View>
    </WithApolloMockProvider>
  ))
  .add('Step 3: Description', () => (
    <View style={{ flex: 1 }}>
      <Description gameDetails={gameDetails} setGameDetailField={() => null} />
    </View>
  ))
  .add('Step 4: Created', () => (
    <WithApolloMockProvider>
      <View style={{ flex: 1 }}>
        <Created
          navigation={{ state: { params: { uuid: 'something' } } }}
          gameDetails={gameDetails}
          setGameDetailField={() => null}
        />
      </View>
    </WithApolloMockProvider>
  ));
