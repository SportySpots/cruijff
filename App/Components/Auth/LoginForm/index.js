import React from 'react';
import PropTypes from 'prop-types';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ErrorHandling from 'error-handling-utils';
import isEmail from 'validator/lib/isEmail';
import styled from 'styled-components';
import I18n from '../../../I18n';
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

  componentWillReceiveProps({ errors }) {
    // Display server side errors coming from the outside
    if (errors) {
      this.setState({
        errors: {
          email: [],
          password: [],
          ...errors,
        },
      });
    }
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
      errors.email.push('loginForm.fields.email.errors.required');
    } else if (!isEmail(_email)) {
      errors.email.push('loginForm.fields.email.errors.invalid');
    } else if (_email.length > MAX_CHARS) {
      errors.email.push('loginForm.fields.email.errors.tooLong');
    }

    // Don't sanitize password
    if (!password || password.length === 0) {
      errors.password.push('loginForm.fields.password.errors.required');
    } else if (password.length > MAX_CHARS) {
      errors.password.push('loginForm.fields.password.errors.tooLong');
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

    // Apply translation and concatenate field errors (string)
    const emailErrors = ErrorHandling.getFieldErrors(errors, 'email', I18n.t);
    const passwordErrors = ErrorHandling.getFieldErrors(errors, 'password', I18n.t);

    return [
      <FlexOne key="top" testID="LoginScreen">
        <Block midHeight>
          <TextField
            testID="loginInputEmail"
            label={I18n.t('loginForm.fields.email.label')}
            value={email}
            error={emailErrors}
            size="ML"
            disabled={disabled}
            keyboardType="email-address"
            autoFocus
            onChangeText={(value) => {
              this.handleChange({ fieldName: 'email', value });
            }}
          />
        </Block>
        <Block midHeight>
          <TextField
            testID="loginInputPassword"
            label={I18n.t('loginForm.fields.password.label')}
            value={password}
            error={passwordErrors}
            size="ML"
            disabled={disabled}
            secureTextEntry
            onChangeText={(value) => {
              this.handleChange({ fieldName: 'password', value });
            }}
          />
        </Block>
      </FlexOne>,
      <Block key="bottom">
        <RaisedButton
          testID="loginSubmitButton"
          variant="default"
          label={I18n.t('loginForm.btnLabel')}
          disabled={disabled}
          onPress={this.handleSubmit}
        />
      </Block>,
    ];
  }
}

LoginForm.propTypes = {
  disabled: PropTypes.bool,
  errors: PropTypes.object, // eslint-disable-line
  onBeforeHook: PropTypes.func,
  onClientCancelHook: PropTypes.func,
  onClientErrorHook: PropTypes.func,
  onSuccessHook: PropTypes.func,
};

LoginForm.defaultProps = {
  disabled: false,
  errors: null,
  onBeforeHook: () => {},
  onClientCancelHook: () => {},
  onClientErrorHook: () => {},
  onSuccessHook: () => {},
};

export default LoginForm;
