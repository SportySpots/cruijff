import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Query } from 'react-apollo';
import GET_USER_DETAILS from '../../../GraphQL/Users/Queries/GET_USER_DETAILS';
import SignupEmailForm from '.';

storiesOf('Auth.SignupEmailForm', module)
  .add('SignupEmailForm', () => (
    <Query
      query={GET_USER_DETAILS}
      variables={{ uuid: 455 }}
    >
      {({ loading, error, data }) => {
        console.log({ loading, error, data });
        return (loading || error ? null : (
          <SignupEmailForm user={data.user} />
        ))}
      }
    </Query>
  ));



  // storiesOf('Auth.SignupEmailForm', module)
  // .add('SignupEmailForm', () => (
  //   <Query
  //     query={GET_USER_DETAILS}
  //     variables={{ uuid: 455 }}
  //   >
  //     {({ loading, error, data }) => (
  //       console.log({ loading, error, data });
  //       loading || error ? null : (
  //         <SignupEmailForm user={data.user} />
  //       ))
  //     }
  //   </Query>
  // ));
