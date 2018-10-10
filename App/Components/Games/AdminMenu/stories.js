import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
// import { Query } from 'react-apollo';
// import GET_GAME_DETAILS from '../../../GraphQL/Games/Queries/GET_GAME_DETAILS';
import Row from '../../Common/Row';
import { navigation, store } from './mocks';
import AdminMenu from '.';

// const Container = () => (
//   <Query
//     query={GET_GAME_DETAILS}
//     variables={{ uuid: 455 }}
//   >
//     {({ loading, error, data }) =>
//       (loading || error ? null : (
//         <AdminMenu navigation={navigation} />
//       ))
//     }
//   </Query>
// );

storiesOf('Games.AdminMenu', module)
  .add('AdminMenu', () => (
    <Provider store={store}>
      <View style={{ backgroundColor: 'gray', flex: 1 }}>
        <Row justifyContent="space-between">
          <View />
          <AdminMenu navigation={navigation} />
        </Row>
      </View>
    </Provider>
  ));
