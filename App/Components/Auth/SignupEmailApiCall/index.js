import React from 'react';
import PropTypes from 'prop-types';
import curateErrors from './utils';
import { withUser, userPropTypes } from '../../../Context/User';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
/**
 * @summary Gets input fields from the SignupEmailForm and calls API to
 * authenticate the user.
 */
class SignupEmailApiCall extends React.PureComponent {
  handleSignup = async (inputFields) => {
    const { onSignupError, onSignupSuccess, signup } = this.props;
    const { name, email } = inputFields;

    try {
      const res = await signup({ name, email });

      // Pass event up to parent component
      if (res && res.problem) {
        console.log('RESPONSE', res.data);
        const errors = curateErrors(res.data);
        console.log('CURATED ERRORS', errors);
        onSignupError(errors);
      } else {
        // onSignupSuccess({ token: res.data.token });
        onSignupSuccess();
      }
    } catch (exc) {
      onSignupError(exc);
    }
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
  signup: userPropTypes.signup.isRequired,
};

SignupEmailApiCall.defaultProps = {
  onSignupError: () => {},
  onSignupSuccess: () => {},
};

export default withUser(SignupEmailApiCall);
