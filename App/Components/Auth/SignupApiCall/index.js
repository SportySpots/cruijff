import React from 'react';
import PropTypes from 'prop-types';
import I18n from '../../../I18n';
import SeedorfAPI from '../../../Services/SeedorfApi';
import getErrorMsg from './utils';

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
        const message = getErrorMsg(response.data);
        onSignupError({ message: I18n.t(message) });
        // 'Wrong username or password'
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
