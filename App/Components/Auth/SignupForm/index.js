import React from 'react';
import PropTypes from 'prop-types';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ErrorHandling from 'error-handling-utils';
import isEmail from 'validator/lib/isEmail';
import styled from 'styled-components';
import pick from 'lodash/pick';
import I18n from '../../../I18n';
import Colors from '../../../Themes/Colors';
import LogoHeaderBackground from '../../../Backgrounds/LogoHeaderBackground';
import Block from '../../Common/Block';
// import Spacer from '../../Common/Spacer';
import Text from '../../Common/Text';
import Link from '../../Common/Link';
import TextField from '../../Common/TextField';
import RaisedButton from '../../Common/RaisedButton';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const MAX_CHARS = 120;
const FIELDS = ['firstName', 'lastName', 'email', 'password'];
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
class SignupForm extends React.PureComponent {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    errors: {
      firstName: [],
      lastName: [],
      email: [],
      password: [],
    },
  }

  clearErrors = () => {
    this.setState({
      errors: {
        firstName: [],
        lastName: [],
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

  validateFields = ({
    firstName,
    lastName,
    email,
    password,
  }) => {
    // Initialize errors
    const errors = {
      firstName: [],
      lastName: [],
      email: [],
      password: [],
    };

    // Sanitize input
    const _firstName = firstName && firstName.trim(); // eslint-disable-line no-underscore-dangle

    if (!_firstName) {
      errors.firstName.push('First name is required!');
    } else if (_firstName.length > MAX_CHARS) {
      errors.firstName.push(`Must be no more than ${MAX_CHARS} characters!`);
    }

    // Sanitize input
    const _lastName = lastName && lastName.trim(); // eslint-disable-line no-underscore-dangle

    if (!_lastName) {
      errors.lastName.push('Last name is required!');
    } else if (_lastName.length > MAX_CHARS) {
      errors.lastName.push(`Must be no more than ${MAX_CHARS} characters!`);
    }

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
    const fields = pick(this.state, FIELDS);

    // Clear previous errors if any
    this.clearErrors();

    // Validate fields
    const errors = this.validateFields(fields);

    // In case of errors, display on UI and return handler to parent component
    if (ErrorHandling.hasErrors(errors)) {
      this.setState({ errors });
      // Pass event up to parent component. onClientErrorHook will set 'disabled'
      // value back to 'false' so that the user can re-submit the form
      onClientErrorHook();
      return;
    }

    // Pass event up to parent component
    onSuccessHook(fields);
  }

  render() {
    const { disabled } = this.props;
    const {
      firstName,
      lastName,
      email,
      password,
      errors,
    } = this.state;

    const firstNameErrors = ErrorHandling.getFieldErrors(errors, 'firstName');
    const lastNameErrors = ErrorHandling.getFieldErrors(errors, 'lastName');
    const emailErrors = ErrorHandling.getFieldErrors(errors, 'email');
    const passwordErrors = ErrorHandling.getFieldErrors(errors, 'password');

    return (
      <LogoHeaderBackground
        testID="signupScrollView"
        // theme="green"
        hideLogo
      >
        <FlexOne>
          <Block
            midHeight
          >
            <TextField
              testID="signupFieldFirstName"
              label={I18n.t('First name')}
              value={firstName}
              error={firstNameErrors}
              size="ML"
              // theme="white"
              autoFocus
              onChangeText={(value) => {
                this.handleChange({ fieldName: 'firstName', value });
              }}
            />
          </Block>
          <Block
            midHeight
          >
            <TextField
              testID="signupFieldLastName"
              label={I18n.t('Last name')}
              value={lastName}
              error={lastNameErrors}
              size="ML"
              // theme="white"
              onChangeText={(value) => {
                this.handleChange({ fieldName: 'lastName', value });
              }}
            />
          </Block>
          <Block
            midHeight
          >
            <TextField
              testID="signupFieldEmail"
              label={I18n.t('E-mail')}
              value={email}
              error={emailErrors}
              size="ML"
              // theme="white"
              keyboardType="email-address"
              onChangeText={(value) => {
                this.handleChange({ fieldName: 'email', value });
              }}
            />
          </Block>
          <Block
            midHeight
          >
            <TextField
              testID="signupFieldPassword"
              label={I18n.t('Password')}
              value={password}
              error={passwordErrors}
              size="ML"
              // theme="white"
              secureTextEntry
              onChangeText={(value) => {
                this.handleChange({ fieldName: 'password', value });
              }}
            />
          </Block>
          <Block>
            <Text.M style={{ color: Colors.black }}>
              {I18n.t('By signing up, you are agreeing to the')}
            </Text.M>
            <Link
              text={I18n.t('Terms and conditions')}
              href="https://www.sportyspots.com/terms.html"
              color={Colors.actionYellow}
            />
          </Block>
        </FlexOne>
        <Block>
          <RaisedButton
            testID="signupButtonSubmit"
            variant="default"
            label={I18n.t('Signup')}
            disabled={disabled}
            onPress={this.handleSubmit}
          />
        </Block>
      </LogoHeaderBackground>
    );
  }
}

SignupForm.propTypes = {
  disabled: PropTypes.bool,
  onBeforeHook: PropTypes.func,
  onClientCancelHook: PropTypes.func,
  onClientErrorHook: PropTypes.func,
  onSuccessHook: PropTypes.func,
};

SignupForm.defaultProps = {
  disabled: false,
  onBeforeHook: () => {},
  onClientCancelHook: () => {},
  onClientErrorHook: () => {},
  onSuccessHook: () => {},
};

export default SignupForm;
