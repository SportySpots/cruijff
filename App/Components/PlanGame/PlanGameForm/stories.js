import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View } from 'react-native';
import { Query } from 'react-apollo';
import GET_USER_DETAILS from '../../../GraphQL/Users/Queries/GET_USER_DETAILS';
import PlanGameForm from '.';

storiesOf('PlanGame.PlanGameForm', module)
  .add('PlanGameForm', () => (
    <View style={{ flex: 1 }}>
      <Query
        query={GET_USER_DETAILS}
        variables={{ uuid: 455 }}
      >
        {({ loading, error, data }) => (
          loading || error ? null : (
            <PlanGameForm
              username={(data.user && data.user.first_name) || ''}
            />
          )
        )}
      </Query>
    </View>
  ));
