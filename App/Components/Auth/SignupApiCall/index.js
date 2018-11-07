import React from 'react';
import PropTypes from 'prop-types';
import curateErrors from './utils';
import { userPropTypes, withUser } from '../../../Context/User';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
/**
 * @summary Gets input fields from the SignupForm and calls API to authenticate user.
 */
class SignupApiCall extends React.PureComponent {
  handleSignup = async (inputFields) => {
    const { onSignupError, onSignupSuccess, signup } = this.props;
    const {
      firstName,
      lastName,
      email,
      password,
    } = inputFields;

    try {
      const response = await signup({
        firstName,
        lastName,
        email,
        password,
      });

      // Pass event up to parent component
      if (response && response.problem) {
        console.log('RESPONSE', response.data);
        const errors = curateErrors(response.data);
        console.log('CURATED ERRORS', errors);
        onSignupError(errors);
      } else {
        onSignupSuccess({ token: response.data.token });
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

SignupApiCall.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  onSignupError: PropTypes.func,
  onSignupSuccess: PropTypes.func,
  signup: userPropTypes.signup.isRequired,
};

SignupApiCall.defaultProps = {
  onSignupError: () => {},
  onSignupSuccess: () => {},
};

export default withUser(SignupApiCall);
