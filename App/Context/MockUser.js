/* eslint-disable react/no-unused-state */
import React from 'react';
import { userPropTypes, UserProvider } from './User';

class MockUserProvider extends React.Component {
  state = {
    user: {
      first_name: 'Mock',
      last_name: 'User',
      uuid: '12345',
      profile: {
        avatar: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Abraham_de_Vries_-_Portret_van_een_onbekende_man%2C_mogelijk_de_koopman_Adriaen_van_der_Tock_%281584-85-1661%29_-_10539_A_B_-_Museum_Rotterdam.jpg',
      },
    },
    firstRun: undefined,
  }

  // eslint-disable-next-line
  static async setToken(token) {}

  // eslint-disable-next-line
  async refresh() {}

  login = UserProvider.prototype.login

  logout = UserProvider.prototype.logout

  render = UserProvider.prototype.render
}

MockUserProvider.propTypes = userPropTypes;

export default MockUserProvider;
