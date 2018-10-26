import React from 'react';
import PropTypes from 'prop-types';
import I18n from '../../../I18n';
import SeedorfAPI from '../../../Services/SeedorfApi';
import getErrorMsg from './utils';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
/**
 * @summary Gets input fields from the LoginForm and calls API to authenticate user.
 */
class LoginApiCall extends React.PureComponent {
  handleLogin = async (inputFields) => {
    const { onLoginError, onLoginSuccess } = this.props;
    const { email, password } = inputFields;

    try {
      const response = await SeedorfAPI.login({
        username: email,
        email,
        password,
      });

      // Pass event up to parent component
      if (response && response.problem) {
        console.log('RESPONSE', response.data);
        const message = getErrorMsg(response.data);
        onLoginError({ message: I18n.t(message) });
      } else {
        onLoginSuccess({ token: response.data.token });
      }
    } catch (exc) {
      onLoginError(exc);
    }
  }

  render() {
    const { children } = this.props;

    // Public API
    const api = {
      loginUser: this.handleLogin,
    };

    return children(api);
  }
}

LoginApiCall.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  onLoginError: PropTypes.func,
  onLoginSuccess: PropTypes.func,
};

LoginApiCall.defaultProps = {
  onLoginError: () => {},
  onLoginSuccess: () => {},
};

export default LoginApiCall;
