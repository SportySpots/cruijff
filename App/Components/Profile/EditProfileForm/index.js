import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';
import ErrorHandling from 'error-handling-utils';
import I18n from '../../../I18n';
import Colors from '../../../Themes/Colors';
import userDetailsFragment from '../../../GraphQL/Users/Fragments/userDetails';
import Block from '../../Common/Block';
import Row from '../../Common/Row';
import TextField from '../../Common/TextField';
import UserCircle from '../../Common/UserCircle';
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
    } = props.user;

    // Initialize state based on current user data
    this.state = {
      firstName,
      lastName,
      errors: {
        firstName: [],
        lastName: [],
      },
    };
  }

  clearErrors = () => {
    this.setState({
      errors: {
        firstName: [],
        lastName: [],
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

  validateFields = ({ firstName, lastName }) => {
    // Initialize errors
    const errors = {
      firstName: [],
      lastName: [],
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

    return errors;
  };

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
    const { firstName, lastName } = this.state;

    // Clear previous errors if any
    this.clearErrors();

    // Validate fields
    const errors = this.validateFields({ firstName, lastName });

    // In case of errors, display on UI and return handler to parent component
    if (ErrorHandling.hasErrors(errors)) {
      this.setState({ errors });
      // Pass event up to parent component. onClientErrorHook will set 'disabled'
      // value back to 'false' so that the user can re-submit the form
      onClientErrorHook();
      return;
    }

    // Pass event up to parent component
    onSuccessHook({ userUUID: user.uuid, firstName, lastName });
  }

  render() {
    const { user, disabled } = this.props;
    const { firstName, lastName, errors } = this.state;

    const firstNameErrors = ErrorHandling.getFieldErrors(errors, 'firstName');
    const lastNameErrors = ErrorHandling.getFieldErrors(errors, 'lastName');

    return [
      <Top key="top">
        <Block>
          <Row justifyContent="center">
            <UserCircle user={user} size={75} />
          </Row>
        </Block>
        <Block>
          <TextField
            label={I18n.t('First name')}
            value={firstName}
            error={firstNameErrors}
            onChangeText={(value) => {
              this.handleChange({ fieldName: 'firstName', value });
            }}
            // fontColor={fontColor}
            // baseColor={baseColor}
            // tintColor={tintColor}
            // iconColor={iconColor}
            // lineWidth={lineWidth}
            // {...rest}
          />
        </Block>
        <Block>
          <TextField
            label={I18n.t('Last name')}
            value={lastName}
            error={lastNameErrors}
            onChangeText={(value) => {
              this.handleChange({ fieldName: 'lastName', value });
            }}
            // fontColor={fontColor}
            // baseColor={baseColor}
            // tintColor={tintColor}
            // iconColor={iconColor}
            // lineWidth={lineWidth}
            // {...rest}
          />
        </Block>
        {/* <FieldSet>
            <Text>{I18n.t('Age')}</Text>
            <TextInput keyboardType="numeric" defaultValue="30" />
        </FieldSet> */}
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

/*
import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { TextInput } from 'react-native';
import styled from 'styled-components';
import I18n from '../../../I18n/index';
import userDetailsFragment from '../../../GraphQL/Users/Fragments/userDetails';
// import Slider from '../../Slider';
import Text from '../../Common/Text';
import DefaultButton from '../../Common/DefaultButton';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Form = styled.View`
  margin: 0 16px;
`;
//------------------------------------------------------------------------------
const FieldSet = styled.View`
  margin-top: 16px;
`;
//------------------------------------------------------------------------------
const Input = styled(TextInput)`
  font-size: 16px;
  margin: 8px 0;
  padding: 8px 0;
`;
//------------------------------------------------------------------------------
/* const SliderLabel = styled.View`
  flex-direction: row;
  justify-content: space-between;
`; /
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class ProfileForm extends React.PureComponent {
  constructor(props) {
    super(props);

    const {
      first_name: firstName,
      last_name: lastName,
    } = props.user;

    this.state = {
      firstName,
      lastName,
    };
  }

  handleChange = ({ fieldName, value }) => {
    this.setState({ [fieldName]: value });
  }

  handleSubmit = () => {
    const { user, onSubmit } = this.props;
    const { firstName, lastName } = this.state;

    // Pass event up to parent component
    onSubmit({ uuid: user.uuid, firstName, lastName });
  }

  render() {
    const { firstName, lastName } = this.state;

    return (
      <Form>
        <FieldSet>
          <Text>{I18n.t('First name')}</Text>
          <Input
            value={firstName}
            onChangeText={(value) => {
              this.handleChange({ fieldName: 'firstName', value });
            }}
          />
        </FieldSet>
        <FieldSet>
          <Text>{I18n.t('Last name')}</Text>
          <Input
            value={lastName}
            onChangeText={(value) => {
              this.handleChange({ fieldName: 'lastName', value });
            }}
          />
        </FieldSet>
        {/* <FieldSet>
            <Text>{I18n.t('Age')}</Text>
            <TextInput keyboardType="numeric" defaultValue="30" />
          </FieldSet>
          <FieldSet>
            <Text>{I18n.t('Style')}</Text>
            <SliderLabel>
              <Text.S>{I18n.t('recreative')}</Text.S>
              <Text.S>{I18n.t('competitive')}</Text.S>
            </SliderLabel>
            <View style={{ flex: 1, height: 50 }}>
              <Slider value={this.props.user.level} onChange={console.log} />
            </View>
          </FieldSet> /}
        <DefaultButton
          // style={{ width: 100 }}
          text={I18n.t('Save')}
          onPress={this.handleSubmit}
        />
      </Form>
    );
  }
}

ProfileForm.propTypes = {
  user: propType(userDetailsFragment).isRequired,
  onSubmit: PropTypes.func,
};

ProfileForm.defaultProps = {
  onSubmit: () => {},
};

export default ProfileForm;

*/
