import React from 'react';
import PropTypes from 'prop-types';
import SeedorfAPI from '../../../Services/SeedorfApi';
import curateErrors from './utils';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
/**
 * @summary Gets input fields from the SignupForm and calls API to authenticate user.
 */
class SignupApiCall extends React.PureComponent {
  handleSignup = async (inputFields) => {
    const { onSignupError, onSignupSuccess } = this.props;
    const {
      firstName,
      lastName,
      email,
      password,
    } = inputFields;

    try {
      const response = await SeedorfAPI.signup({
        firstName,
        lastName,
        username: email,
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
};

SignupApiCall.defaultProps = {
  onSignupError: () => {},
  onSignupSuccess: () => {},
};

export default SignupApiCall;
