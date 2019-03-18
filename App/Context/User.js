import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { AsyncStorage } from 'react-native';
// import { Query } from 'react-apollo';
import client from '../GraphQL/ApolloClient';
import userDetailsFragment from '../GraphQL/Users/Fragments/userDetails';
import GET_USER_DETAILS from '../GraphQL/Users/Queries/GET_USER_DETAILS';
import { decodeJWTToken } from '../utils';

/*
  user:
    undefined - not checked yet
    null      - user not logged in
    object    - the current logged in user object
*/

// The defaultValue argument is ONLY used when a component does not have a matching
// Provider above it in the tree. This can be helpful for testing components in isolation
// without wrapping them. Note: passing undefined as a Provider value does not cause
// consuming components to use defaultValue.
const defaultValue = {
  loadingUser: false,
  user: {
    name: 'Mock User',
    uuid: '12345',
    profile: {
      uuid: '12345',
      id: '1234',
      year_of_birth: 2000,
      avatar: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Abraham_de_Vries_-_Portret_van_een_onbekende_man%2C_mogelijk_de_koopman_Adriaen_van_der_Tock_%281584-85-1661%29_-_10539_A_B_-_Museum_Rotterdam.jpg',
      spots: [],
    },
  },
  refetchUser: () => {},
};

export const UserContext = React.createContext(defaultValue);

const me = async () => {
  try {
    const token = await AsyncStorage.getItem('TOKEN');
    console.log('TOKEN', token);
    if (!token) {
      return null;
    }

    const claims = decodeJWTToken(token);
    console.log('CLAIMS', claims);
    const { email } = claims;

    const res = await client.query({
      fetchPolicy: 'network-only',
      query: GET_USER_DETAILS,
      variables: { email },
    });

    return res.data.user;
  } catch (exc) {
    console.log(exc);
    return null;
  }
};

// TODO: use stateless function
// TODO: user GET_ME instead of GET_USER_DETAILS
// TODO: use Query instead of client.query
export class UserProvider extends React.Component {
  state = {
    loading: true, // set initial value to true to avoid flickering
    user: null,
  }

  queryUser = async () => {
    // Do not set loading state
    const user = await me();
    console.log('QUERY USER', user);
    this.setState({ user });
  }

  async componentWillMount() {
    console.log('USER PROVIDER COMP WILL MOUNT');
    await this.queryUser();
    this.setState({ loading: false });
  }

  render() {
    const { children } = this.props;
    const { loading, user } = this.state;
    console.log('USER STATE', this.state);

    return (
      <UserContext.Provider
        value={{
          loadingUser: loading,
          user,
          refetchUser: this.queryUser,
        }}
      >
        {children}
      </UserContext.Provider>
    );
  }
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const UserConsumer = UserContext.Consumer;

export const withUser = Component => props => (
  <UserConsumer>
    {userProps => <Component {...props} {...userProps} />}
  </UserConsumer>
);

export const userPropTypes = {
  loadingUser: PropTypes.bool,
  user: propType(userDetailsFragment),
  refetchUser: PropTypes.func,
};

// import React from 'react';
// import PropTypes from 'prop-types';
// import { propType } from 'graphql-anywhere';
// import { AsyncStorage } from 'react-native';
// // import firebase from 'react-native-firebase';
// import SeedorfAPI from '../Services/SeedorfApi';
// // import { Events, IncomingLinks, urlToEvent } from '../Services/IncomingLinks';
// import { client } from '../GraphQL';
// import userDetailsFragment from '../GraphQL/Users/Fragments/userDetails';
// import GET_USER_DETAILS from '../GraphQL/Users/Queries/GET_USER_DETAILS';
// import { decodeJWTToken } from '../utils';

// /*
//   user:
//     undefined - not checked yet
//     null      - user not logged in
//     object    - the current logged in user object
// */

// // The defaultValue argument is ONLY used when a component does not have a matching
// // Provider above it in the tree. This can be helpful for testing components in isolation
// // without wrapping them. Note: passing undefined as a Provider value does not cause
// // consuming components to use defaultValue.
// const defaultValue = {
//   user: {
//     name: 'Mock User',
//     uuid: '12345',
//     profile: {
//       uuid: '12345',
//       id: '1234',
//       year_of_birth: 2000,
//       avatar: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Abraham_de_Vries_-_Portret_van_een_onbekende_man%2C_mogelijk_de_koopman_Adriaen_van_der_Tock_%281584-85-1661%29_-_10539_A_B_-_Museum_Rotterdam.jpg',
//       spots: [],
//     },
//   },
//   loginWithToken: () => {},
//   logout: () => {},
//   refresh: () => {},
// };

// export const UserContext = React.createContext(defaultValue);

// export const userPropTypes = {
//   user: propType(userDetailsFragment),
//   loginWithToken: PropTypes.func,
//   logout: PropTypes.func,
//   refresh: PropTypes.func,
// };

// const setToken = async (token) => {
//   await AsyncStorage.setItem('TOKEN', token);
//   SeedorfAPI.setToken(token);
//   client.setToken(token);
// };

// export class UserProvider extends React.Component {
//   state = {
//     user: undefined,
//   }

//   async componentWillMount() {
//     const token = await AsyncStorage.getItem('TOKEN');
//     if (token && await this.loginWithToken(token)) {
//       return;
//     }
//     this.logout();
//   }

//   queryUser = async () => {
//     const token = await AsyncStorage.getItem('TOKEN');
//     const claims = decodeJWTToken(token);
//     console.log('CLAIMS', claims);
//     const { uuid } = claims;
//     const res = await client.query({
//       fetchPolicy: 'network-only',
//       query: GET_USER_DETAILS,
//       variables: { uuid },
//     });
//     return res.data.user;
//   }

//   refresh = async () => {
//     const user = await this.queryUser();
//     this.setState({ user });
//   }

//   loginWithToken = async (token) => {
//     const res = await SeedorfAPI.verifyToken(token);
//     if (res.ok) {
//       await setToken(token);
//       await this.refresh();
//       return true;
//     }
//     return false;
//   }

//   logout = async () => {
//     client.setToken(null);
//     SeedorfAPI.setToken(null);
//     client.resetStore();
//     await AsyncStorage.removeItem('TOKEN');
//     this.setState({ user: null });
//   }

//   render() {
//     const { user } = this.state;
//     //
//     // if (user === undefined) {
//     //   return <CenteredActivityIndicator />;
//     // }

//     const { children } = this.props;

//     return (
//       <UserContext.Provider
//         value={{
//           user,
//           loginWithToken: this.loginWithToken,
//           logout: this.logout,
//           refresh: this.refresh,
//         }}
//       >
//         {children}
//       </UserContext.Provider>
//     );
//   }
// }

// UserProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// export const UserConsumer = UserContext.Consumer;

// export const withUser = Component => props => (
//   <UserConsumer>
//     {userProps => <Component {...props} {...userProps} />}
//   </UserConsumer>
// );
