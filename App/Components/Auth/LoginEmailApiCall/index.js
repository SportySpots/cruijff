import React from 'react';
import PropTypes from 'prop-types';
import SeedorfApi from '../../../Services/SeedorfApi';
// import curateErrors from './utils';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
/**
 * @summary Gets input fields from the LoginEmailForm and calls API to
 * authenticate the user.
 */
class LoginEmailApiCall extends React.PureComponent {
  handleLogin = async (inputFields) => {
    const { onLoginError, onEmailSent } = this.props;
    const { email } = inputFields;

    try {
      const res = await SeedorfApi.sendMagicLoginLink(email);

      // Pass event up to parent component
      if (res && res.problem) {
        // console.log('RESPONSE', response.data);
        // const errors = curateErrors(response.data);
        // onLoginError(errors);
        onLoginError({ email: ['loginEmailForm.fields.email.errors.notRegistered'] });
      } else {
        onEmailSent();
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
  onEmailSent: PropTypes.func,
};

LoginEmailApiCall.defaultProps = {
  onLoginError: () => {},
  onEmailSent: () => {},
};

export default LoginEmailApiCall;
