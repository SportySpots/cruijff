import React from 'react';
import PropTypes from 'prop-types';
import I18n from '../../../I18n';
import SeedorfApi from '../../../Services/SeedorfApi';
import curateErrors from './utils';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
/**
 * @summary Gets input fields from the SignupEmailForm and calls API to
 * authenticate the user.
 */
class SignupEmailApiCall extends React.PureComponent {
  handleSignup = async (inputFields) => {
    const { onSignupError, onSignupSuccess } = this.props;
    const { name, email } = inputFields;

    try {
      const res = await SeedorfApi.signup({
        email,
        name,
        language: I18n.locale.substr(0, 2),
      });
      console.log('SIGNUP RESPONSE', res);

      // Pass event up to parent component
      if (res && res.problem) {
        const errors = curateErrors(res.data);
        console.log('CURATED ERRORS', errors);
        onSignupError(errors);
      }
    } catch (exc) {
      onSignupError(exc);
    }

    // onSignupSuccess({ token: res.data.token });
    onSignupSuccess();
  }

  render() {
    const { children } = this.props;

    // Public API
    const api = {
      signupUser: this.handleSignup,
    };

    return children(api);
  }
}

SignupEmailApiCall.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  onSignupError: PropTypes.func,
  onSignupSuccess: PropTypes.func,
};

SignupEmailApiCall.defaultProps = {
  onSignupError: () => {},
  onSignupSuccess: () => {},
};

export default SignupEmailApiCall;
