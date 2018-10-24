import React from 'react';
import PropTypes from 'prop-types';
import SeedorfAPI from '../../../Services/SeedorfApi';

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
      const result = await SeedorfAPI.login({
        username: email,
        email,
        password,
      });

      // Pass event up to parent component
      if (result && result.problem) {
        onLoginError({ message: result.data });
        // 'Wrong username or password'
      } else {
        onLoginSuccess({ token: result.data.token });
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
