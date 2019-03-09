import React from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Keyboard,
  Platform,
  BackHandler,
} from 'react-native';
import I18n from '../../../I18n';
import { withLocation, locationPropTypes } from '../../../Context/Location';
import FormProps from '../../../RenderProps/form-props';
import OnboardingForm from '../../../Components/Onboarding/OnboardingForm';
import { addGlobalRef } from '../../../globalRefs';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class OnboardingScreen extends React.Component {
  // Handle android back button press
  componentDidMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.handleLeave);
    }
    addGlobalRef('OnboardingScreen')(this);
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.handleLeave);
    }
  }

  handleLeave = () => {
    Keyboard.dismiss();

    const { navigation } = this.props;

    Alert.alert(
      I18n.t('onboardingScreen.leaveAlert.header'),
      I18n.t('onboardingScreen.leaveAlert.body'),
      [
        {
          text: I18n.t('onboardingScreen.leaveAlert.footer.cancelBtnLabel'),
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: I18n.t('onboardingScreen.leaveAlert.footer.okBtnLabel'),
          onPress: () => { navigation.goBack(null); },
        },
      ],
    );

    // Need this for android back handler btn to work
    return true;
  }

  render() {
    const { setLocation, navigation } = this.props;

    return (
      <FormProps>
        {({
          disabled,
          handleBefore,
          handleClientCancel,
          handleClientError,
          // handleServerError,
          handleSuccess,
        }) => (
          <OnboardingForm
            disabled={disabled}
            onBeforeHook={handleBefore}
            onClientCancelHook={handleClientCancel}
            onClientErrorHook={handleClientError}
            // Store location data into local storage.
            onSuccessHook={({ location }) => {
              handleSuccess(async () => {
                await setLocation(location);
                navigation.navigate('MainNav');
              });
            }}
          />
        )}
      </FormProps>
    );
  }
}

OnboardingScreen.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  setLocation: locationPropTypes.setLocation.isRequired,
};

export default withLocation(OnboardingScreen);
