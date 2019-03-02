import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Query } from 'react-apollo';
import GET_SPOT_DETAILS from '../../../GraphQL/Spots/Queries/GET_SPOT_DETAILS';
import NotificationCard from '.';

const dummyNavigator = {
  navigate: () => null,
  state: {
    params: { spotId: 455 },
  },
};

storiesOf('Spots.NotificationCard', module)
  .add('NotificationCard', () => (
    <Query
      query={GET_SPOT_DETAILS}
      variables={{ uuid: 455 }}
    >
      {({ loading, error, data }) => (
        loading || error ? null : (
          <NotificationCard
            images={data.spot.images}
            navigation={dummyNavigator}
          />
        ))
      }
    </Query>
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