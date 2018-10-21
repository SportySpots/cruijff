import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import isNumber from 'lodash/isNumber';
import moment from 'moment';
import styled from 'styled-components';
import ErrorHandling from 'error-handling-utils';
import ImagePicker from 'react-native-image-picker';
import I18n from '../../../I18n';
import Colors from '../../../Themes/Colors';
import userDetailsFragment from '../../../GraphQL/Users/Fragments/userDetails';
import Block from '../../Common/Block';
import Row from '../../Common/Row';
import Spacer from '../../Common/Spacer';
import TextField from '../../Common/TextField';
import Avatar from '../../Common/Avatar';
import RaisedButton from '../../Common/RaisedButton';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const MAX_CHARS = 120;
//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
// TODO: introduce TopBottomLayout to hold body and button container
const Top = styled.ScrollView`
  flex: 1;
  background-color: ${Colors.white}
`;
//------------------------------------------------------------------------------
const Bottom = styled.View`
  display: flex;
  justify-content: center;
  height: 88px;
  background-color: ${Colors.white}
  border-top-width: 0.5px;
  border-color: ${Colors.lightGray}
  padding-horizontal: 16px;
`;
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class EditProfileForm extends React.PureComponent {
  constructor(props) {
    super(props);

    const {
      first_name: firstName,
      last_name: lastName,
      profile,
    } = props.user;

    // Initialize state based on current user data
    this.state = {
      firstName: firstName || '',
      lastName: lastName || '',
      birthYear: (profile && profile.year_of_birth && profile.year_of_birth.toString()) || '',
      avatar: (profile && profile.avatar && profile.avatar.toString()) || '',
      errors: {
        firstName: [],
        lastName: [],
        birthYear: [],
        avatar: [],
      },
    };
  }

  clearErrors = () => {
    this.setState({
      errors: {
        firstName: [],
        lastName: [],
        birthYear: [],
        avatar: [],
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

  validateFields = ({ firstName, lastName, birthYear }) => {
    // Initialize errors
    const errors = {
      firstName: [],
      lastName: [],
      birthYear: [],
      avatar: [],
    };

    // Sanitize input
    const _firstName = firstName && firstName.trim(); // eslint-disable-line no-underscore-dangle

    if (!_firstName || _firstName.length === 0) {
      errors.firstName.push('First name is required');
    } else if (_firstName.length > MAX_CHARS) {
      errors.firstName.push(`Must be no more than ${MAX_CHARS} characters!`);
    }

    // Sanitize input
    const _lastName = lastName && lastName.trim(); // eslint-disable-line no-underscore-dangle

    if (!_lastName || _lastName.length === 0) {
      errors.lastName.push('Last name is required');
    } else if (_lastName.length > MAX_CHARS) {
      errors.lastName.push(`Must be no more than ${MAX_CHARS} characters!`);
    }

    // Sanitize input
    const _birthYear = birthYear && parseInt(birthYear, 10); // eslint-disable-line no-underscore-dangle

    if (_birthYear && (
      !isNumber(_birthYear) ||
      _birthYear < 1900 ||
      _birthYear > 9999 ||
      moment().diff(moment(_birthYear, 'YYYY'), 'years') <= 0 // diff between today and the provided year
    )) {
      errors.birthYear.push('Please, provide a valid year');
    }

    return errors;
  };

  handleUpload = () => {
    const {
      onBeforeHook,
      onClientErrorHook,
      onSuccessHook,
    } = this.props;

    // Run before logic if provided and return on error. onBeforeHook will set the 'disabled'
    // value to 'true' so that the user cannot re-submit the form
    try {
      // onBeforeHook();
    } catch (exc) {
      return; // return silently
    }

    // Clear previous errors if any
    this.clearErrors();

    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
        // TODO: implement onClientCancelHook instead
        // onClientErrorHook();
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        // Pass event up to parent component. onClientErrorHook will set 'disabled'
        // value back to 'false' so that the user can re-submit the form
        // onClientErrorHook(response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        // TODO: implement onClientCancelHook instead
        // onClientErrorHook();
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({ avatar: source });
        // Pass event up to parent component. onClientSuccessHook will set 'disabled'
        // value back to 'false' so that the user can re-submit the form
        // onSuccessHook();
      }
    });
  }

  handleSubmit = () => {
    const {
      user,
      onBeforeHook,
      onClientErrorHook,
      onSuccessHook,
    } = this.props;

    // Run before logic if provided and return on error. onBeforeHook will set the 'disabled'
    // value to 'true' so that the user cannot re-submit the form
    try {
      onBeforeHook();
    } catch (exc) {
      return; // return silently
    }

    // Get field values
    const {
      firstName,
      lastName,
      birthYear,
      avatar,
    } = this.state;

    // Clear previous errors if any
    this.clearErrors();

    // Validate fields
    const errors = this.validateFields({ firstName, lastName, birthYear });

    // In case of errors, display on UI and return handler to parent component
    if (ErrorHandling.hasErrors(errors)) {
      this.setState({ errors });
      // Pass event up to parent component. onClientErrorHook will set 'disabled'
      // value back to 'false' so that the user can re-submit the form
      onClientErrorHook();
      return;
    }

    // Pass event up to parent component
    onSuccessHook({
      userUUID: user.uuid,
      firstName,
      lastName,
      birthYear,
      avatar,
    });
  }

  render() {
    const { disabled } = this.props;
    const {
      firstName,
      lastName,
      birthYear,
      avatar,
      errors,
    } = this.state;

    // Set user based on state values
    const user = {
      first_name: firstName,
      last_name: lastName,
      profile: { avatar },
    };

    const firstNameErrors = ErrorHandling.getFieldErrors(errors, 'firstName');
    const lastNameErrors = ErrorHandling.getFieldErrors(errors, 'lastName');
    const birthYearErrors = ErrorHandling.getFieldErrors(errors, 'birthYear');

    return [
      <Top key="top">
        <Block>
          <Row justifyContent="center">
            <Avatar user={user} size={80} />
          </Row>
          <Spacer size="XL" />
          <RaisedButton
            status="ghost"
            label={I18n.t('Upload photo')}
            disabled={disabled}
            onPress={this.handleUpload}
          />
        </Block>
        <Block>
          <TextField
            label={I18n.t('First name')}
            value={firstName}
            error={firstNameErrors}
            size="ML"
            onChangeText={(value) => {
              this.handleChange({ fieldName: 'firstName', value });
            }}
          />
        </Block>
        <Block>
          <TextField
            label={I18n.t('Last name')}
            value={lastName}
            error={lastNameErrors}
            size="ML"
            onChangeText={(value) => {
              this.handleChange({ fieldName: 'lastName', value });
            }}
          />
        </Block>
        <Block>
          <TextField
            label={I18n.t('Year of birth')}
            value={birthYear}
            error={birthYearErrors}
            placeholder="YYYY"
            size="ML"
            keyboardType="numeric"
            onChangeText={(value) => {
              this.handleChange({ fieldName: 'birthYear', value });
            }}
          />
        </Block>
      </Top>,
      <Bottom key="bottom">
        <RaisedButton
          status="default"
          label={I18n.t('Save')}
          disabled={disabled}
          onPress={this.handleSubmit}
        />
      </Bottom>,
    ];
  }
}

EditProfileForm.propTypes = {
  user: propType(userDetailsFragment).isRequired,
  disabled: PropTypes.bool,
  onBeforeHook: PropTypes.func,
  onClientErrorHook: PropTypes.func,
  onSuccessHook: PropTypes.func,
};

EditProfileForm.defaultProps = {
  disabled: false,
  onBeforeHook: () => {},
  onClientErrorHook: () => {},
  onSuccessHook: () => {},
};

export default EditProfileForm;
