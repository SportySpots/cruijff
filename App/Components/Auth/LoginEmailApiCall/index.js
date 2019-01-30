import React from 'react';
import PropTypes from 'prop-types';
// import curateErrors from './utils';
import SeedorfApi from '../../../Services/SeedorfApi';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
/**
 * @summary Gets input fields from the LoginEmailForm and calls API to
 * authenticate the user.
 */
class LoginEmailApiCall extends React.PureComponent {
  handleLogin = async (inputFields) => {
    const { onLoginError, onLoginSuccess } = this.props;
    const { email } = inputFields;

    try {
      const response = await SeedorfApi.sendMagicLoginLink(email);

      // Pass event up to parent component
      if (response && response.problem) {
        // console.log('RESPONSE', response.data);
        // const errors = curateErrors(response.data);
        // onLoginError(errors);
        onLoginError({ email: ['loginEmailForm.fields.email.errors.notRegistered'] });
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

LoginEmailApiCall.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  onLoginError: PropTypes.func,
  onLoginSuccess: PropTypes.func,
};

LoginEmailApiCall.defaultProps = {
  onLoginError: () => {},
  onLoginSuccess: () => {},
};

export default LoginEmailApiCall;
