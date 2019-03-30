import React from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import ErrorHandling from 'error-handling-utils';
import ImagePicker from 'react-native-image-picker';
import I18n from '../../../I18n';
import userDetailsFragment from '../../../GraphQL/Users/Fragments/userDetails';
import Row from '../Row';
import Spacer from '../Spacer';
import Text from '../Text';
import Avatar from '../Avatar';
import RaisedButton from '../RaisedButton';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// TODO: implement componentWillUpdate in case (user) name changes
class AvatarPickerForm extends React.PureComponent {
  constructor(props) {
    super(props);

    const { avatar } = props.user.profile;

    // Initialize state based on current user data
    this.state = {
      avatar: avatar || '',
      errors: {
        avatar: [],
      },
    };
  }

  clearErrors = () => {
    this.setState({ errors: { avatar: [] } });
  };

  handleUpload = () => {
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
        onClientCancelHook();
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        // Pass event up to parent component. onClientErrorHook will set 'disabled'
        // value back to 'false' so that the user can re-submit the form
        this.setState({ errors: { avatar: [response.error] } });
        onClientErrorHook();
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        onClientCancelHook();
      } else {
        const { data } = response;

        // You can display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        const base64avatar = `data:image/jpeg;base64,${data}`;
        this.setState({ avatar: base64avatar });
        // Pass event up to parent component. onClientSuccessHook will set 'disabled'
        // value back to 'false' so that the user can re-submit the form
        onSuccessHook(base64avatar);
      }
    });
  }

  render() {
    const { user, disabled } = this.props;
    const { avatar, errors } = this.state;

    // Set user based on state values
    const usr = Object.assign({}, user, { profile: { avatar } });

    // Apply translation and concatenate field errors (string)
    const avatarErrors = ErrorHandling.getFieldErrors(errors, 'avatar', I18n.t);

    return [
      <Row key="avatar" justifyContent="center">
        <Avatar
          user={usr}
          size="L"
        />
      </Row>,
      <Spacer key="spacer" size="XL" />,
      !!avatarErrors && avatarErrors.length > 0 && [
        <Text
          key="error"
          color="negative"
          center
        >
          {avatarErrors}
        </Text>,
        <Spacer key="spacer" size="XL" />,
      ],
      <RaisedButton
        key="button"
        variant="ghost"
        label={I18n.t('avatarPickerForm.btnLabel')}
        disabled={disabled}
        onPress={this.handleUpload}
      />,
    ];
  }
}

AvatarPickerForm.propTypes = {
  user: propType(userDetailsFragment).isRequired,
  disabled: PropTypes.bool,
  onBeforeHook: PropTypes.func,
  onClientCancelHook: PropTypes.func,
  onClientErrorHook: PropTypes.func,
  onSuccessHook: PropTypes.func,
};

AvatarPickerForm.defaultProps = {
  disabled: false,
  onBeforeHook: () => {},
  onClientCancelHook: () => {},
  onClientErrorHook: () => {},
  onSuccessHook: () => {},
};

export default AvatarPickerForm;
