import React from 'react';
import PropTypes from 'prop-types';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ErrorHandling from 'error-handling-utils';
import isEmail from 'validator/lib/isEmail';
import styled from 'styled-components';
import I18n from '../../../I18n';
import LogoHeaderBackground from '../../../Backgrounds/LogoHeaderBackground';
import Block from '../../Common/Block';
import TextField from '../../Common/TextField';
import RaisedButton from '../../Common/RaisedButton';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const MAX_CHARS = 120;
//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const FlexOne = styled.ScrollView`
  flex: 1; /* full height */
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// TODO: use KeyboardAwareScrollView
class LoginForm extends React.PureComponent {
  state = {
    email: '',
    password: '',
    errors: {
      email: [],
      password: [],
    },
  }

  clearErrors = () => {
    this.setState({
      errors: {
        email: [],
        password: [],
      },
    });
  };

  handleChange = ({ fieldName, value }) => {
    const { errors } = this.state;

    // Update value and clear errors for the given field
    this.setState({
      [fieldName]: value,
      errors: ErrorHandling.clearErrors(errors, fieldName),
    });
  }

  validateFields = ({ email, password }) => {
    // Initialize errors
    const errors = {
      email: [],
      password: [],
    };

    // Sanitize input
    const _email = email && email.trim(); // eslint-disable-line no-underscore-dangle

    if (!_email) {
      errors.email.push('Email is required!');
    } else if (!isEmail(_email)) {
      errors.email.push('Please, provide a valid email address!');
    } else if (_email.length > MAX_CHARS) {
      errors.email.push(`Must be no more than ${MAX_CHARS} characters!`);
    }

    // Don't sanitize password
    if (!password || password.length === 0) {
      errors.password.push('Password is required');
    } else if (password.length > MAX_CHARS) {
      errors.password.push(`Must be no more than ${MAX_CHARS} characters!`);
    }

    return errors;
  };

  handleSubmit = () => {
    const {
      onBeforeHook,
      onClientCancelHook,
      onClientErrorHook,
      onSuccessHook,
    } = this.props;

    // Run before logic if provided and return on error. onBeforeHook will set the 'disabled'
    // value to 'true' so that the user cannot re-submit the form
    try {
      onBeforeHook();
    } catch (exc) {
      onClientCancelHook();
      return; // return silently
    }

    // Get field values
    const { email, password } = this.state;

    // Clear previous errors if any
    this.clearErrors();

    // Validate fields
    const errors = this.validateFields({ email, password });

    // In case of errors, display on UI and return handler to parent component
    if (ErrorHandling.hasErrors(errors)) {
      this.setState({ errors });
      // Pass event up to parent component. onClientErrorHook will set 'disabled'
      // value back to 'false' so that the user can re-submit the form
      onClientErrorHook();
      return;
    }

    // Pass event up to parent component
    onSuccessHook({ email, password });
  }

  render() {
    const { disabled } = this.props;
    const { email, password, errors } = this.state;

    const emailErrors = ErrorHandling.getFieldErrors(errors, 'email');
    const passwordErrors = ErrorHandling.getFieldErrors(errors, 'password');

    return (
      <LogoHeaderBackground
        testID="LoginScreen"
        // theme="green"
        hideLogo
      >
        <FlexOne>
          <Block
            midHeight
          >
            <TextField
              testID="loginInputEmail"
              label={I18n.t('E-mail')}
              value={email}
              error={emailErrors}
              size="ML"
              keyboardType="email-address"
              autoFocus
              // theme="white"
              onChangeText={(value) => {
                this.handleChange({ fieldName: 'email', value });
              }}
            />
          </Block>
          <Block
            midHeight
          >
            <TextField
              testID="loginInputPassword"
              label={I18n.t('Password')}
              value={password}
              error={passwordErrors}
              size="ML"
              secureTextEntry
              // theme="white"
              onChangeText={(value) => {
                this.handleChange({ fieldName: 'password', value });
              }}
            />
          </Block>
        </FlexOne>
        <Block>
          <RaisedButton
            testID="loginSubmitButton"
            variant="default"
            label={I18n.t('Login')}
            disabled={disabled}
            onPress={this.handleSubmit}
          />
        </Block>
      </LogoHeaderBackground>
    );
  }
}

LoginForm.propTypes = {
  disabled: PropTypes.bool,
  onBeforeHook: PropTypes.func,
  onClientCancelHook: PropTypes.func,
  onClientErrorHook: PropTypes.func,
  onSuccessHook: PropTypes.func,
};

LoginForm.defaultProps = {
  disabled: false,
  onBeforeHook: () => {},
  onClientCancelHook: () => {},
  onClientErrorHook: () => {},
  onSuccessHook: () => {},
};

export default LoginForm;
