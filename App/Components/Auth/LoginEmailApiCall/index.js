import React from 'react';
import PropTypes from 'prop-types';
// import curateErrors from './utils';
import { withUser, userPropTypes } from '../../../Context/User';
import api from '../../../Services/SeedorfApi';
import I18n from '../../../I18n';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
/**
 * @summary Gets input fields from the LoginEmailForm and calls API to
 * authenticate the user.
 */
class LoginEmailApiCall extends React.PureComponent {
  handleLogin = async (inputFields) => {
    const { onLoginError, onLoginSuccess, login } = this.props;
    const { email } = inputFields;

    try {
      const response = await api.sendMagicLoginLink(email);
      // const response = await login({ email });
      // const response = undefined;

      // Pass event up to parent component
      if (response && response.problem) {
        // console.log('RESPONSE', response.data);
        // const errors = curateErrors(response.data);
        // onLoginError(errors);
        onLoginError({ email: [I18n.t('loginEmailForm.fields.email.errors.notRegistered')] });
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
  login: userPropTypes.login.isRequired,
};

LoginEmailApiCall.defaultProps = {
  onLoginError: () => {},
  onLoginSuccess: () => {},
};

export default withUser(LoginEmailApiCall);

/*
import React from 'react';
import PropTypes from 'prop-types';
import curateErrors from './utils';
import { withUser, userPropTypes } from '../../../Context/User';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
/**
 * @summary Gets input fields from the LoginEmailForm and calls API to
 * authenticate the user.
 /
class LoginEmailApiCall extends React.PureComponent {
  handleLogin = async (inputFields) => {
    const { onLoginError, onLoginSuccess, login } = this.props;
    const { email, password } = inputFields;

    try {
      const response = await login({ email, password });

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

LoginEmailApiCall.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
  onLoginError: PropTypes.func,
  onLoginSuccess: PropTypes.func,
  login: userPropTypes.login.isRequired,
};

LoginEmailApiCall.defaultProps = {
  onLoginError: () => {},
  onLoginSuccess: () => {},
};

export default withUser(LoginEmailApiCall);

*/
