import React from 'react';
import PropTypes from 'prop-types';
import curateErrors from './utils';
import { withUser, userPropTypes } from '../../../Context/User';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
/**
 * @summary Gets input fields from the LoginForm and calls API to authenticate user.
 */
class LoginApiCall extends React.PureComponent {
  handleLogin = async (inputFields) => {
    const { onLoginError, onLoginSuccess, login } = this.props;
    const { email, password } = inputFields;

    try {
      const response = await login(email, password);

      // Pass event up to parent component
      if (response && response.problem) {
        console.log('RESPONSE', response.data);
        const errors = curateErrors(response.data);
        onLoginError(errors);
      } else {
        onLoginSuccess();
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
  login: userPropTypes.login.isRequired,
};

LoginApiCall.defaultProps = {
  onLoginError: () => {},
  onLoginSuccess: () => {},
};

export default withUser(LoginApiCall);
