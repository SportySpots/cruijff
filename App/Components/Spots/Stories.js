import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Query } from 'react-apollo';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { WithApolloMockProvider } from '../../GraphQL';
import SpotDetailsScreen, { GET_SPOT_DETAILS } from '../../Screens/Spots/SpotDetailsScreen';
import SpotsListScreen, { GET_SPOTS } from '../../Screens/Spots/SpotsListScreen';
import SpotListCard from './SpotListCard';
import SpotListCardSmall from './SpotListCardSmall';
import SpotMap from './SpotMap';
import SpotProperties from './SpotProperties';


const dummyNavigator = {
  navigate: () => null,
  state: {
    params: { spotId: 455 },
  },
};
const spotProperties = {
  Sport: 'Voetbal',
  Locatie: 'Plantsoen',
  Oppervlakte: '759m2',
  Ondergrond: 'Beton',
  Omheining: 'Open',
  Verlichting: 'Ja',
};

const store = createStore(state => state, {
  user: {
    uuid: 1234,
    initialized: true,
  },
});

storiesOf('Spots')
  .add('SpotListCard', () => (
    <WithApolloMockProvider>
      <Query query={GET_SPOTS}>
        {({ loading, error, data }) =>
          (loading || error ? null : (
            <SpotListCard spot={data.spots[0]} navigation={dummyNavigator} />
          ))
        }
      </Query>
    </WithApolloMockProvider>
  ))
  .add('SpotListCardSmall', () => (
    <WithApolloMockProvider>
      <Query query={GET_SPOTS}>
        {({ loading, error, data }) =>
          (loading || error ? null : (
            <SpotListCardSmall spot={data.spots[0]} navigation={dummyNavigator} />
          ))
        }
      </Query>
    </WithApolloMockProvider>
  ))
  .add('SpotsListScreen', () => (
    <WithApolloMockProvider>
      <SpotsListScreen navigation={dummyNavigator} />
    </WithApolloMockProvider>
  ))
  .add('SpotDetailsScreen', () => (
    <Provider store={store}>
      <WithApolloMockProvider>
        <SpotDetailsScreen uuid={1} navigation={dummyNavigator} />
      </WithApolloMockProvider>
    </Provider>
  ))
  .add('SpotProperties', () => <SpotProperties properties={spotProperties} />)
  .add('SpotMap', () => (
    <WithApolloMockProvider>
      <Query query={GET_SPOT_DETAILS} variables={{ uuid: dummyNavigator.state.params.spotId }}>
        {({ loading, error, data }) => (loading || error ? null : <SpotMap spot={data.spot} />)}
      </Query>
    </WithApolloMockProvider>
  ));
