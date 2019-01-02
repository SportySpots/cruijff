import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import isNumber from 'lodash/isNumber';
import moment from 'moment';
import ErrorHandling from 'error-handling-utils';
import I18n from '../../../I18n';
import userDetailsFragment from '../../../GraphQL/Users/Fragments/userDetails';
import { TopLayout, BottomLayout } from '../../Layouts/FixedBottomLayout';
import Block from '../../Common/Block';
import TextField from '../../Common/TextField';
import RaisedButton from '../../Common/RaisedButton';
import AvatarPicker from '../../Common/AvatarPicker';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const MAX_CHARS = 120;
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
      errors.firstName.push('editProfileForm.fields.firstName.errors.required');
    } else if (_firstName.length > MAX_CHARS) {
      errors.firstName.push('editProfileForm.fields.firstName.errors.tooLong');
    }

    // Sanitize input
    const _lastName = lastName && lastName.trim(); // eslint-disable-line no-underscore-dangle

    if (!_lastName || _lastName.length === 0) {
      errors.lastName.push('editProfileForm.fields.lastName.errors.required');
    } else if (_lastName.length > MAX_CHARS) {
      errors.lastName.push('editProfileForm.fields.lastName.errors.tooLong');
    }

    // Sanitize input
    const _birthYear = birthYear && parseInt(birthYear, 10); // eslint-disable-line no-underscore-dangle

    if (_birthYear && (
      !isNumber(_birthYear) ||
      _birthYear < 1900 ||
      _birthYear > 9999 ||
      moment().diff(moment(_birthYear, 'YYYY'), 'years') <= 0 // diff between today and the provided year
    )) {
      errors.birthYear.push('editProfileForm.fields.birthYear.errors.invalid');
    }

    return errors;
  };

  handleSubmit = () => {
    const {
      user,
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
      userProfileUUID: user.profile.uuid,
      firstName,
      lastName,
      birthYear,
      avatar,
    });
  }

  render() {
    const { user, disabled } = this.props;
    console.log('USER', user);
    const {
      firstName,
      lastName,
      birthYear,
      errors,
    } = this.state;

    // Set user based on state values
    // TODO: pass this.state.firstName/lastName to AvatarPicker in order to
    // update initials
    /* const user = {
      first_name: firstName,
      last_name: lastName,
      profile: { avatar: avatarSource },
    }; */

    // Apply translation and concatenate field errors (string)
    const firstNameErrors = ErrorHandling.getFieldErrors(errors, 'firstName', I18n.t);
    const lastNameErrors = ErrorHandling.getFieldErrors(errors, 'lastName', I18n.t);
    const birthYearErrors = ErrorHandling.getFieldErrors(errors, 'birthYear', I18n.t);

    return [
      <TopLayout key="top">
        <Block>
          <AvatarPicker
            user={user}
            onUploadSuccess={(value) => {
              this.handleChange({ fieldName: 'avatar', value });
            }}
          />
        </Block>
        <Block>
          <TextField
            label={I18n.t('editProfileForm.fields.firstName.label')}
            value={firstName}
            error={firstNameErrors}
            size="ML"
            disabled={disabled}
            onChangeText={(value) => {
              this.handleChange({ fieldName: 'firstName', value });
            }}
          />
        </Block>
        <Block>
          <TextField
            label={I18n.t('editProfileForm.fields.lastName.label')}
            value={lastName}
            error={lastNameErrors}
            size="ML"
            disabled={disabled}
            onChangeText={(value) => {
              this.handleChange({ fieldName: 'lastName', value });
            }}
          />
        </Block>
        {/* <Block>
          <TextField
            label={I18n.t('editProfileForm.fields.birthYear.label')}
            value={birthYear}
            error={birthYearErrors}
            placeholder="YYYY"
            size="ML"
            keyboardType="numeric"
            onChangeText={(value) => {
              this.handleChange({ fieldName: 'birthYear', value });
            }}
          />
          </Block> */}
      </TopLayout>,
      <BottomLayout key="bottom">
        <RaisedButton
          variant="default"
          label={I18n.t('editProfileForm.btnLabel')}
          disabled={disabled}
          onPress={this.handleSubmit}
        />
      </BottomLayout>,
    ];
  }
}

EditProfileForm.propTypes = {
  user: propType(userDetailsFragment).isRequired,
  disabled: PropTypes.bool,
  onBeforeHook: PropTypes.func,
  onClientCancelHook: PropTypes.func,
  onClientErrorHook: PropTypes.func,
  onSuccessHook: PropTypes.func,
};

EditProfileForm.defaultProps = {
  disabled: false,
  onBeforeHook: () => {},
  onClientCancelHook: () => {},
  onClientErrorHook: () => {},
  onSuccessHook: () => {},
};

export default EditProfileForm;
