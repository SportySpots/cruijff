import React from 'react';
import PropTypes from 'prop-types';
import { AsyncStorage } from 'react-native';
import { Buffer } from 'buffer';
import api from '../Services/SeedorfApi';
import { client } from '../GraphQL';
import GET_USER_DETAILS from '../GraphQL/Users/Queries/GET_USER_DETAILS';

/*
  user:
    undefined - not checked yet
    null      - user not logged in
    object    - the current logged in user object
*/

const UserContext = React.createContext();

export const userPropTypes = {
  user: PropTypes.shape({
    uuid: PropTypes.string.isRequired,
    profile: PropTypes.any.isRequired,
  }),
  signup: PropTypes.func,
  login: PropTypes.func,
  logout: PropTypes.func,
  refresh: PropTypes.func,
};

export class UserProvider extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    mockUser: userPropTypes.user,
  }

  static defaultProps = {
    mockUser: null,
  }

  setToken = async (token) => {
    await AsyncStorage.setItem('TOKEN', token);
    api.setToken(token);
    client.setToken(token);
  }

  initialize = async () => {
    const token = await AsyncStorage.getItem('TOKEN');
    if (token) {
      const verifyTokenResult = await api.verifyToken(token);
      if (verifyTokenResult.ok) {
        await this.setToken(token);
        return this.refresh();
      }
    }
    return this.logout();
  }

  componentWillMount() {
    this.initialize();
  }

  refresh = async () => {
    const token = await AsyncStorage.getItem('TOKEN');
    const claims = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('ascii'));
    const { uuid } = claims;
    const queryResult = await client.query({
      fetchPolicy: 'network-only',
      query: GET_USER_DETAILS,
      variables: { uuid },
    });
    this.setState({ user: queryResult.data.user });
  }

  signup = async ({
    firstName, lastName, email, password,
  }) => {
    const result = await api.signup({
      firstName,
      lastName,
      username: email,
      email,
      password,
    });
    if (result.ok) {
      await this.setToken(result.data.token);
      await this.refresh();
    }
    return result;
  }

  login = async ({ email, password }) => {
    const result = await api.login({
      username: email,
      email,
      password,
    });

    if (result.ok) {
      const { token } = result.data;
      await this.setToken(token);
      await this.refresh();
    }

    return result;
  }

  logout = async () => {
    this.setState({ user: null });
    client.setToken(null);
    api.setToken(null);
    client.resetStore();
    await AsyncStorage.removeItem('TOKEN');
  }

  state = {
    user: undefined,
  };

  render() {
    const { mockUser } = this.props;
    let { user } = this.state;
    if (mockUser) {
      user = mockUser;
    }
    if (user === undefined) {
      return null;
    }
    const { children } = this.props;
    return (
      <UserContext.Provider
        value={{
          user,
          signup: this.signup,
          login: this.login,
          logout: this.logout,
          refresh: this.refresh,
        }}
      >
        {children}
      </UserContext.Provider>
    );
  }
}

export const UserConsumer = UserContext.Consumer;

export const withUser = Component => props => (
  <UserConsumer>
    {UserProps => <Component {...props} {...UserProps} />}
  </UserConsumer>
);

