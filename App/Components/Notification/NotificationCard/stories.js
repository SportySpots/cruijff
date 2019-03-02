import { storiesOf } from '@storybook/react-native';
import React from 'react';
// import { Query } from 'react-apollo';
// import GET_SPOTS from '../../../GraphQL/Spots/Queries/GET_SPOTS';
import NotificationCard from '.';

const dummyNavigator = {
  navigate: () => null,
  state: {
    params: { spotId: 455 },
  },
};

storiesOf('Spots.NotificationCard', module)
  .add('NotificationCard', () => (
    <NotificationCard
      navigation={dummyNavigator}
    />
  ));

// storiesOf('Spots.NotificationCard', module)
// .add('NotificationCard', () => (
//   <Query query={GET_SPOTS}>
//     {({ loading, error, data }) => (
//       loading || error ? null : (
//         <NotificationCard
//           spot={data.spots[0]}
//           navigation={dummyNavigator}
//         />
//       ))
//     }
//   </Query>
// ));